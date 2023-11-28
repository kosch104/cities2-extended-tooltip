using Colossal.Entities;
using ExtendedTooltip.Systems;
using Game.Routes;
using Game.UI.Tooltip;
using Unity.Entities;
using Unity.Mathematics;

namespace ExtendedTooltip.TooltipBuilder
{
    public class PublicTransportationTooltipBuilder : TooltipBuilderBase
    {
        public PublicTransportationTooltipBuilder(EntityManager entityManager, CustomTranslationSystem customTranslationSystem)
        : base(entityManager, customTranslationSystem)
        {
            UnityEngine.Debug.Log($"Created PublicTransportationTooltipBuilder.");
        }

        public void Build(Entity selectedEntity, TooltipGroup tooltipGroup)
        {
            int averageWaitingTime = 0;
            m_EntityManager.TryGetComponent(selectedEntity, out WaitingPassengers waitingPassengers);
            if (m_EntityManager.TryGetBuffer(selectedEntity, true, out DynamicBuffer<ConnectedRoute> dynamicBuffer))
            {
                int num = 0;
                for (int i = 0; i < dynamicBuffer.Length; i++)
                {
                    if (m_EntityManager.TryGetComponent(dynamicBuffer[i].m_Waypoint, out WaitingPassengers waitingPassengers2))
                    {
                        waitingPassengers.m_Count += waitingPassengers2.m_Count;
                        num += waitingPassengers2.m_AverageWaitingTime;
                    }
                }
                num /= math.max(1, dynamicBuffer.Length);
                num -= num % 5;
                averageWaitingTime = (ushort)num;
            }

            // Calculate average waiting time in minutes
            averageWaitingTime = averageWaitingTime <= 0 ? 0 : (int)math.round(averageWaitingTime / 60);

            StringTooltip waitingPassengersTooltip = new()
            {
                icon = "Media/Game/Icons/Population.svg",
                value = $"{m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.WAITING_PASSENGERS", "Waiting passengers")}: {waitingPassengers.m_Count}",
            };
            StringTooltip averageWaitingTimeTooltip = new()
            {
                icon = "Media/Game/Icons/Fastforward.svg",
                value = $"{m_CustomTranslationSystem.GetTranslation("extendedtooltip.average_waiting_time", "~ waiting time")}: {averageWaitingTime}m",
                color = averageWaitingTime < 60 ? TooltipColor.Success : averageWaitingTime < 120 ? TooltipColor.Warning : TooltipColor.Error,
            };
            tooltipGroup.children.Add(waitingPassengersTooltip);
            tooltipGroup.children.Add(averageWaitingTimeTooltip);
        }
    }
}
