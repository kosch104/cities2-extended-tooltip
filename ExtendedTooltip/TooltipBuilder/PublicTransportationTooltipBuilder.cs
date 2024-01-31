using Colossal.Entities;
using ExtendedTooltip.Settings;
using ExtendedTooltip.Systems;
using Game.Objects;
using Game.Routes;
using Game.UI.Tooltip;
using System.Collections.Generic;
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
            ModSettings modSettings = m_ExtendedTooltipSystem.m_LocalSettings.ModSettings;
            if (modSettings.ShowPublicTransportWaitingPassengers == false && modSettings.ShowPublicTransportWaitingTime == false)
                return;

            int waitingPassengers = 0;
            int averageWaitingTime = 0;
            GetPassengerInfo(selectedEntity, ref averageWaitingTime, ref waitingPassengers);

            if (modSettings.ShowPublicTransportWaitingPassengers)
            {
                StringTooltip waitingPassengersTooltip = new()
                {
                    icon = "Media/Game/Icons/Population.svg",
                    value = $"{m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.WAITING_PASSENGERS", "Waiting passengers")}: {waitingPassengers}",
                };
                tooltipGroup.children.Add(waitingPassengersTooltip);
            }

            if (modSettings.ShowPublicTransportWaitingTime && waitingPassengers != 0)
            {
                string unit = "s";
                TooltipColor tooltipColor = TooltipColor.Success;
                if (averageWaitingTime < 0)
                    averageWaitingTime = 0;

                if (averageWaitingTime > 120)
                {
                    averageWaitingTime = (int)math.round(averageWaitingTime / 60);
                    unit = "m";
                    tooltipColor = averageWaitingTime < 60 ? TooltipColor.Success : averageWaitingTime < 120 ? TooltipColor.Warning : TooltipColor.Error;
                }
                
                StringTooltip averageWaitingTimeTooltip = new()
                {
                    icon = "Media/Game/Icons/Fastforward.svg",
                    value = $"{m_CustomTranslationSystem.GetTranslation("average_waiting_time", "~ waiting time")}: {averageWaitingTime}{unit}",
                    color = tooltipColor,
                };
                tooltipGroup.children.Add(averageWaitingTimeTooltip);
            }   
        }

        private void GetPassengerInfo(Entity selectedEntity, ref int averageWaitingTime, ref int waitingPassengers)
        {
            // Check connected routes
            if (m_EntityManager.TryGetBuffer(selectedEntity, true, out DynamicBuffer<ConnectedRoute> dynamicBuffer))
            {
                int num = 0;
                for (int i = 0; i < dynamicBuffer.Length; i++)
                {
                    if (m_EntityManager.TryGetComponent(dynamicBuffer[i].m_Waypoint, out WaitingPassengers waitingPassengersData))
                    {
                        waitingPassengers += waitingPassengersData.m_Count;
                        num += waitingPassengersData.m_AverageWaitingTime;
                    }
                }
                num /= math.max(1, dynamicBuffer.Length);
                num -= num % 5;
                averageWaitingTime += (ushort)num;
            }

            // Check building itself
            if (m_EntityManager.TryGetComponent(selectedEntity, out WaitingPassengers waitingPassengersData2))
            {
                waitingPassengers += waitingPassengersData2.m_Count;
                averageWaitingTime += waitingPassengersData2.m_AverageWaitingTime;
            }

            // Also count sub buildings (e.g extension buildings)
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
