using ExtendedTooltip.Systems;
using Game.Buildings;
using Game.UI.Tooltip;
using Unity.Entities;
using Unity.Mathematics;

namespace ExtendedTooltip.TooltipBuilder
{
    public class EfficiencyTooltipBuilder : TooltipBuilderBase
    {
        public EfficiencyTooltipBuilder(EntityManager entityManager, CustomTranslationSystem customTranslationSystem)
        : base(entityManager, customTranslationSystem)
        {
            UnityEngine.Debug.Log($"Created EfficiencyTooltipBuilder.");
        }

        public void Build(DynamicBuffer<Efficiency> efficiencyBuffer, TooltipGroup tooltipGroup)
        {
            int efficiency = (int)math.round(100f * GetEfficiency(efficiencyBuffer));
            StringTooltip efficiencyTooltip = new()
            {
                icon = "Media/Game/Icons/CompanyProfit.svg",
                value = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.EFFICIENCY", "Efficiency") + ": " + efficiency + "%",
                color = efficiency <= 99 ? TooltipColor.Warning : TooltipColor.Success,
            };
            tooltipGroup.children.Add(efficiencyTooltip);
        }

        public static float GetEfficiency(DynamicBuffer<Efficiency> buffer)
        {
            float num = 1f;
            foreach (Efficiency efficiency in buffer)
            {
                num *= math.max(0f, efficiency.m_Efficiency);
            }
            if (num <= 0f)
            {
                return 0f;
            }
            return math.max(0.01f, math.round(100f * num) / 100f);
        }
    }
}
