using Colossal.Entities;
using Colossal.Mathematics;
using ExtendedTooltip.Settings;
using ExtendedTooltip.Systems;
using Game.Buildings;
using Game.Citizens;
using Game.Common;
using Game.Companies;
using Game.Economy;
using Game.Modding;
using Game.Prefabs;
using Game.UI.InGame;
using Game.UI.Tooltip;
using Game.Zones;
using System;
using System.Collections.Generic;
using System.Linq;
using Unity.Collections;
using Unity.Entities;
using Unity.Mathematics;

namespace ExtendedTooltip.TooltipBuilder
{
    public class SpawnablesTooltipBuilder : TooltipBuilderBase
    {
        private readonly PrefabSystem m_PrefabSystem;
        private ModSettings m_ModSettings;
        
        public SpawnablesTooltipBuilder(EntityManager entityManager, CustomTranslationSystem customTranslationSystem, PrefabSystem prefabSystem)
        : base(entityManager, customTranslationSystem)
        {
            m_PrefabSystem = prefabSystem;
            UnityEngine.Debug.Log($"Created SchoolTooltipBuilder.");
        }

        public void Build(Entity entity, Entity prefab, int buildingLevel, int currentCondition, int levelingCost, SpawnableBuildingData spawnableBuildingData, CitizenHappinessParameterData citizenHappinessParameters, TooltipGroup tooltipGroup, TooltipGroup secondaryTooltipGroup)
        {
            m_ModSettings = m_ExtendedTooltipSystem.m_LocalSettings.m_ModSettings;
            if (m_ModSettings.ShowGrowablesHousehold == false && m_ModSettings.ShowGrowablesHouseholdDetails == false && m_ModSettings.ShowGrowablesLevel == false && m_ModSettings.ShowGrowablesLevelDetails == false && m_ModSettings.ShowGrowablesRent == false)
                return;

            if (m_ModSettings.ShowGrowablesZoneInfo)
            {
                ZoneData zoneData = m_EntityManager.GetComponentData<ZoneData>(spawnableBuildingData.m_ZonePrefab);
                ZonePrefab zonePrefab = m_PrefabSystem.GetPrefab<ZonePrefab>(spawnableBuildingData.m_ZonePrefab);
                PrefabBase zonePrefabBase = m_PrefabSystem.GetPrefab<PrefabBase>(spawnableBuildingData.m_ZonePrefab);
                string rawZoneName = m_PrefabSystem.GetPrefab<PrefabBase>(spawnableBuildingData.m_ZonePrefab).name;
                string finalZoneName;

                // Offices and industrial zones have a different naming convention
                if (zoneData.m_AreaType == AreaType.Industrial) // Offices are technically industrial zones
                {
                    finalZoneName = m_CustomTranslationSystem.GetLocalGameTranslation($"Assets.NAME[{rawZoneName}]", rawZoneName);
                } else {
                    // Split the string into individual values
                    List<string> zoneInfos = [.. rawZoneName.Split(' ')];
                    for (int i = 0; i < zoneInfos.Count; i++)
                    {
                        zoneInfos[i] = m_CustomTranslationSystem.GetTranslation($"zone_info[{zoneInfos[i]}]", zoneInfos[i]);
                    }
                    finalZoneName = string.Join(", ", zoneInfos);
                }
                
                StringTooltip zoneTooltip = new()
                {
                    icon = "Media/Game/Icons/Zones.svg",
                    value = finalZoneName,
                };
                (m_ModSettings.UseExtendedLayout ? secondaryTooltipGroup : tooltipGroup).children.Add(zoneTooltip);
            }

            if (m_ModSettings.ShowGrowablesLevel)
            {
                TooltipColor buildingLevelColor = TooltipColor.Info;
                string buildingLevelLabel = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.LEVEL", "Level");
                string buildingLevelValue = $"{buildingLevel}/5";
                
                if (buildingLevel == 5)
                {
                    buildingLevelColor = TooltipColor.Success;
                }

                if (currentCondition < 0)
                {
                    buildingLevelColor = TooltipColor.Error;
                }

                if (m_ModSettings.ShowGrowablesLevelDetails == true && levelingCost > 0)
                {
                    buildingLevelValue += $" [¢{currentCondition} / ¢{levelingCost}]";
                }

                StringTooltip levelTooltip = new()
                {
                    icon = "Media/Game/Icons/BuildingLevel.svg",
                    value = $"{buildingLevelLabel}: {buildingLevelValue}",
                    color = buildingLevelColor
                };
                tooltipGroup.children.Add(levelTooltip);
            }

            // Add residential info if available
            int residentCount = 0;
            int householdCount = 0;
            int maxHouseholds = 0;
            int petsCount = 0;
            List<int> householdRents = [];
            List<int> householdBalances = [];
            NativeList<Entity> householdsResult = new(Allocator.Temp);
            if ((m_ModSettings.ShowGrowablesHousehold == true || m_ModSettings.ShowGrowablesRent == true) && CreateTooltipsForResidentialProperties(ref residentCount, ref householdCount, ref maxHouseholds, ref petsCount, ref householdRents, ref householdBalances, ref householdsResult, entity, prefab))
            {
                BuildHouseholdCitizenInfo(householdCount, maxHouseholds, residentCount, petsCount, out string finalInfoString);
                if (m_ModSettings.ShowGrowablesHousehold)
                {
                    int householdCapacityPercentage = householdCount == 0 ? 0 : (int)math.round(100 * householdCount / maxHouseholds);
                    TooltipColor householdTooltipColor = (householdCount == 0 || householdCapacityPercentage < 50) ? TooltipColor.Error : householdCapacityPercentage < 80 ? TooltipColor.Warning : TooltipColor.Success;
                    StringTooltip householdTooltip = new()
                    {
                        icon = "Media/Game/Icons/Household.svg",
                        value = finalInfoString,
                        color = householdTooltipColor
                    };
                    tooltipGroup.children.Add(householdTooltip);
                }

                // Needs revisting, not working
                if (m_ModSettings.ShowGrowablesHouseholdWealth && householdsResult.Length > 0)
                {
                    HouseholdWealthKey wealthKey = householdsResult.Length == 1
                        ? CitizenUIUtils.GetHouseholdWealth(m_EntityManager, householdsResult[0], citizenHappinessParameters)
                        : CitizenUIUtils.GetAverageHouseholdWealth(m_EntityManager, householdsResult, citizenHappinessParameters);

                    TooltipColor tooltipColor = wealthKey switch
                    {
                        HouseholdWealthKey.Wretched => TooltipColor.Error,
                        HouseholdWealthKey.Poor => TooltipColor.Warning,
                        HouseholdWealthKey.Modest => TooltipColor.Info,
                        _ => TooltipColor.Success,
                    };

                    string wealthLabel = m_CustomTranslationSystem.GetLocalGameTranslation(householdsResult.Length > 1 ? "SelectedInfoPanel.AVERAGE_HOUSEHOLD_WEALTH" : "StatisticsPanel.STAT_TITLE[Wealth]", "Household wealth");
                    string wealthValue = m_CustomTranslationSystem.GetLocalGameTranslation($"SelectedInfoPanel.CITIZEN_WEALTH[{wealthKey}]");
                    StringTooltip wealthTooltip = new()
                    {
                        icon = "Media/Game/Icons/CitizenWealth.svg",
                        value = $"{wealthLabel}: {wealthValue}",
                        color = tooltipColor,
                    };
                    (m_ModSettings.UseExtendedLayout ? secondaryTooltipGroup : tooltipGroup).children.Add(wealthTooltip);
                }

                if (m_ModSettings.ShowGrowablesBalance && householdBalances.Count > 0)
                {
                    string balanceLabel = m_CustomTranslationSystem.GetTranslation("balance", "Balance");
                    string balanceValue;
                    int finalBalance = default;
                    int minBalance = default;
                    int maxBalance = default;

                    if (householdCount > 1)
                    {
                        minBalance = householdBalances.Min();
                        int minBalanceValue = minBalance < 0 ? Math.Abs(minBalance) : minBalance;
                        maxBalance = householdBalances.Max();
                        int maxBalanceValue = maxBalance < 0 ? Math.Abs(maxBalance) : maxBalance;
                        balanceValue = m_CustomTranslationSystem.GetTranslation("common.range_minmax_value_money", "", "SIGN0", minBalance < 0 ? "-" : "", "VALUE0", minBalanceValue.ToString(), "SIGN1", maxBalance < 0 ? "-" : "", "VALUE1", maxBalanceValue.ToString());
                    } else
                    {
                        finalBalance = householdBalances.First();
                        int finalRentValue = finalBalance < 0 ? Math.Abs(finalBalance) : finalBalance;
                        balanceValue = m_CustomTranslationSystem.GetLocalGameTranslation("Common.VALUE_MONEY", "", "SIGN", finalBalance < 0 ? "-" : "", "VALUE", finalRentValue.ToString());
                    }

                    StringTooltip balanceTooltip = new()
                    {
                        icon = "Media/Game/Icons/Money.svg",
                        value = $"{balanceLabel}: {balanceValue}",
                        color = (householdCount > 1 && minBalance < 0 && maxBalance < 0) || (householdCount == 1 && finalBalance < 0) ? TooltipColor.Error : TooltipColor.Info,
                    };

                    (m_ModSettings.UseExtendedLayout ? secondaryTooltipGroup : tooltipGroup).children.Add(balanceTooltip);
                }

                if (m_ModSettings.ShowGrowablesRent == true && householdRents.Count > 0)
                {
                    string rentLabel = m_CustomTranslationSystem.GetTranslation("rent", "Rent");
                    string rentValue;

                    // Only show range if there are more than 1 household and the min and max rents differ
                    if (householdCount > 1 && householdRents.Min() != householdRents.Max())
                    {
                        int minRent = householdRents.Min();
                        int minRentValue = minRent < 0 ? Math.Abs(minRent) : minRent;
                        int maxRent = householdRents.Max();
                        int maxRentValue = maxRent < 0 ? Math.Abs(maxRent) : maxRent;
                        rentValue = m_CustomTranslationSystem.GetTranslation("common.range_value_money", "", "SIGN0", minRent < 0 ? "-" : "", "VALUE0", minRentValue.ToString(), "SIGN1", maxRent < 0 ? "-" : "", "VALUE1", maxRentValue.ToString());
                    }
                    else
                    {
                        int finalRent = householdRents.First();
                        int finalRentValue = finalRent < 0 ? Math.Abs(finalRent) : finalRent;
                        rentValue = m_CustomTranslationSystem.GetLocalGameTranslation("Common.VALUE_MONEY_PER_MONTH", "-", "SIGN", finalRent < 0 ? "-" : "", "VALUE", finalRentValue.ToString());
                    }

                    StringTooltip rentTooltip = new()
                    {
                        icon = "Media/Game/Icons/Money.svg",
                        value = $"{rentLabel}: {rentValue}",
                        color = TooltipColor.Info,
                    };

                    (m_ModSettings.UseExtendedLayout ? secondaryTooltipGroup : tooltipGroup).children.Add(rentTooltip);
                }
            }
        }

        private bool CreateTooltipsForResidentialProperties(
            ref int residentCount,
            ref int householdCount,
            ref int maxHouseholds,
            ref int petsCount,
            ref List<int> householdRents,
            ref List<int> householdBalances,
            ref NativeList<Entity> householdsResult,
            Entity entity,
            Entity prefab
        ) {
            bool flag = false;
            bool isAbondened = m_EntityManager.HasComponent<Abandoned>(entity);
            bool hasBuildingPropertyData = m_EntityManager.TryGetComponent(prefab, out BuildingPropertyData buildingPropertyData);
            bool hasResidentialProperties = buildingPropertyData.m_ResidentialProperties > 0;
            RandomSeed randomSeed = RandomSeed.Next();

            // Only check for residents if the building is not abandoned and has residential properties
            if (!isAbondened && hasBuildingPropertyData && hasResidentialProperties)
            {
                flag = true;
                maxHouseholds += buildingPropertyData.m_ResidentialProperties;

                if (m_EntityManager.TryGetBuffer(entity, true, out DynamicBuffer<Renter> renterBuffer))
                {
                    for (int i = 0; i < renterBuffer.Length; i++)
                    {
                        Unity.Mathematics.Random random = randomSeed.GetRandom(1 + i);
                        Entity renter = renterBuffer[i].m_Renter;

                        // Get rent
                        int rent;
                        if (m_EntityManager.TryGetComponent(renter, out PropertyRenter propertyRenter))
                        {
                            rent = MathUtils.RoundToIntRandom(ref random, propertyRenter.m_Rent * 1f);
                            householdRents.Add(rent);
                        }

                        // Balances (Savings)
                        if (m_EntityManager.TryGetBuffer(renter, true, out DynamicBuffer<Resources> resources))
                        {
                            int balance = EconomyUtils.GetResources(Resource.Money, resources);
                            householdBalances.Add(balance);
                        }

                        // Household info
                        if (m_EntityManager.TryGetBuffer(renter, true, out DynamicBuffer<HouseholdCitizen> householdCitizenBuffer))
                        {
                            householdsResult.Add(renter);
                            householdCount++;
                            for (int j = 0; j < householdCitizenBuffer.Length; j++)
                            {
                                // Is not in death routine
                                if (!CitizenUtils.IsCorpsePickedByHearse(m_EntityManager, householdCitizenBuffer[j].m_Citizen))
                                {
                                    residentCount++;
                                }
                            }

                            // Woof
                            if (m_EntityManager.TryGetBuffer(renter, true, out DynamicBuffer<HouseholdAnimal> animalBuffer))
                            {
                                petsCount += animalBuffer.Length;
                            }
                        }
                    }
                }
            }

            return flag;
        }

        public void BuildHouseholdCitizenInfo(int households, int maxHouseholds, int residents, int pets, out string finalInfoString)
        {
            // Households
            string householdsLabel = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.HOUSEHOLDS", "Households");
            string householdsValue = $"{households}/{maxHouseholds}";

            // Residents
            string residentsLabel = m_CustomTranslationSystem.GetLocalGameTranslation("Properties.ADJUST_HAPPINESS_MODIFIER_TARGET[Residents]", "Residents");
            string residentsValue = residents.ToString();

            // Pets
            string petsValue = pets.ToString();
            string petsLabel = pets > 1 ? m_CustomTranslationSystem.GetTranslation("pets", "Pets") : m_CustomTranslationSystem.GetTranslation("pet");

            // If residential building is > low density (only 1 household) show the household label only
            if (maxHouseholds > 1)
            {
                if (m_ModSettings.ShowGrowablesHouseholdDetails)
                {
                    if (pets > 0)
                    {
                        finalInfoString = $"{householdsValue} {householdsLabel} [{residentsValue} {residentsLabel}, {petsValue} {petsLabel}]";
                        return;
                    } else
                    {
                        finalInfoString = $"{householdsValue} {householdsLabel} [{residentsValue} {residentsLabel}]";
                    }   
                }
                else
                {
                    finalInfoString = $"{householdsValue} {householdsLabel}";
                }
            }
            else // low densitiy housing only has 1 household
            {
                if (m_ModSettings.ShowGrowablesHouseholdDetails && pets > 0)
                {
                    finalInfoString = $"{residentsValue} {residentsLabel} [{petsValue} {petsLabel}]";
                } else
                {
                    finalInfoString = $"{residentsValue} {residentsLabel}";
                }
            }
        }

        private Entity GetRenter(Entity entity)
        {
            if (m_EntityManager.TryGetBuffer(entity, true, out DynamicBuffer<Renter> dynamicBuffer))
            {
                for (int i = 0; i < dynamicBuffer.Length; i++)
                {
                    Entity renter = dynamicBuffer[i].m_Renter;
                    if (m_EntityManager.HasComponent<CompanyData>(renter))
                    {
                        return renter;
                    }
                }
            }

            return entity;
        }
    }
}
