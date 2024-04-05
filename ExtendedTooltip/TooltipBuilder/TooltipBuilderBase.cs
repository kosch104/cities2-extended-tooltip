using ExtendedTooltip.Models;
using ExtendedTooltip.Systems;
using Game.UI;
using Unity.Entities;

namespace ExtendedTooltip.TooltipBuilder
{
    public abstract class TooltipBuilderBase(EntityManager entityManager, CustomTranslationSystem customTranslationSystem)
    {
        protected EntityManager m_EntityManager = entityManager;
        protected readonly CustomTranslationSystem m_CustomTranslationSystem = customTranslationSystem;
        protected readonly ExtendedTooltipSystem m_ExtendedTooltipSystem = entityManager.World.GetOrCreateSystemManaged<ExtendedTooltipSystem>();
        protected readonly NameSystem m_NameSystem = entityManager.World.GetOrCreateSystemManaged<NameSystem>();
    }
}
