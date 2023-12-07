using Colossal.Entities;
using ExtendedTooltip.Systems;
using Game.Objects;
using Game.Routes;
using Game.UI.Tooltip;
using System.Collections.Generic;
using System.Linq;
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
            if (m_Settings.PublicTransportWaitingPassengers == false && m_Settings.PublicTransportWaitingTime == false)
                return;

            int waitingPassengers = 0;
            int averageWaitingTime = 0;
            GetPassengerInfo(selectedEntity, ref averageWaitingTime, ref waitingPassengers);

            if (m_Settings.PublicTransportWaitingPassengers)
            {
                StringTooltip waitingPassengersTooltip = new()
                {
                    icon = "Media/Game/Icons/Population.svg",
                    value = $"{m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.WAITING_PASSENGERS", "Waiting passengers")}: {waitingPassengers}",
                };
                tooltipGroup.children.Add(waitingPassengersTooltip);
            }

            if (m_Settings.PublicTransportWaitingTime)
            {
                // Calculate average waiting time in minutes
                averageWaitingTime = averageWaitingTime <= 0 ? 0 : (int)math.round(averageWaitingTime / 60);
                StringTooltip averageWaitingTimeTooltip = new()
                {
                    icon = "Media/Game/Icons/Fastforward.svg",
                    value = $"{m_CustomTranslationSystem.GetTranslation("average_waiting_time", "~ waiting time")}: {averageWaitingTime}m",
                    color = averageWaitingTime < 60 ? TooltipColor.Success : averageWaitingTime < 120 ? TooltipColor.Warning : TooltipColor.Error,
                };
                tooltipGroup.children.Add(averageWaitingTimeTooltip);
            }   
        }

        private void GetPassengerInfo(Entity selectedEntity, ref int averageWaitingTime, ref int waitingPassengers)
        {
            if (m_EntityManager.TryGetComponent(selectedEntity, out WaitingPassengers waitingPassengersData1))
            {
                waitingPassengers = waitingPassengersData1.m_Count;
            }

            if (m_EntityManager.TryGetBuffer(selectedEntity, true, out DynamicBuffer<ConnectedRoute> dynamicBuffer))
            {
                int num = 0;
                for (int i = 0; i < dynamicBuffer.Length; i++)
                {
                    if (m_EntityManager.TryGetComponent(dynamicBuffer[i].m_Waypoint, out WaitingPassengers waitingPassengersData2))
                    {
                        waitingPassengers += waitingPassengersData2.m_Count;
                        num += waitingPassengersData2.m_AverageWaitingTime;
                    }
                }
                num /= math.max(1, dynamicBuffer.Length);
                num -= num % 5;
                averageWaitingTime = (ushort)num;
            }

            if (m_EntityManager.TryGetBuffer(selectedEntity, true, out DynamicBuffer<SubObject> subObjects))
            {
                List<int> averageWaitingTimes = [];
                for (int i = 0; i < subObjects.Length; i++)
                {
                    GetPassengerInfo(subObjects[i].m_SubObject, ref averageWaitingTime, ref waitingPassengers);
                }
            }
        }
    }
}
