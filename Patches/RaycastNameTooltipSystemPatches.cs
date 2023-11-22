using Colossal.Entities;
using ExtendedTooltip.Systems;
using Game.Buildings;
using Game.Citizens;
using Game.Common;
using Game.Companies;
using Game.Creatures;
using Game.Economy;
using Game.Input;
using Game.Net;
using Game.Prefabs;
using Game.Routes;
using Game.Tools;
using Game.UI;
using Game.UI.InGame;
using Game.UI.Localization;
using Game.UI.Tooltip;
using Game.Vehicles;
using Game.Zones;
using HarmonyLib;
using System;
using Unity.Collections;
using Unity.Entities;
using Unity.Mathematics;
using UnityEngine;
using Student = Game.Buildings.Student;

namespace ExtendedTooltip.Patches
{
    [HarmonyPatch(typeof(RaycastNameTooltipSystem), "OnUpdate")]
    public class RaycastNameTooltipSystem_OnUpdate
    {
        private static EntityManager m_EntityManager;
        private static PrefabSystem m_PrefabSystem;
        private static CustomTranslationSystem m_CustomTranslationSystem;

        /// <summary>
        /// This patch is responsible for creating the extended tooltip.
        /// It is called when the RaycastNameTooltipSystem is updated. So basically when the mouse is moved on different objects in the game.
        /// </summary>
        /// <param name="__instance"></param>
        /// <returns></returns>
        static bool Prefix(RaycastNameTooltipSystem __instance)
        {
            ToolSystem m_ToolSystem = Traverse.Create(__instance).Field("m_ToolSystem").GetValue<ToolSystem>();
            DefaultToolSystem m_DefaultTool = __instance.World.GetOrCreateSystemManaged<DefaultToolSystem>();
            NameSystem m_NameSystem = __instance.World.GetOrCreateSystemManaged<NameSystem>();
            ImageSystem m_ImageSystem = __instance.World.GetOrCreateSystemManaged<ImageSystem>();
            ToolRaycastSystem m_ToolRaycastSystem = __instance.World.GetOrCreateSystemManaged<ToolRaycastSystem>();

            m_EntityManager = __instance.World.EntityManager;
            m_PrefabSystem = __instance.World.GetOrCreateSystemManaged<PrefabSystem>();
            m_CustomTranslationSystem = __instance.World.GetOrCreateSystemManaged<CustomTranslationSystem>();

            if (m_ToolSystem.activeTool == m_DefaultTool && m_ToolRaycastSystem.GetRaycastResult(out var result) && 
                (m_EntityManager.HasComponent<Building>(result.m_Owner) || m_EntityManager.HasComponent<Game.Routes.TransportStop>(result.m_Owner)
                || m_EntityManager.HasComponent<Game.Objects.OutsideConnection>(result.m_Owner)
                || m_EntityManager.HasComponent<Route>(result.m_Owner)
                || m_EntityManager.HasComponent<Creature>(result.m_Owner)
                || m_EntityManager.HasComponent<Vehicle>(result.m_Owner)
                || m_EntityManager.HasComponent<Aggregate>(result.m_Owner)
                || m_EntityManager.HasComponent<Game.Objects.NetObject>(result.m_Owner))
                && m_EntityManager.TryGetComponent<PrefabRef>(result.m_Owner, out var component)
            ) {
                TooltipGroup tooltipGroup = CreateTooltipGroup();
                NameTooltip defaultTooltip = new()
                {
                    nameBinder = m_NameSystem
                };
                tooltipGroup.children.Add(defaultTooltip);

                Entity entity = result.m_Owner;
                Entity prefab = component.m_Prefab;
                AdjustTargets(ref entity, ref prefab);

                // Extended Tooltip Mod
                CreateExtendedTooltips(entity, prefab, ref tooltipGroup);

                defaultTooltip.icon = m_ImageSystem.GetInstanceIcon(entity, prefab);
                defaultTooltip.entity = entity;

                Traverse.Create(__instance).Method("AddGroup", tooltipGroup).GetValue();
            }

            return false;
        }

        private static void CreateExtendedTooltips(Entity selectedEntity, Entity prefab, ref TooltipGroup tooltipGroup)
        {
            // Add citizen info if available
            if (m_EntityManager.TryGetComponent<Citizen>(selectedEntity, out var citizen))
            {
                CreateExtendedTooltipForCitizen(selectedEntity, citizen, ref tooltipGroup);
                return;
            }

            // Add vehicle info if available (Taxis, Police cars, Public transport)
            if (m_EntityManager.HasComponent<Vehicle>(selectedEntity) &&
                (m_EntityManager.HasComponent<Game.Vehicles.Taxi>(selectedEntity) ||
                m_EntityManager.HasComponent<Game.Vehicles.PoliceCar>(selectedEntity) |
                m_EntityManager.HasComponent<Game.Vehicles.PublicTransport>(selectedEntity)
            ))
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
                                if (m_EntityManager.HasComponent<Game.Creatures.Human>(dynamicBuffer2[j].m_Passenger))
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
                            if (m_EntityManager.HasComponent<Game.Creatures.Human>(dynamicBuffer3[k].m_Passenger))
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

                return;
            }

            // Road info if available
            if (m_EntityManager.HasComponent<AggregateElement>(selectedEntity))
            {
                float length = 0f;
                float worstCondition = 0f;
                float bestCondition = 100f;
                float condition = 0f;
                float upkeep = 0f;

                //float[] volume = new float[5];
                //float[] flow = new float[5];

                DynamicBuffer<AggregateElement> buffer = m_EntityManager.GetBuffer<AggregateElement>(selectedEntity, true);
                for (int i = 0; i < buffer.Length; i++)
                {
                    Entity edge = buffer[i].m_Edge;
                    if (m_EntityManager.TryGetComponent(edge, out Road _) && m_EntityManager.TryGetComponent(edge, out Curve curve))
                    {
                        length += curve.m_Length;
                        // Still need some work
                        /*float4 @float = (road.m_TrafficFlowDistance0 + road.m_TrafficFlowDistance1) * 16f;
                        float4 float2 = NetUtils.GetTrafficFlowSpeed(road) * 100f;
                        volume[0] += @float.x * 4f / 24f;
                        volume[1] += @float.y * 4f / 24f;
                        volume[2] += @float.z * 4f / 24f;
                        volume[3] += @float.w * 4f / 24f;
                        flow[0] += float2.x;
                        flow[1] += float2.y;
                        flow[2] += float2.z;
                        flow[3] += float2.w;*/
                    }

                    if (m_EntityManager.TryGetComponent(edge, out NetCondition netCondition))
                    {
                        float2 wear = netCondition.m_Wear;
                        if (wear.x > worstCondition)
                        {
                            worstCondition = wear.x;
                        }
                        if (wear.y > worstCondition)
                        {
                            worstCondition = wear.y;
                        }
                        if (wear.x < bestCondition)
                        {
                            bestCondition = wear.x;
                        }
                        if (wear.y < bestCondition)
                        {
                            bestCondition = wear.y;
                        }
                        condition += math.csum(wear) * 0.5f;
                    }

                    if (m_EntityManager.TryGetComponent(edge, out PrefabRef prefabRef) && m_EntityManager.TryGetComponent(prefabRef.m_Prefab, out PlaceableNetData placeableNetData))
                    {
                        upkeep += placeableNetData.m_DefaultUpkeepCost;
                    }
                }

                // Traffic volume and flow need some work
                /*volume[0] /= buffer.Length;
                volume[1] /= buffer.Length;
                volume[2] /= buffer.Length;
                volume[3] /= buffer.Length;
                volume[4] = volume[0];
                flow[0] /= buffer.Length;
                flow[1] /= buffer.Length;
                flow[2] /= buffer.Length;
                flow[3] /= buffer.Length;
                flow[4] = flow[0];*/

                bestCondition = 100f - bestCondition / 10f * 100f;
                worstCondition = 100f - worstCondition / 10f * 100f;
                condition = condition / 10f * 100f;
                condition = 100f - condition / buffer.Length;

                // 1 = km , 0 = m
                int lengthFormat = length >= 1000 ? 1 : 0;
                string finalLength = (length >= 1000 ? math.round(length / 1000) : math.round(length)).ToString();
                StringTooltip lengthTooltip = new()
                {
                    icon = "Media/Game/Icons/OutsideConnections.svg",
                    value = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.LINE_VISUALIZER_LENGTH", "Length") + ": " +
                    m_CustomTranslationSystem.GetLocalGameTranslation(lengthFormat == 1 ? "Common.VALUE_KILOMETER" : "Common.VALUE_METER", lengthFormat == 1 ? " km" : " m", "SIGN", "","VALUE", finalLength)
                };
                tooltipGroup.children.Add(lengthTooltip);

                int finalUpkeep = Convert.ToInt16(upkeep);
                StringTooltip upkeepTooltip = new()
                {
                    icon = "Media/Game/Icons/ServiceUpkeep.svg",
                    value = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.UPKEEP", "Upkeep") + ": " +
                    m_CustomTranslationSystem.GetLocalGameTranslation(
                        "Common.VALUE_MONEY_PER_MONTH", finalUpkeep.ToString() + " /month",
                        "SIGN", "",
                        "VALUE", finalUpkeep.ToString()
                    ),
                };
                tooltipGroup.children.Add(upkeepTooltip);

                int finalAvgCondition = Convert.ToInt16(math.round(condition));
                int finalWorstCondition = Convert.ToInt16(math.round(worstCondition));
                int finalBestCondition = Convert.ToInt16(math.round(bestCondition));
                StringTooltip conditionTooltip = new()
                {
                    icon = "Media/Game/Icons/RoadsServices.svg",
                    value = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.ROAD_CONDITION", "Condition") + ": ~" + finalAvgCondition + $"% ({finalWorstCondition}% - {finalBestCondition}%)",
                    color = finalAvgCondition < 66 ? TooltipColor.Error : finalAvgCondition < 85 ? TooltipColor.Warning : finalAvgCondition < 95 ? TooltipColor.Info : TooltipColor.Success,
                };
                tooltipGroup.children.Add(conditionTooltip);

                return; // don't have any other info. No need to check for other components
            }

            // Add efficiency if available
            if (HasEfficiency(selectedEntity, prefab))
            {
                if (m_EntityManager.TryGetBuffer(selectedEntity, true, out DynamicBuffer<Efficiency> buffer))
                {
                    int efficiency = (int)math.round(100f * GetEfficiency(buffer));
                    StringTooltip efficiencyTooltip = new()
                    {
                        icon = "Media/Game/Icons/CompanyProfit.svg",
                        value = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.EFFICIENCY", "Efficiency") + ": " + efficiency + "%",
                        color = efficiency <= 99 ? TooltipColor.Warning : TooltipColor.Success,
                    };
                    tooltipGroup.children.Add(efficiencyTooltip);
                }
            }

            // Add info for parks if available
            if (m_EntityManager.HasComponent<Game.Buildings.Park>(selectedEntity))
            {
                int maintenance = 0;
                if (UpgradeUtils.TryGetCombinedComponent(m_EntityManager, selectedEntity, prefab, out ParkData parkData))
                {
                    Game.Buildings.Park componentData = m_EntityManager.GetComponentData<Game.Buildings.Park>(selectedEntity);
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

            // Add parking space info if available
            if (m_EntityManager.HasComponent<Game.Buildings.ParkingFacility>(selectedEntity))
            {
                int laneCount = 0;
                int parkingCapacity = 0;
                int parkedCars = 0;
                int parkingFee = 0;

                if (m_EntityManager.TryGetBuffer(selectedEntity, true, out DynamicBuffer<Game.Net.SubLane> dynamicBuffer))
                {
                    CheckParkingLanes(dynamicBuffer, ref laneCount, ref parkingCapacity, ref parkedCars, ref parkingFee);
                }
                if (m_EntityManager.TryGetBuffer(selectedEntity, true, out DynamicBuffer<Game.Net.SubNet> dynamicBuffer2))
                {
                    CheckParkingLanes(dynamicBuffer2, ref laneCount, ref parkingCapacity, ref parkedCars, ref parkingFee);
                }
                if (m_EntityManager.TryGetBuffer(selectedEntity, true, out DynamicBuffer<Game.Objects.SubObject> dynamicBuffer3))
                {
                    CheckParkingLanes(dynamicBuffer3, ref laneCount, ref parkingCapacity, ref parkedCars, ref parkingFee);
                }
                if (laneCount != 0)
                {
                    parkingFee /= laneCount;
                }
                if (parkingCapacity < 0)
                {
                    parkingCapacity = 0;
                }

                int parkingOccupationPercentage = parkedCars == 0 ? 0 : Convert.ToInt16(math.round(parkedCars * 100 / parkingCapacity));

                StringTooltip parkingFeesTooltip = new()
                {
                    icon = "Media/Game/Icons/ServiceFees.svg",
                    value = $"{m_CustomTranslationSystem.GetLocalGameTranslation("Policy.TITLE[Lot Parking Fee]")}: {m_CustomTranslationSystem.GetLocalGameTranslation("Common.VALUE_MONEY", "€", "SIGN", "", "VALUE", parkingFee.ToString())}",
                };
                StringTooltip parkingOccupationTooltip = new()
                {
                    icon = "Media/Game/Icons/Traffic.svg",
                    value = $"{m_CustomTranslationSystem.GetTranslation("extendedtooltip.parkinglots.utilization", "Utilization")}: {parkingOccupationPercentage}% [{parkedCars}/{parkingCapacity}]",
                    color = (parkingOccupationPercentage <= 75) ? TooltipColor.Success : (parkingOccupationPercentage <= 90) ? TooltipColor.Warning : TooltipColor.Error,
                };

                tooltipGroup.children.Add(parkingOccupationTooltip);
                tooltipGroup.children.Add(parkingFeesTooltip);

                return; // don't have any other info. No need to check for other components
            }

            if (m_EntityManager.HasComponent<WaitingPassengers>(selectedEntity) || m_EntityManager.HasBuffer<ConnectedRoute>(selectedEntity))
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
                averageWaitingTime = averageWaitingTime <= 0 ? 0 : (int) math.round(averageWaitingTime / 60);

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

            // Add residential info if available
            int residentCount = 0;
            int householdCount = 0;
            int maxHouseholds = 0;
            int petsCount = 0;
            NativeList<Entity> householdsResult = new(Allocator.Temp);
            if (CreateTooltipsForResidentialProperties(ref residentCount, ref householdCount, ref maxHouseholds, ref petsCount, ref householdsResult, selectedEntity, prefab))
            {
                BuildHouseholdCitizenInfo(householdCount, maxHouseholds, residentCount, petsCount, out string finalInfoString);
                StringTooltip householdTooltip = new()
                {
                    icon = "Media/Game/Icons/Household.svg",
                    value = finalInfoString,
                    color = householdCount == 0 ? TooltipColor.Info : (householdCount * 100 / maxHouseholds) < 50 ? TooltipColor.Error : (householdCount * 100 / maxHouseholds) < 80 ? TooltipColor.Warning : TooltipColor.Success
                };
                tooltipGroup.children.Add(householdTooltip);

                if (householdsResult.Length > 0 && m_EntityManager.TryGetComponent(prefab, out CitizenHappinessParameterData citizenHappinessParameterData))
                {
                    HouseholdWealthKey wealthKey = CitizenUIUtils.GetAverageHouseholdWealth(m_EntityManager, householdsResult, citizenHappinessParameterData);
                    string wealthLabel = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.CITIZEN_WEALTH_TITLE", "Household wealth");
                    string wealthValue = m_CustomTranslationSystem.GetLocalGameTranslation($"SelectedInfoPanel.CITIZEN_WEALTH[{wealthKey}]");
                    StringTooltip wealthTooltip = new()
                    {
                        icon = "Media/Game/Icons/CitizenWealth.svg",
                        value = $"{wealthLabel}: {wealthValue}",
                        color = TooltipColor.Info,
                    };
                    tooltipGroup.children.Add(wealthTooltip);
                }
            }

            // Service, commercial, offices and industrial buildings have employees
            if (HasEmployees(selectedEntity, prefab))
            { 
                int employeeCount = 0;
                int maxEmployees = 0;
                Entity renterEntity = GetRenter(selectedEntity);
                Entity renterPrefab = m_EntityManager.GetComponentData<PrefabRef>(renterEntity).m_Prefab;
                if (m_EntityManager.TryGetBuffer(renterEntity, true, out DynamicBuffer<Employee> dynamicBuffer) && m_EntityManager.TryGetComponent(renterEntity, out WorkProvider workProvider))
                {
                    employeeCount += dynamicBuffer.Length;

                    int buildingLevel = 1;
                    if (m_EntityManager.TryGetComponent(prefab, out SpawnableBuildingData spawnableBuildingData))
                    {
                        buildingLevel = spawnableBuildingData.m_Level;
                    }
                    else if (m_EntityManager.TryGetComponent(selectedEntity, out PropertyRenter propertyRenter)
                        && m_EntityManager.TryGetComponent(propertyRenter.m_Property, out PrefabRef prefabRef)
                        && m_EntityManager.TryGetComponent(prefabRef.m_Prefab, out SpawnableBuildingData spawnableBuildingData2))
                    {
                        buildingLevel = spawnableBuildingData2.m_Level;
                    }

                    WorkplaceComplexity complexity = m_EntityManager.GetComponentData<WorkplaceData>(renterPrefab).m_Complexity;
                    EmploymentData workplacesData = EmploymentData.GetWorkplacesData(workProvider.m_MaxWorkers, buildingLevel, complexity);
                    maxEmployees += workplacesData.total;
                    int employeeCountPercentage = employeeCount == 0 ? 0 : (int)math.round(100 * employeeCount / maxEmployees);

                    StringTooltip employeeTooltip = new()
                    {
                        icon = "Media/Game/Icons/Commuter.svg",
                        value = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.EMPLOYEES", "Employees") + ": " + employeeCount + "/" + maxEmployees,
                        color = (employeeCountPercentage == 0) ? TooltipColor.Info : (employeeCountPercentage <= 90) ? TooltipColor.Warning : TooltipColor.Success,
                    };
                    tooltipGroup.children.Add(employeeTooltip);
                }
            }

            // Add student info if available
            int studentCount = 0;
            int studentCapacity = 0;
            if (UpgradeUtils.TryGetCombinedComponent(m_EntityManager, selectedEntity, prefab, out SchoolData schoolData))
            {
                studentCapacity = schoolData.m_StudentCapacity;
            }
            if (m_EntityManager.TryGetBuffer(selectedEntity, true, out DynamicBuffer<Student> studentsBuffer))
            {
                studentCount = studentsBuffer.Length;
            }

            if (studentCapacity > 0)
            {
                StringTooltip studentTooltip = new()
                {
                    icon = "Media/Game/Icons/Population.svg",
                    value = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.EDUCATION_STUDENTS", "Students") + ": " + studentCount + "/" + studentCapacity,
                    color = (studentCount == 0) ? TooltipColor.Info : (studentCount * 100 / studentCapacity) <= 50 ? TooltipColor.Success : (studentCount * 100 / studentCapacity) <= 75 ? TooltipColor.Warning : TooltipColor.Error,
                };
                tooltipGroup.children.Add(studentTooltip);
            }

            if (CompanyUIUtils.HasCompany(m_EntityManager, selectedEntity, prefab, out Entity company))
            {
                CreateTooltipsForOutputCompanies(company, ref tooltipGroup);
            }
        }

        private static void AddPassengerCapacity(Entity prefab, ref int maxPassengers, ref int passengers, ref VehiclePassengerLocaleKey vehiclePassengerLocaleKey)
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

        private static bool HasEfficiency(Entity selectedEntity, Entity selectedPrefab)
        {
            return m_EntityManager.HasComponent<Efficiency>(selectedEntity) &&
                !m_EntityManager.HasComponent<Abandoned>(selectedEntity) &&
                !m_EntityManager.HasComponent<Destroyed>(selectedEntity) &&
                (!CompanyUIUtils.HasCompany(m_EntityManager, selectedEntity, selectedPrefab, out Entity entity) || entity != Entity.Null);
        }

        private static bool CreateTooltipsForResidentialProperties(
            ref int residentCount,
            ref int householdCount,
            ref int maxHouseholds,
            ref int petsCount,
            ref NativeList<Entity> householdsResult,
            Entity entity,
            Entity prefab
        ) {
            bool flag = false;
            bool isAbondened = m_EntityManager.HasComponent<Abandoned>(entity);
            bool hasBuildingPropertyData = m_EntityManager.TryGetComponent(prefab, out BuildingPropertyData buildingPropertyData);
            bool hasResidentialProperties = buildingPropertyData.m_ResidentialProperties > 0;

            // Only check for residents if the building is not abandoned and has residential properties
            if (!isAbondened && hasBuildingPropertyData && hasResidentialProperties)
            {
                flag = true;
                maxHouseholds += buildingPropertyData.m_ResidentialProperties;

                if (m_EntityManager.TryGetBuffer(entity, true, out DynamicBuffer<Renter> renterBuffer))
                {
                    for (int i = 0; i < renterBuffer.Length; i++)
                    {
                        Entity renter = renterBuffer[i].m_Renter;
                        if (m_EntityManager.TryGetBuffer(renter, true, out DynamicBuffer<HouseholdCitizen> householdCitizenBuffer))
                        {
                            householdsResult.Add(renter);
                            householdCount++;
                            for (int j = 0; j < householdCitizenBuffer.Length; j++)
                            {
                                // Is not in death routine
                                if (!CitizenUtils.IsCorpsePickedByHearse(m_EntityManager, householdCitizenBuffer[j].m_Citizen))
                                {
                                    residentCount++;
                                }
                            }

                            // Woof
                            if (m_EntityManager.TryGetBuffer(renter, true, out DynamicBuffer<HouseholdAnimal> animalBuffer))
                            {
                                petsCount += animalBuffer.Length;
                            }
                        }
                    }
                }
            }

            

            return flag;
        }

        private static void CreateExtendedTooltipForCitizen(Entity entity, Citizen citizen, ref TooltipGroup tooltipGroup)
        {
            // State
            CitizenStateKey stateKey = CitizenUIUtils.GetStateKey(m_EntityManager, entity);
            var stateStringBuilder = CachedLocalizedStringBuilder<CitizenStateKey>.Id((CitizenStateKey t) => $"SelectedInfoPanel.CITIZEN_STATE[{t:G}]");
            StringTooltip stateTooltip = new()
            {
                icon = "Media/Game/Icons/Information.svg",
                value = stateStringBuilder[stateKey],
                color = TooltipColor.Info,
            };
            tooltipGroup.children.Add(stateTooltip);

            // Happiness
            int happinessValue = citizen.Happiness;
            CitizenHappinessKey happinessKey = (CitizenHappinessKey)CitizenUtils.GetHappinessKey(happinessValue);
            StringTooltip happinessTooltip = new()
            {
                icon = "Media/Game/Icons/" + happinessKey.ToString() + ".svg",
                value = m_CustomTranslationSystem.GetLocalGameTranslation($"SelectedInfoPanel.CITIZEN_HAPPINESS_TITLE[${happinessKey}]", happinessKey.ToString()) + $" ({happinessValue})",
                color = happinessValue < 50 ? TooltipColor.Error : happinessValue < 75 ? TooltipColor.Warning : TooltipColor.Success
            };
            tooltipGroup.children.Add(happinessTooltip);

            // Education
            CitizenEducationKey educationKey = CitizenUIUtils.GetEducation(citizen);
            StringTooltip educationTooltip = new()
            {
                icon = "Media/Game/Icons/Education.svg",
                value = m_CustomTranslationSystem.GetLocalGameTranslation($"SelectedInfoPanel.CITIZEN_EDUCATION[${educationKey}]", educationKey.ToString()) + $" ({citizen.GetEducationLevel()})",
                color = TooltipColor.Info,
            };
            tooltipGroup.children.Add(educationTooltip);
        }

        private static void CreateTooltipsForOutputCompanies(Entity companyEntity, ref TooltipGroup tooltipGroup)
        {
            Entity companyEntityPrefab = m_EntityManager.GetComponentData<PrefabRef>(companyEntity).m_Prefab;
            // Company resource section
            if (m_EntityManager.TryGetBuffer(companyEntity, true, out DynamicBuffer<Game.Economy.Resources> _) && m_EntityManager.TryGetComponent(companyEntityPrefab, out IndustrialProcessData industrialProcessData))
            {
                StringTooltip companyOutputTooltip = new();

                if (m_EntityManager.HasComponent<ServiceAvailable>(companyEntity))
                {
                    Resource outputResource = industrialProcessData.m_Output.m_Resource;
                    companyOutputTooltip.icon = "Media/Game/Resources/" + outputResource.ToString() + ".svg";
                    companyOutputTooltip.value = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.COMPANY_SELLS", "Sells") + ": " + m_CustomTranslationSystem.GetLocalGameTranslation($"Resources.TITLE[{outputResource}]", outputResource.ToString());
                    tooltipGroup.children.Add(companyOutputTooltip);

                    return;
                }

                if (m_EntityManager.HasComponent<Game.Companies.ProcessingCompany>(companyEntity))
                {
                    Resource outputResource = industrialProcessData.m_Output.m_Resource;
                    companyOutputTooltip.icon = "Media/Game/Resources/" + outputResource.ToString() + ".svg";
                    companyOutputTooltip.value = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.COMPANY_PRODUCES", "Produces") + ": " + m_CustomTranslationSystem.GetLocalGameTranslation($"Resources.TITLE[{outputResource}]", outputResource.ToString());
                    tooltipGroup.children.Add(companyOutputTooltip);

                    return;
                }

                if (m_EntityManager.HasComponent<Game.Companies.ExtractorCompany>(companyEntity))
                {
                    Resource outputResource = industrialProcessData.m_Output.m_Resource;
                    companyOutputTooltip.icon = "Media/Game/Resources/" + outputResource.ToString() + ".svg";
                    companyOutputTooltip.value = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.COMPANY_PRODUCES", "Produces") + ": " + m_CustomTranslationSystem.GetLocalGameTranslation($"Resources.TITLE[{outputResource}]", outputResource.ToString());
                    tooltipGroup.children.Add(companyOutputTooltip);

                    return;
                }

                if (m_EntityManager.HasComponent<Game.Companies.StorageCompany>(companyEntity))
                {
                    StorageCompanyData componentData = m_EntityManager.GetComponentData<StorageCompanyData>(companyEntityPrefab);
                    Resource outputResource = componentData.m_StoredResources;
                    companyOutputTooltip.icon = "Media/Game/Resources/" + outputResource.ToString() + ".svg";
                    companyOutputTooltip.value = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.COMPANY_STORES", "Stores") + ": " + m_CustomTranslationSystem.GetLocalGameTranslation($"Resources.TITLE[{outputResource}]", outputResource.ToString());
                    tooltipGroup.children.Add(companyOutputTooltip);

                    return;
                }
            }
        }

        public static void BuildHouseholdCitizenInfo(int households, int maxHouseholds, int residents, int pets, out string finalInfoString)
        {
            // Households
            string householdsLabel = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.HOUSEHOLDS", "Households");
            string householdsValue = $"{households}/{maxHouseholds}";

            // Residents
            string residentsLabel = m_CustomTranslationSystem.GetLocalGameTranslation("Properties.ADJUST_HAPPINESS_MODIFIER_TARGET[Residents]", "Residents");
            string residentsValue = residents.ToString();
            
            // Pets
            string petsValue = pets.ToString();
            string petsLabel = pets > 1 ? m_CustomTranslationSystem.GetTranslation("extendedtooltip.pets", "Pets") : m_CustomTranslationSystem.GetTranslation("extendedtooltip.pet");

            // If residential building is > low density (only 1 household) show the household label only
            if (maxHouseholds > 1)
            {
                if (pets > 0)
                {
                    finalInfoString = $"{householdsValue} {householdsLabel} [{residentsValue} {residentsLabel}, {petsValue} {petsLabel}]";
                    return;
                }
                finalInfoString = $"{householdsValue} {householdsLabel} [{residentsValue} {residentsLabel}]";
            } else // low densitiy housing only has 1 household
            {
                if (pets > 0)
                {
                    finalInfoString = $"{residentsValue} {residentsLabel} [{petsValue} {petsLabel}]";
                    return;
                }
                finalInfoString = $"{residentsValue} {residentsLabel}";
            }
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

        private static Entity GetRenter(Entity entity)
        {
            if (!m_EntityManager.HasComponent<Game.Buildings.Park>(entity) && m_EntityManager.TryGetBuffer(entity, true, out DynamicBuffer<Renter> dynamicBuffer))
            {
                for (int i = 0; i < dynamicBuffer.Length; i++)
                {
                    Entity renter = dynamicBuffer[i].m_Renter;
                    if (m_EntityManager.HasComponent<CompanyData>(renter))
                    {
                        return renter;
                    }
                }
            }
            return entity;
        }

        // Token: 0x060022EF RID: 8943 RVA: 0x00104CE8 File Offset: 0x00102EE8
        private static void CheckParkingLanes(DynamicBuffer<Game.Objects.SubObject> subObjects, ref int laneCount, ref int parkingCapacity, ref int parkedCars, ref int parkingFee)
        {
            for (int i = 0; i < subObjects.Length; i++)
            {
                Entity subObject = subObjects[i].m_SubObject;
                if (m_EntityManager.TryGetBuffer(subObject, true, out DynamicBuffer<Game.Net.SubLane> dynamicBuffer))
                {
                    CheckParkingLanes(dynamicBuffer, ref laneCount, ref parkingCapacity, ref parkedCars, ref parkingFee);
                }
                DynamicBuffer<Game.Objects.SubObject> dynamicBuffer2;
                if (m_EntityManager.TryGetBuffer(subObject, true, out dynamicBuffer2))
                {
                    CheckParkingLanes(dynamicBuffer2, ref laneCount, ref parkingCapacity, ref parkedCars, ref parkingFee);
                }
            }
        }

        private static void CheckParkingLanes(DynamicBuffer<Game.Net.SubNet> subNets, ref int laneCount, ref int parkingCapacity, ref int parkedCars, ref int parkingFee)
        {
            for (int i = 0; i < subNets.Length; i++)
            {
                Entity subNet = subNets[i].m_SubNet;
                if (m_EntityManager.TryGetBuffer(subNet, true, out DynamicBuffer<Game.Net.SubLane> dynamicBuffer))
                {
                    CheckParkingLanes(dynamicBuffer, ref laneCount, ref parkingCapacity, ref parkedCars, ref parkingFee);
                }
            }
        }

        private static void CheckParkingLanes(DynamicBuffer<Game.Net.SubLane> subLanes, ref int laneCount, ref int parkingCapacity, ref int parkedCars, ref int parkingFee)
        {
            for (int i = 0; i < subLanes.Length; i++)
            {
                Entity subLane = subLanes[i].m_SubLane;
                if (m_EntityManager.TryGetComponent(subLane, out Game.Net.ParkingLane parkingLane))
                {
                    if ((parkingLane.m_Flags & ParkingLaneFlags.VirtualLane) == (ParkingLaneFlags)0)
                    {
                        Entity prefab = m_EntityManager.GetComponentData<PrefabRef>(subLane).m_Prefab;
                        Curve componentData = m_EntityManager.GetComponentData<Curve>(subLane);
                        DynamicBuffer<LaneObject> buffer = m_EntityManager.GetBuffer<LaneObject>(subLane, true);
                        ParkingLaneData componentData2 = m_EntityManager.GetComponentData<ParkingLaneData>(prefab);
                        if (componentData2.m_SlotInterval != 0f)
                        {
                            int num = (int)math.floor((componentData.m_Length + 0.01f) / componentData2.m_SlotInterval);
                            parkingCapacity += num;
                        }
                        else
                        {
                            parkingCapacity = -1000000;
                        }
                        for (int j = 0; j < buffer.Length; j++)
                        {
                            if (m_EntityManager.HasComponent<ParkedCar>(buffer[j].m_LaneObject))
                            {
                                parkedCars++;
                            }
                        }
                        parkingFee += parkingLane.m_ParkingFee;
                        laneCount++;
                    }
                }
                else if (m_EntityManager.TryGetComponent(subLane, out GarageLane garageLane))
                {
                    parkingCapacity += garageLane.m_VehicleCapacity;
                    parkedCars += garageLane.m_VehicleCount;
                    parkingFee += garageLane.m_ParkingFee;
                    laneCount++;
                }
            }
        }

        private static bool HasEmployees(Entity entity, Entity prefab)
        {
            // Building is not yet rented or is a park (parks don't have employees)
            if (!m_EntityManager.TryGetBuffer(entity, true, out DynamicBuffer<Renter> dynamicBuffer) || m_EntityManager.HasComponent<Game.Buildings.Park>(entity))
            {
                return m_EntityManager.HasComponent<Employee>(entity) && m_EntityManager.HasComponent<WorkProvider>(entity);
            }

            // Is a commercial, industrial building or office
            if (dynamicBuffer.Length == 0 && m_EntityManager.TryGetComponent(prefab, out SpawnableBuildingData spawnableBuildingData))
            {
                ZonePrefab prefab2 = m_PrefabSystem.GetPrefab<ZonePrefab>(spawnableBuildingData.m_ZonePrefab);
                return prefab2 != null && (prefab2.m_AreaType == AreaType.Commercial || prefab2.m_AreaType == AreaType.Industrial || prefab2.m_Office);
            }

            for (int i = 0; i < dynamicBuffer.Length; i++)
            {
                Entity renter = dynamicBuffer[i].m_Renter;
                if (m_EntityManager.HasComponent<CompanyData>(renter))
                {
                    return m_EntityManager.HasComponent<Employee>(renter) && m_EntityManager.HasComponent<WorkProvider>(renter);
                }
            }

            return false;
        }

        private static void AdjustTargets(ref Entity instance, ref Entity prefab)
        {
            if (m_EntityManager.TryGetComponent<Game.Creatures.Resident>(instance, out var component) && m_EntityManager.TryGetComponent<PrefabRef>(component.m_Citizen, out var component2))
            {
                instance = component.m_Citizen;
                prefab = component2.m_Prefab;
            }

            if (m_EntityManager.TryGetComponent<Controller>(instance, out var component3) && m_EntityManager.TryGetComponent<PrefabRef>(component3.m_Controller, out var component4))
            {
                instance = component3.m_Controller;
                prefab = component4.m_Prefab;
            }

            if (m_EntityManager.TryGetComponent<Game.Creatures.Pet>(instance, out var component5) && m_EntityManager.TryGetComponent<PrefabRef>(component5.m_HouseholdPet, out var component6))
            {
                instance = component5.m_HouseholdPet;
                prefab = component6.m_Prefab;
            }
        }

        private static TooltipGroup CreateTooltipGroup()
        {
            float2 kTooltipPointerDistance = new(0f, 16f);
            TooltipGroup tooltipGroup = new()
            {
                horizontalAlignment = TooltipGroup.Alignment.Start,
                verticalAlignment = TooltipGroup.Alignment.Start,
                path = "raycastName"
            };
            Vector3 mousePosition = InputManager.instance.mousePosition;
            tooltipGroup.position = math.round(new float2(mousePosition.x, Screen.height - mousePosition.y) + kTooltipPointerDistance);

            return tooltipGroup;
        }
    }
}
