using ExtendedTooltip.Systems;
using Game.Prefabs;
using Game.UI.Tooltip;
using Unity.Entities;
using Unity.Mathematics;
using UnityEngine;

namespace ExtendedTooltip.TooltipBuilder
{
    public class ParkTooltipBuilder(EntityManager entityManager, CustomTranslationSystem customTranslationSystem)
    {
        private EntityManager EntityManager = entityManager;
        private readonly CustomTranslationSystem m_CustomTranslationSystem = customTranslationSystem;

        public void Build(Entity selectedEntity, Entity prefab, TooltipGroup tooltipGroup)
        {
            int maintenance = 0;
            if (UpgradeUtils.TryGetCombinedComponent(EntityManager, selectedEntity, prefab, out ParkData parkData))
            {
                Game.Buildings.Park componentData = EntityManager.GetComponentData<Game.Buildings.Park>(selectedEntity);
                maintenance = Mathf.CeilToInt(math.select(componentData.m_Maintenance / (float)parkData.m_MaintenancePool, 0f, parkData.m_MaintenancePool == 0) * 100f);
            }

            StringTooltip parkTooltip = new()
            {
                icon = "Media/Game/Icons/ParkMaintenance.svg",
                value = $"{m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.PARK_MAINTENANCE", "Maintenence")}: {maintenance}%",
                color = (maintenance) <= 40 ? TooltipColor.Error : (maintenance) <= 60 ? TooltipColor.Warning : TooltipColor.Success,
            };
            tooltipGroup.children.Add(parkTooltip);
        }
    }
}
