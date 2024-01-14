using ExtendedTooltip.Models;
using ExtendedTooltip.Settings;
using ExtendedTooltip.Systems;
using Game.UI;
using Unity.Entities;

namespace ExtendedTooltip.TooltipBuilder
{
    public abstract class TooltipBuilderBase
    {
        protected EntityManager m_EntityManager;
        protected readonly CustomTranslationSystem m_CustomTranslationSystem;
        protected readonly ExtendedTooltipSystem m_ExtendedTooltipSystem;
        protected readonly ExtendedTooltipModel m_Model;
        protected readonly NameSystem m_NameSystem;

        protected TooltipBuilderBase(EntityManager entityManager, CustomTranslationSystem customTranslationSystem)
        {
            m_EntityManager = entityManager;
            m_CustomTranslationSystem = customTranslationSystem;
            m_ExtendedTooltipSystem = entityManager.World.GetOrCreateSystemManaged<ExtendedTooltipSystem>();
            m_Model = m_ExtendedTooltipSystem.m_LocalSettings.SettingsModel;
            m_NameSystem = entityManager.World.GetOrCreateSystemManaged<NameSystem>();
        }
    }
}
