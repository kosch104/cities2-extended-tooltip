using Colossal.Entities;
using ExtendedTooltip.Systems;
using Game.Companies;
using Game.Economy;
using Game.Prefabs;
using Game.UI.Tooltip;
using Unity.Entities;
using Unity.Mathematics;

namespace ExtendedTooltip.TooltipBuilder
{
    public class CompanyTooltipBuilder : TooltipBuilderBase
    {
        public CompanyTooltipBuilder(EntityManager entityManager, CustomTranslationSystem customTranslationSystem)
        : base(entityManager, customTranslationSystem)
        {
            UnityEngine.Debug.Log($"Created CompanyTooltipBuilder.");
        }

        public void Build(Entity companyEntity, TooltipGroup tooltipGroup, TooltipGroup secondaryTooltipGroup)
        {
            // Company output tooltip
            if (m_Settings.CompanyOutput)
            {
                Entity companyEntityPrefab = m_EntityManager.GetComponentData<PrefabRef>(companyEntity).m_Prefab;

                // Company resource section
                if (m_EntityManager.TryGetBuffer(companyEntity, true, out DynamicBuffer<Resources> resources) && m_EntityManager.TryGetComponent(companyEntityPrefab, out IndustrialProcessData industrialProcessData))
                {
                    Resource input1 = industrialProcessData.m_Input1.m_Resource;
                    Resource input2 = industrialProcessData.m_Input2.m_Resource;
                    Resource output = industrialProcessData.m_Output.m_Resource;
                    
                    if (input1 > 0 && input1 != Resource.NoResource && input1 != output)
                    {
                        (m_Settings.ExtendedLayout ? secondaryTooltipGroup : tooltipGroup).children.Add(CreateResourceTooltip(companyEntity, companyEntityPrefab, resources, input1));
                    }

                    if (input2 > 0 && input2 != Resource.NoResource && input2 != output)
                    {
                        (m_Settings.ExtendedLayout ? secondaryTooltipGroup : tooltipGroup).children.Add(CreateResourceTooltip(companyEntity, companyEntityPrefab, resources, input2));
                    }

                    (m_Settings.ExtendedLayout ? secondaryTooltipGroup : tooltipGroup).children.Add(CreateResourceTooltip(companyEntity, companyEntityPrefab, resources, output, true));

                    return;
                }
            }
        }

        private StringTooltip CreateResourceTooltip(Entity companyEntity, Entity companyEntityPrefab, DynamicBuffer<Resources> companyResources, Resource resource, bool isOutput = false)
        {
            // OUTPUT Storage
            StringTooltip companyResourceTooltip = new();
            string resourceLabel;

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
                        resourceValue = $"{m_CustomTranslationSystem.GetLocalGameTranslation($"Resources.TITLE[{resource}]", resource.ToString())} [{barrelsCrudeOil:F2} {unit}]";
                    } else if(resource == Resource.Petrochemicals)
                    {
                        double densityGasoline = 0.75;
                        double gasolineValue = resourceAmount > 1000 ? resourceAmount * densityGasoline / 1000 : resourceAmount * densityGasoline;
                        unit = resourceAmount > 1000 ? "kl" : "l";
                        resourceValue = $"{m_CustomTranslationSystem.GetLocalGameTranslation($"Resources.TITLE[{resource}]", resource.ToString())} [{gasolineValue:F2} {unit}]";
                    }
                    else
                    {
                        double resourceValueInDouble = (double)resourceAmount / 1000;
                        resourceValue = $"{m_CustomTranslationSystem.GetLocalGameTranslation($"Resources.TITLE[{resource}]", resource.ToString())} [{resourceValueInDouble:F2}  {unit}]";
                    }
                } else
                {
                    resourceValue = $"{m_CustomTranslationSystem.GetLocalGameTranslation($"Resources.TITLE[{resource}]", resource.ToString())} [{resourceAmount}]";
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
