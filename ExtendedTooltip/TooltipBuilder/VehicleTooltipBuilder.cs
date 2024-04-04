using Unity.Entities;
using ExtendedTooltip.Systems;
using Game.Creatures;
using Game.Prefabs;
using Game.UI.InGame;
using Game.UI.Tooltip;
using Game.Vehicles;
using Colossal.Entities;
using Game.UI;
using Game.Citizens;
using Game.Objects;
using UnityEngine;
using Unity.Mathematics;
using System.Globalization;
using ExtendedTooltip.Settings;

namespace ExtendedTooltip.TooltipBuilder
{
    internal class VehicleTooltipBuilder : TooltipBuilderBase
    {
        public VehicleTooltipBuilder(EntityManager entityManager, CustomTranslationSystem customTranslationSystem, NameSystem nameSystem)
        : base(entityManager, customTranslationSystem)
        {
            Mod.DebugLog("Created VehicleTooltipBuilder.");
        }

        public void Build(Entity selectedEntity, Entity prefab, TooltipGroup tooltipGroup)
        {
            ModSettings modSettings = m_ExtendedTooltipSystem.m_LocalSettings.ModSettings;

            bool isPersonalCar = m_EntityManager.HasComponent<Game.Vehicles.PersonalCar>(selectedEntity);
            bool isPoliceCar = m_EntityManager.HasComponent<Game.Vehicles.PoliceCar>(selectedEntity);
            bool isGarbageTruck = m_EntityManager.HasComponent<Game.Vehicles.GarbageTruck>(selectedEntity);
            bool isPostVan = m_EntityManager.HasComponent<Game.Vehicles.PostVan>(selectedEntity);
            bool isPublicTransport = m_EntityManager.HasComponent<Game.Vehicles.PublicTransport>(selectedEntity);
            bool isTaxi = m_EntityManager.HasComponent<Game.Vehicles.Taxi>(selectedEntity);
            bool isParked = m_EntityManager.HasComponent<ParkedCar>(selectedEntity);

            if (modSettings.ShowVehicleState && !isParked)
            {
                VehicleStateLocaleKey vehicleStateLocaleKey;
                vehicleStateLocaleKey = VehicleUIUtils.GetStateKey(selectedEntity, m_EntityManager);
                string finalStateValueString = m_CustomTranslationSystem.GetLocalGameTranslation($"SelectedInfoPanel.VEHICLE_STATES[{vehicleStateLocaleKey}]", "Unknown");
                StringTooltip vehicleStateTooltip = new()
                {
                    icon = "Media/Game/Icons/AdvisorInfoView.svg",
                    value = finalStateValueString,
                };
                tooltipGroup.children.Add(vehicleStateTooltip);
            }

            // GARBAGE TRUCKS
            if (modSettings.ShowVehicleGarbageTruck && isGarbageTruck && !isParked) {
                Game.Vehicles.GarbageTruck garbageTruck = m_EntityManager.GetComponentData<Game.Vehicles.GarbageTruck>(selectedEntity);
                GarbageTruckData garbageTruckData = m_EntityManager.GetComponentData<GarbageTruckData>(prefab);

                float collectedGarbage = garbageTruck.m_Garbage <= 0 ? 0 : garbageTruck.m_Garbage / 1000f;
                float garbageCapacity = garbageTruckData.m_GarbageCapacity / 1000f;
                string finalResourceLabelString = m_CustomTranslationSystem.GetLocalGameTranslation("Resources.TITLE[Garbage]", "Garbage");
                
                StringTooltip garbageTruckTooltip = new()
                {
                    icon = "Media/Game/Icons/DeliveryVan.svg",
                    value = $"{finalResourceLabelString}: {collectedGarbage.ToString("F", CultureInfo.InvariantCulture)} / {garbageCapacity.ToString("F", CultureInfo.InvariantCulture)} t",
                };
                tooltipGroup.children.Add(garbageTruckTooltip);
            }

            // POST VANS
            if (modSettings.ShowVehiclePostvan && isPostVan && !isParked)
            {
                Game.Vehicles.PostVan postVan = m_EntityManager.GetComponentData<Game.Vehicles.PostVan>(selectedEntity);
                PostVanData postVanData = m_EntityManager.GetComponentData<PostVanData>(prefab);

                float toDeliverValue = postVan.m_DeliveringMail <= 0 ? 0 : postVan.m_DeliveringMail / 1000f;
                string toDeliverMailString = toDeliverValue.ToString("F", CultureInfo.InvariantCulture);
                float collectedValue = postVan.m_CollectedMail <= 0 ? 0 : postVan.m_CollectedMail / 1000f;
                string collectedMailString = collectedValue.ToString("F", CultureInfo.InvariantCulture);
                string combinedMailString = (toDeliverValue + collectedValue).ToString("F", CultureInfo.InvariantCulture);
                string capacityString = (postVanData.m_MailCapacity / 1000f).ToString("F", CultureInfo.InvariantCulture);

                string finalDeliveredLabelString = m_CustomTranslationSystem.GetTranslation("mail.to_deliver", "To deliver");
                StringTooltip toDeliverTooltip = new()
                {
                    icon = "Media/Game/Icons/DeliveryVan.svg",
                    value = $"{finalDeliveredLabelString}: {toDeliverMailString} t",
                };
                tooltipGroup.children.Add(toDeliverTooltip);

                string finalCollectedLabelString = m_CustomTranslationSystem.GetTranslation("mail.collected", "Collected");
                StringTooltip collectedTooltip = new()
                {
                    icon = "Media/Game/Icons/DeliveryVan.svg",
                    value = $"{finalCollectedLabelString}: {collectedMailString} t",
                };
                tooltipGroup.children.Add(collectedTooltip);

                string finalCapacityLabelString = m_CustomTranslationSystem.GetTranslation("mail.capacity", "Capacity");
                StringTooltip postCapacityTooltip = new()
                {
                    icon = "Media/Game/Icons/DeliveryVan.svg",
                    value = $"{finalCapacityLabelString}: {combinedMailString} / {capacityString} t",
                };
                tooltipGroup.children.Add(postCapacityTooltip);
            }

            //  PASSENGERS INFO OF POLICE CARS, PERSONAL CARS, PUBLIC TRANSPORT AND TAXIS
            if (modSettings.ShowVehiclePassengerDetails && !isParked && (isPoliceCar || isPersonalCar || isPublicTransport || isTaxi))
            {
                if (modSettings.ShowVehicleDriver
                    && m_EntityManager.TryGetComponent(selectedEntity, out Game.Vehicles.PersonalCar personalCar)
                    && !m_EntityManager.HasComponent<ParkedCar>(selectedEntity)
                    && personalCar.m_Keeper != InfoList.Item.kNullEntity)
                {
                    NameTooltip vehicleDriverTooltip = new()
                    {
                        nameBinder = m_NameSystem,
                        entity = personalCar.m_Keeper,
                        icon = "Media/Game/Icons/Citizen.svg",
                    };
                    tooltipGroup.children.Add(vehicleDriverTooltip);
                }

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
                if (maxPassengers == 0 || passengers < 0)
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

        private void CreateVehicleSpeedInKmPerHour(Entity entity, out int currentSpeed, out int maxSpeed)
        {
            float3 previousPosition;
            float previousTime;
            currentSpeed = 0;
            maxSpeed = 0;

            if (m_EntityManager.TryGetComponent(entity, out CurrentTransport currentTransport))
            {
                entity = currentTransport.m_CurrentTransport;
                Entity prefab = m_EntityManager.GetComponentData<PrefabRef>(entity).m_Prefab;

                if (m_EntityManager.TryGetComponent(prefab, out Game.Objects.Transform transform)) {
                    previousPosition = transform.m_Position;
                    previousTime = Time.time;

                    int num = Mathf.RoundToInt(math.length(m_EntityManager.GetComponentData<Moving>(entity).m_Velocity) * 3.6f);
                    int num2 = Mathf.RoundToInt(999.99994f);

                    if (m_EntityManager.TryGetComponent(prefab, out CarData carData))
                    {
                        num2 = Mathf.RoundToInt(carData.m_MaxSpeed * 3.6f);
                    }
                    else if (m_EntityManager.TryGetComponent(prefab, out WatercraftData watercraftData))
                    {
                        num2 = Mathf.RoundToInt(watercraftData.m_MaxSpeed * 3.6f);
                    }
                    else if (m_EntityManager.TryGetComponent(prefab, out AirplaneData airplaneData))
                    {
                        num2 = Mathf.RoundToInt(airplaneData.m_FlyingSpeed.y * 3.6f);
                    }
                    else if (m_EntityManager.TryGetComponent(prefab, out HelicopterData helicopterData))
                    {
                        num2 = Mathf.RoundToInt(helicopterData.m_FlyingMaxSpeed * 3.6f);
                    }
                    else if (m_EntityManager.TryGetComponent(prefab, out TrainData trainData))
                    {
                        num2 = Mathf.RoundToInt(trainData.m_MaxSpeed * 3.6f);
                    }

                    float deltaTime = Time.time - previousTime;

                    // Calculate displacement vector
                    Vector3 displacement = transform.m_Position - previousPosition;

                    // Calculate velocity vector
                    Vector3 velocity = displacement / deltaTime;

                    // Optionally, calculate speed (magnitude of velocity)
                    float speed = velocity.magnitude;

                    // Convert speed to km/h
                    float speedKmPerHour = speed * 3.6f; // 1 m/s = 3.6 km/h

                    // Output the speed to the console
                    Debug.Log($"Game Speed: {num} km/h");

                    currentSpeed = Mathf.RoundToInt(speedKmPerHour);
                    maxSpeed = num2;
                }
            }
        }
    }
}
