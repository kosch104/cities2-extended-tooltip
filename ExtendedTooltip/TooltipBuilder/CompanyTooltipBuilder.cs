using Colossal.Entities;
using Colossal.Mathematics;
using ExtendedTooltip.Settings;
using ExtendedTooltip.Systems;
using Game.Buildings;
using Game.Common;
using Game.Companies;
using Game.Economy;
using Game.Prefabs;
using Game.UI.InGame;
using Game.UI.Tooltip;
using System;
using Unity.Entities;

namespace ExtendedTooltip.TooltipBuilder
{
    public class CompanyTooltipBuilder : TooltipBuilderBase
    {

        public CompanyTooltipBuilder(EntityManager entityManager, CustomTranslationSystem customTranslationSystem)
        : base(entityManager, customTranslationSystem)
        {
            UnityEngine.Debug.Log($"Created CompanyTooltipBuilder.");
        }

        public void Build(Entity companyEntity, TooltipGroup tooltipGroup, TooltipGroup secondaryTooltipGroup, bool IsMixed)
        {
            ModSettings modSettings = m_ExtendedTooltipSystem.m_LocalSettings.ModSettings;
            // Company output tooltip
            Entity companyEntityPrefab = m_EntityManager.GetComponentData<PrefabRef>(companyEntity).m_Prefab;

            // Profitability
            if (modSettings.ShowCompanyProfitability && m_EntityManager.TryGetComponent(companyEntity, out Profitability companyProfitability))
            {
                CompanyProfitabilityKey companyProfitabilityKey = CompanyUIUtils.GetProfitabilityKey(companyProfitability.m_Profitability);
                string profitabilityLabel = m_CustomTranslationSystem.GetLocalGameTranslation("Infoviews.INFOMODE[Profitability]", "Profitability");
                string profitabilityValue = m_CustomTranslationSystem.GetLocalGameTranslation($"SelectedInfoPanel.COMPANY_PROFITABILITY_TITLE[{companyProfitabilityKey}]", companyProfitabilityKey.ToString());
                var tooltipColor = companyProfitabilityKey switch
                {
                    CompanyProfitabilityKey.Bankrupt => TooltipColor.Error,
                    CompanyProfitabilityKey.LosingMoney => TooltipColor.Warning,
                    CompanyProfitabilityKey.Profitable => TooltipColor.Success,
                    _ => TooltipColor.Info,
                };
                StringTooltip profitabilityTooltip = new()
                {
                    icon = "Media/Game/Icons/CompanyProfit.svg",
                    value = $"{profitabilityLabel}: {profitabilityValue} ({(int)companyProfitability.m_Profitability})",
                    color = tooltipColor
                };
                tooltipGroup.children.Add(profitabilityTooltip);
            }

            // Company resource section
            if (m_EntityManager.TryGetBuffer(companyEntity, true, out DynamicBuffer<Resources> resources)) {

                if (modSettings.ShowCompanyOutput && m_EntityManager.TryGetComponent(companyEntityPrefab, out IndustrialProcessData industrialProcessData))
                {
                    Resource input1 = industrialProcessData.m_Input1.m_Resource;
                    Resource input2 = industrialProcessData.m_Input2.m_Resource;
                    Resource output = industrialProcessData.m_Output.m_Resource;

                    if (input1 > 0 && input1 != Resource.NoResource && input1 != output)
                    {
                        (modSettings.UseExtendedLayout && !IsMixed ? secondaryTooltipGroup : tooltipGroup).children.Add(CreateResourceTooltip(companyEntity, companyEntityPrefab, resources, input1));
                    }

                    if (input2 > 0 && input2 != Resource.NoResource && input2 != output)
                    {
                        (modSettings.UseExtendedLayout && !IsMixed ? secondaryTooltipGroup : tooltipGroup).children.Add(CreateResourceTooltip(companyEntity, companyEntityPrefab, resources, input2));
                    }

                    (modSettings.UseExtendedLayout && !IsMixed ? secondaryTooltipGroup : tooltipGroup).children.Add(CreateResourceTooltip(companyEntity, companyEntityPrefab, resources, output, true));
                }

                // Company money balance
                if (modSettings.ShowCompanyBalance)
                {
                    for (int i = 0; i < resources.Length; i++)
                    {
                        if (resources[i].m_Resource is Resource.Money)
                        {
                            int companyBalance = resources[i].m_Amount;
                            string companyBalanceLabel = m_CustomTranslationSystem.GetTranslation("balance", "Balance");
                            string companyBalanceValueString = companyBalance.ToString("C0");

                            string finalCompanyBalanceString = $"{companyBalanceLabel}: {companyBalanceValueString}";

                            StringTooltip companyBalanceTooltip = new()
                            {
                                value = finalCompanyBalanceString,
                                icon = "Media/Game/Icons/Money.svg",
                                color = companyBalance < 0 ? TooltipColor.Error : TooltipColor.Info,
                            };
                            (modSettings.UseExtendedLayout && !IsMixed ? secondaryTooltipGroup : tooltipGroup).children.Add(companyBalanceTooltip);

                            break;
                        }
                    }
                }
            }

            // Company Rent
            if (modSettings.ShowCompanyRent && m_EntityManager.TryGetComponent(companyEntity, out PropertyRenter propertyRenter))
            {
                string rentLabel = m_CustomTranslationSystem.GetTranslation("rent", "Rent");
                string rentValue;

                RandomSeed randomSeed = RandomSeed.Next();
                Unity.Mathematics.Random random = randomSeed.GetRandom(1);

                int rent = MathUtils.RoundToIntRandom(ref random, propertyRenter.m_Rent * 1f);
                int finalRentValue = rent < 0 ? Math.Abs(rent) : rent;
                rentValue = m_CustomTranslationSystem.GetLocalGameTranslation("Common.VALUE_MONEY_PER_MONTH", "-", "SIGN", rent < 0 ? "-" : "", "VALUE", finalRentValue.ToString());

                StringTooltip rentTooltip = new()
                {
                    icon = "Media/Game/Icons/Money.svg",
                    value = $"{rentLabel}: {rentValue}",
                    color = TooltipColor.Info,
                };
                (modSettings.UseExtendedLayout && !IsMixed ? secondaryTooltipGroup : tooltipGroup).children.Add(rentTooltip);
            }
        }

        private StringTooltip CreateResourceTooltip(Entity companyEntity, Entity companyEntityPrefab, DynamicBuffer<Resources> companyResources, Resource resource, bool isOutput = false)
        {
            // OUTPUT Storage
            StringTooltip companyResourceTooltip = new();
            string resourceLabel;
            bool isStorage = false;

            bool showResourceUnit = resource switch
            {
                Resource.Media or Resource.Entertainment or Resource.Financial or Resource.Software or Resource.Telecom or Resource.Recreation => false,
                _ => true,
            };

            if (isOutput)
            {
                if (m_EntityManager.HasComponent<ServiceAvailable>(companyEntity))
                {
                    resourceLabel = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.COMPANY_SELLS", "Sells");
                }
                else if (m_EntityManager.HasComponent<Game.Companies.ExtractorCompany>(companyEntity) || m_EntityManager.HasComponent<Game.Companies.ProcessingCompany>(companyEntity))
                {
                    resourceLabel = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.COMPANY_PRODUCES", "Produces");
                }
                else
                {
                    StorageCompanyData componentData = m_EntityManager.GetComponentData<StorageCompanyData>(companyEntityPrefab);
                    isStorage = true;
                    resource = componentData.m_StoredResources;
                    resourceLabel = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.COMPANY_STORES", "Stores");
                }
            } else
            {
                resourceLabel = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.COMPANY_REQUIRES", "Needs");
            }

            string resourceValue = m_CustomTranslationSystem.GetLocalGameTranslation($"Resources.TITLE[{resource}]", resource.ToString());
            GetCompanyOutputResource(companyResources, resource, out int resourceAmount);
            companyResourceTooltip.icon = "Media/Game/Resources/" + resource.ToString() + ".svg";
            if (resourceAmount > 0)
            {
                if (showResourceUnit)
                {
                    string unit = "t";
                    if (resource == Resource.Oil)
                    {
                        unit = "bbl.";
                        double densityCrudeOil = 0.8;
                        double litersPerBarrel = 158.9873;
                        double litersCrudeOil = resourceAmount * densityCrudeOil;
                        double barrelsCrudeOil = litersCrudeOil / litersPerBarrel;
                        
                        resourceValue = m_CustomTranslationSystem.GetTranslation(!isStorage ? "setting.company.production_rate_prefixed" : "setting.company.production_rate", "Unknown", "RESOURCE", resourceValue, "AMOUNT", barrelsCrudeOil.ToString("F2"), "UNIT", unit);
                    } else if(resource == Resource.Petrochemicals)
                    {
                        double densityGasoline = 0.75;
                        double gasolineValue = resourceAmount > 1000 ? resourceAmount * densityGasoline / 1000 : resourceAmount * densityGasoline;
                        unit = resourceAmount > 1000 ? "kl" : "l";
                        resourceValue = m_CustomTranslationSystem.GetTranslation(!isStorage ? "setting.company.production_rate_prefixed" : "setting.company.production_rate", "Unknown", "RESOURCE", resourceValue, "AMOUNT", gasolineValue.ToString("F2"), "UNIT", unit);
                    }
                    else
                    {
                        double resourceValueInDouble = (double)resourceAmount / 1000;
                        resourceValue = m_CustomTranslationSystem.GetTranslation(!isStorage ? "setting.company.production_rate_prefixed" : "setting.company.production_rate", "Unknown", "RESOURCE", resourceValue, "AMOUNT", resourceValueInDouble.ToString("F2"), "UNIT", unit);
                    }
                } else
                {
                    resourceValue = m_CustomTranslationSystem.GetTranslation(!isStorage ? "setting.company.production_rate_prefixed" : "setting.company.production_rate", "Unknown", "RESOURCE", resourceValue, "AMOUNT", resourceAmount.ToString(), "UNIT", "");
                }
            }
            companyResourceTooltip.value = $"{resourceLabel}: {resourceValue}";

            return companyResourceTooltip;
        }

        /// <summary>
        /// Get the amount of resource the company is producing (output)
        /// </summary>
        /// <param name="companyEntity"></param>
        /// <param name="outputResource"></param>
        /// <param name="companyResourceAmount"></param>
        private void GetCompanyOutputResource(DynamicBuffer<Resources> resources, Resource outputResource, out int companyResourceAmount)
        {
            companyResourceAmount = 0;
            foreach (Resources resource in resources)
            {
                if (resource.m_Resource == outputResource)
                {
                    companyResourceAmount = resource.m_Amount;
                    break;
                }
            }
        }
    }
}
