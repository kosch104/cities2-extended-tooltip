using ExtendedTooltip.Settings;
using ExtendedTooltip.Systems;
using Unity.Entities;

namespace ExtendedTooltip.TooltipBuilder
{
    public abstract class TooltipBuilderBase
    {
        protected EntityManager m_EntityManager;
        protected readonly CustomTranslationSystem m_CustomTranslationSystem;
        protected readonly ExtendedTooltipSystem m_ExtendedTooltipSystem;
        protected readonly LocalSettingsItem m_Settings;

        protected TooltipBuilderBase(EntityManager entityManager, CustomTranslationSystem customTranslationSystem)
        {
            m_EntityManager = entityManager;
            m_CustomTranslationSystem = customTranslationSystem;
            m_ExtendedTooltipSystem = entityManager.World.GetOrCreateSystemManaged<ExtendedTooltipSystem>();
            m_Settings = m_ExtendedTooltipSystem.m_LocalSettings.Settings;
        }
    }
}
