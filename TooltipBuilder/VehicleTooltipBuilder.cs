using Unity.Entities;
using ExtendedTooltip.Systems;
using Game.Creatures;
using Game.Prefabs;
using Game.UI.InGame;
using Game.UI.Tooltip;
using Game.Vehicles;
using Colossal.Entities;

namespace ExtendedTooltip.TooltipBuilder
{
    internal class VehicleTooltipBuilder(EntityManager entityManager, CustomTranslationSystem customTranslationSystem)
    {
        private EntityManager m_EntityManager = entityManager;
        private readonly CustomTranslationSystem m_CustomTranslationSystem = customTranslationSystem;

        public void Build(Entity selectedEntity, Entity prefab, TooltipGroup tooltipGroup)
        {
            int passengers = 0;
            int maxPassengers = 0;
            VehiclePassengerLocaleKey vehiclePassengerLocaleKey = VehiclePassengerLocaleKey.Passenger;

            if (m_EntityManager.TryGetBuffer(selectedEntity, true, out DynamicBuffer<LayoutElement> dynamicBuffer))
            {
                for (int i = 0; i < dynamicBuffer.Length; i++)
                {
                    Entity vehicle = dynamicBuffer[i].m_Vehicle;
                    if (m_EntityManager.TryGetBuffer(vehicle, true, out DynamicBuffer<Passenger> dynamicBuffer2))
                    {
                        for (int j = 0; j < dynamicBuffer2.Length; j++)
                        {
                            if (m_EntityManager.HasComponent<Human>(dynamicBuffer2[j].m_Passenger))
                            {
                                int num = passengers;
                                passengers = num + 1;
                            }
                        }
                    }
                    if (m_EntityManager.TryGetComponent(vehicle, out PrefabRef vehiclePrefabRef))
                    {
                        Entity vehiclePrefab = vehiclePrefabRef.m_Prefab;
                        AddPassengerCapacity(vehiclePrefab, ref maxPassengers, ref passengers, ref vehiclePassengerLocaleKey);
                    }
                }
            }
            else
            {
                if (m_EntityManager.TryGetBuffer(selectedEntity, true, out DynamicBuffer<Passenger> dynamicBuffer3))
                {
                    for (int k = 0; k < dynamicBuffer3.Length; k++)
                    {
                        if (m_EntityManager.HasComponent<Human>(dynamicBuffer3[k].m_Passenger))
                        {
                            int num = passengers;
                            passengers = num + 1;
                        }
                    }
                }
                AddPassengerCapacity(prefab, ref maxPassengers, ref passengers, ref vehiclePassengerLocaleKey);
            }

            // Do not create tooltip with invalid values
            if (maxPassengers == 0)
            {
                return;
            }

            string tooltipTitle = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.PASSENGERS_TITLE", "Passengers");
            if (vehiclePassengerLocaleKey == VehiclePassengerLocaleKey.Prisoner)
            {
                tooltipTitle = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.POLICE_PRISONERS", "Prisoners");
            }

            StringTooltip vehicleCapacityTooltip = new()
            {
                icon = "Media/Game/Icons/Population.svg",
                value = $"{tooltipTitle}: {passengers}/{maxPassengers}",
            };
            tooltipGroup.children.Add(vehicleCapacityTooltip);
        }

        private void AddPassengerCapacity(Entity prefab, ref int maxPassengers, ref int passengers, ref VehiclePassengerLocaleKey vehiclePassengerLocaleKey)
        {
            if (m_EntityManager.TryGetComponent(prefab, out PersonalCarData personalCarData))
            {
                maxPassengers += personalCarData.m_PassengerCapacity - 1;
                passengers--;
                return;
            }
            if (m_EntityManager.TryGetComponent(prefab, out TaxiData taxiData))
            {
                maxPassengers += taxiData.m_PassengerCapacity;
                return;
            }
            if (m_EntityManager.TryGetComponent(prefab, out PoliceCarData policeCarData))
            {
                vehiclePassengerLocaleKey = VehiclePassengerLocaleKey.Prisoner;
                maxPassengers += policeCarData.m_CriminalCapacity;
                return;
            }
            if (m_EntityManager.TryGetComponent(prefab, out PublicTransportVehicleData publicTransportVehicleData))
            {
                maxPassengers += publicTransportVehicleData.m_PassengerCapacity;
            }
        }
    }
}
