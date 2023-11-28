using Colossal.Entities;
using ExtendedTooltip.Systems;
using Game.Companies;
using Game.Economy;
using Game.Prefabs;
using Game.UI.Tooltip;
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

        public void Build(Entity companyEntity, TooltipGroup tooltipGroup)
        {
            // Company output tooltip
            if (m_Settings.CompanyOutput)
            {

                Entity companyEntityPrefab = m_EntityManager.GetComponentData<PrefabRef>(companyEntity).m_Prefab;
                // Company resource section
                if (m_EntityManager.TryGetBuffer(companyEntity, true, out DynamicBuffer<Game.Economy.Resources> _) && m_EntityManager.TryGetComponent(companyEntityPrefab, out IndustrialProcessData industrialProcessData))
                {
                    StringTooltip companyOutputTooltip = new();

                    if (m_EntityManager.HasComponent<ServiceAvailable>(companyEntity))
                    {
                        Resource outputResource = industrialProcessData.m_Output.m_Resource;
                        companyOutputTooltip.icon = "Media/Game/Resources/" + outputResource.ToString() + ".svg";
                        companyOutputTooltip.value = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.COMPANY_SELLS", "Sells") + ": " + m_CustomTranslationSystem.GetLocalGameTranslation($"Resources.TITLE[{outputResource}]", outputResource.ToString());
                        tooltipGroup.children.Add(companyOutputTooltip);
                        return;
                    }

                    if (m_EntityManager.HasComponent<Game.Companies.ProcessingCompany>(companyEntity))
                    {
                        Resource outputResource = industrialProcessData.m_Output.m_Resource;
                        companyOutputTooltip.icon = "Media/Game/Resources/" + outputResource.ToString() + ".svg";
                        companyOutputTooltip.value = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.COMPANY_PRODUCES", "Produces") + ": " + m_CustomTranslationSystem.GetLocalGameTranslation($"Resources.TITLE[{outputResource}]", outputResource.ToString());
                        tooltipGroup.children.Add(companyOutputTooltip);
                        return;
                    }

                    if (m_EntityManager.HasComponent<Game.Companies.ExtractorCompany>(companyEntity))
                    {
                        Resource outputResource = industrialProcessData.m_Output.m_Resource;
                        companyOutputTooltip.icon = "Media/Game/Resources/" + outputResource.ToString() + ".svg";
                        companyOutputTooltip.value = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.COMPANY_PRODUCES", "Produces") + ": " + m_CustomTranslationSystem.GetLocalGameTranslation($"Resources.TITLE[{outputResource}]", outputResource.ToString());
                        tooltipGroup.children.Add(companyOutputTooltip);
                        return;
                    }

                    if (m_EntityManager.HasComponent<Game.Companies.StorageCompany>(companyEntity))
                    {
                        StorageCompanyData componentData = m_EntityManager.GetComponentData<StorageCompanyData>(companyEntityPrefab);
                        Resource outputResource = componentData.m_StoredResources;
                        companyOutputTooltip.icon = "Media/Game/Resources/" + outputResource.ToString() + ".svg";
                        companyOutputTooltip.value = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.COMPANY_STORES", "Stores") + ": " + m_CustomTranslationSystem.GetLocalGameTranslation($"Resources.TITLE[{outputResource}]", outputResource.ToString());
                        tooltipGroup.children.Add(companyOutputTooltip);
                        return;
                    }
                }
            }
        }
    }
}
