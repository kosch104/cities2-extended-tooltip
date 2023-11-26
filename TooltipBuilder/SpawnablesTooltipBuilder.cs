using Colossal.Entities;
using Colossal.Mathematics;
using ExtendedTooltip.Systems;
using Game.Buildings;
using Game.Citizens;
using Game.Common;
using Game.Prefabs;
using Game.UI.InGame;
using Game.UI.Tooltip;
using System.Collections.Generic;
using System.Linq;
using Unity.Collections;
using Unity.Entities;
using Unity.Mathematics;

namespace ExtendedTooltip.TooltipBuilder
{
    public class SpawnablesTooltipBuilder(EntityManager entityManager, CustomTranslationSystem customTranslationSystem)
    {
        private EntityManager m_EntityManager = entityManager;
        private readonly CustomTranslationSystem m_CustomTranslationSystem = customTranslationSystem;

        public void Build(Entity entity, Entity prefab, int buildingLevel, int currentCondition, int levelingCost, TooltipGroup tooltipGroup)
        {
            string buildingLevelLabel = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.LEVEL", "Level");
            string buildingLevelValue = $"{buildingLevel}/5";
            TooltipColor buildingLevelColor = TooltipColor.Info;
            if (buildingLevel == 5)
            {
                buildingLevelColor = TooltipColor.Success;
            }
            if (currentCondition < 0)
            {
                buildingLevelColor = TooltipColor.Error;
            }

            if (levelingCost > 0)
            {
                buildingLevelValue += $" [€{currentCondition} / €{levelingCost}]";
            }

            StringTooltip levelTooltip = new()
            {
                icon = "Media/Game/Icons/BuildingLevel.svg",
                value = $"{buildingLevelLabel}: {buildingLevelValue}",
                color = buildingLevelColor
            };
            tooltipGroup.children.Add(levelTooltip);

            // Add residential info if available
            int residentCount = 0;
            int householdCount = 0;
            int maxHouseholds = 0;
            int petsCount = 0;
            List<int> householdRents = [];
            NativeList<Entity> householdsResult = new(Allocator.Temp);
            if (CreateTooltipsForResidentialProperties(ref residentCount, ref householdCount, ref maxHouseholds, ref petsCount, ref householdRents, ref householdsResult, entity, prefab))
            {
                BuildHouseholdCitizenInfo(householdCount, maxHouseholds, residentCount, petsCount, out string finalInfoString);
                int householdCapacityPercentage = householdCount == 0 ? 0 : (int)math.round(100 * householdCount / maxHouseholds);
                TooltipColor householdTooltipColor = (householdCount == 0 || maxHouseholds == 1) ? TooltipColor.Info : householdCapacityPercentage < 50 ? TooltipColor.Error : householdCapacityPercentage < 80 ? TooltipColor.Warning : TooltipColor.Success;

                StringTooltip householdTooltip = new()
                {
                    icon = "Media/Game/Icons/Household.svg",
                    value = finalInfoString,
                    color = householdTooltipColor
                };
                tooltipGroup.children.Add(householdTooltip);

                if (householdRents.Count > 0)
                {
                    int householdRent = (int)math.round(householdRents.Average());
                    string rentLabel = m_CustomTranslationSystem.GetTranslation("extendedtooltip.rent", "Rent");
                    if (householdCount > 1)
                    {
                        rentLabel = $"~ {m_CustomTranslationSystem.GetTranslation("extendedtooltip.rent", "Rent")}";
                    }

                    string rentValue = m_CustomTranslationSystem.GetLocalGameTranslation("Common.VALUE_MONEY_PER_MONTH", "€", "SIGN", "", "VALUE", householdRent.ToString());
                    StringTooltip wealthTooltip = new()
                    {
                        icon = "Media/Game/Icons/Money.svg",
                        value = $"{rentLabel}: {rentValue}",
                        color = TooltipColor.Info,
                    };
                    tooltipGroup.children.Add(wealthTooltip);
                }

                if (householdsResult.Length > 0 && m_EntityManager.TryGetComponent(entity, out CitizenHappinessParameterData citizenHappinessParameterData))
                {
                    HouseholdWealthKey wealthKey = CitizenUIUtils.GetAverageHouseholdWealth(m_EntityManager, householdsResult, citizenHappinessParameterData);
                    string wealthLabel = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.CITIZEN_WEALTH_TITLE", "Household wealth");
                    string wealthValue = m_CustomTranslationSystem.GetLocalGameTranslation($"SelectedInfoPanel.CITIZEN_WEALTH[{wealthKey}]");
                    StringTooltip wealthTooltip = new()
                    {
                        icon = "Media/Game/Icons/CitizenWealth.svg",
                        value = $"{wealthLabel}: {wealthValue}",
                        color = TooltipColor.Info,
                    };
                    tooltipGroup.children.Add(wealthTooltip);
                }
            }
        }

        private bool CreateTooltipsForResidentialProperties(
            ref int residentCount,
            ref int householdCount,
            ref int maxHouseholds,
            ref int petsCount,
            ref List<int> householdRents,
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
            string petsLabel = pets > 1 ? m_CustomTranslationSystem.GetTranslation("extendedtooltip.pets", "Pets") : m_CustomTranslationSystem.GetTranslation("extendedtooltip.pet");

            // If residential building is > low density (only 1 household) show the household label only
            if (maxHouseholds > 1)
            {
                if (pets > 0)
                {
                    finalInfoString = $"{householdsValue} {householdsLabel} [{residentsValue} {residentsLabel}, {petsValue} {petsLabel}]";
                    return;
                }
                finalInfoString = $"{householdsValue} {householdsLabel} [{residentsValue} {residentsLabel}]";
            }
            else // low densitiy housing only has 1 household
            {
                if (pets > 0)
                {
                    finalInfoString = $"{residentsValue} {residentsLabel} [{petsValue} {petsLabel}]";
                    return;
                }
                finalInfoString = $"{residentsValue} {residentsLabel}";
            }
        }
    }
}
