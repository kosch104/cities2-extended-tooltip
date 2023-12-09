using Colossal.Entities;
using ExtendedTooltip.Settings;
using ExtendedTooltip.TooltipBuilder;
using Game.Buildings;
using Game.Citizens;
using Game.City;
using Game.Common;
using Game.Companies;
using Game.Creatures;
using Game.Input;
using Game.Net;
using Game.Prefabs;
using Game.Routes;
using Game.Simulation;
using Game.Tools;
using Game.UI;
using Game.UI.InGame;
using Game.UI.Tooltip;
using Game.Vehicles;
using Game.Zones;
using System.Runtime.CompilerServices;
using Unity.Entities;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Scripting;

namespace ExtendedTooltip.Systems
{
    [CompilerGenerated]
    public class ExtendedTooltipSystem : TooltipSystemBase
    {
        public LocalSettings m_LocalSettings;
        public bool m_LocalSettingsLoaded = false;
        public bool hotkeyPressed = false;

        Entity? lastEntity;
        float timer = 0f;

        private ToolSystem m_ToolSystem;
        private DefaultToolSystem m_DefaultTool;
        private NameSystem m_NameSystem;
        private ImageSystem m_ImageSystem;
        private ToolRaycastSystem m_ToolRaycastSystem;
        private NameTooltip m_NameTooltip;
        private PrefabSystem m_PrefabSystem;
        private CustomTranslationSystem m_CustomTranslationSystem;

        private TooltipGroup m_TooltipGroup;
        private TooltipGroup m_SecondaryTooltipGroup;

        private CitizenTooltipBuilder m_CitizenTooltipBuilder;
        private VehicleTooltipBuilder m_VehicleTooltipBuilder;
        private SpawnablesTooltipBuilder m_SpawnablesTooltipBuilder;
        private RoadTooltipBuilder m_RoadTooltipBuilder;
        private EfficiencyTooltipBuilder m_EfficiencyTooltipBuilder;
        private ParkTooltipBuilder m_ParkTooltipBuilder;
        private ParkingFacilityTooltipBuilder m_ParkingFacilityTooltipBuilder;
        private PublicTransportationTooltipBuilder m_PublicTransportationTooltipBuilder;
        private EmployeesTooltipBuilder m_EmployeesTooltipBuilder;
        private SchoolTooltipBuilder m_SchoolTooltipBuilder;
        private CompanyTooltipBuilder m_CompanyTooltipBuilder;

        [Preserve]
        public ExtendedTooltipSystem()
        {
        }

        [Preserve]
        protected override void OnCreate()
        {
            base.OnCreate();
            LoadSettings();

            m_ToolSystem = World.GetOrCreateSystemManaged<ToolSystem>();
            m_DefaultTool = World.GetOrCreateSystemManaged<DefaultToolSystem>();
            m_NameSystem = World.GetOrCreateSystemManaged<NameSystem>();
            m_ImageSystem = World.GetOrCreateSystemManaged<ImageSystem>();
            m_ToolRaycastSystem = World.GetOrCreateSystemManaged<ToolRaycastSystem>();
            m_PrefabSystem = World.GetOrCreateSystemManaged<PrefabSystem>();
            m_CustomTranslationSystem = World.GetOrCreateSystemManaged<CustomTranslationSystem>();

            m_CitizenTooltipBuilder = new(EntityManager, m_CustomTranslationSystem);
            m_VehicleTooltipBuilder = new(EntityManager, m_CustomTranslationSystem, m_NameSystem);
            m_RoadTooltipBuilder = new(EntityManager, m_CustomTranslationSystem);
            m_SpawnablesTooltipBuilder = new(EntityManager, m_CustomTranslationSystem, m_PrefabSystem);
            m_EfficiencyTooltipBuilder = new(EntityManager, m_CustomTranslationSystem);
            m_ParkTooltipBuilder = new(EntityManager, m_CustomTranslationSystem);
            m_ParkingFacilityTooltipBuilder = new(EntityManager, m_CustomTranslationSystem);
            m_PublicTransportationTooltipBuilder = new(EntityManager, m_CustomTranslationSystem);
            m_EmployeesTooltipBuilder = new(EntityManager, m_CustomTranslationSystem);
            m_SchoolTooltipBuilder = new(EntityManager, m_CustomTranslationSystem);
            m_CompanyTooltipBuilder = new(EntityManager, m_CustomTranslationSystem);

            m_TooltipGroup = new TooltipGroup()
            {
                path = "extendedTooltipPrimary",
                horizontalAlignment = TooltipGroup.Alignment.Start,
                verticalAlignment = TooltipGroup.Alignment.Start
            };
            m_SecondaryTooltipGroup = new TooltipGroup()
            {
                path = "extendedTooltipSecondary",
                horizontalAlignment = TooltipGroup.Alignment.End,
                verticalAlignment = TooltipGroup.Alignment.Start,
            };
            m_NameTooltip = new NameTooltip
            {
                path = "raycastName",
                nameBinder = m_NameSystem
            };

            UnityEngine.Debug.Log("ExtendedTooltipSystem created.");
        }

        [Preserve]
        protected override void OnUpdate()
        {
            if (m_ToolSystem.activeTool == m_DefaultTool
                && m_ToolRaycastSystem.GetRaycastResult(out RaycastResult raycastResult) && (EntityManager.HasComponent<Building>(raycastResult.m_Owner)
                || EntityManager.HasComponent<Game.Routes.TransportStop>(raycastResult.m_Owner)
                || EntityManager.HasComponent<Game.Objects.OutsideConnection>(raycastResult.m_Owner)
                || EntityManager.HasComponent<Route>(raycastResult.m_Owner)
                || EntityManager.HasComponent<Creature>(raycastResult.m_Owner)
                || EntityManager.HasComponent<Vehicle>(raycastResult.m_Owner)
                || EntityManager.HasComponent<Aggregate>(raycastResult.m_Owner)
                || EntityManager.HasComponent<Game.Objects.NetObject>(raycastResult.m_Owner))
                && EntityManager.TryGetComponent(raycastResult.m_Owner, out PrefabRef prefabRef)
            ) {
                Entity entity = raycastResult.m_Owner;
                Entity prefab = prefabRef.m_Prefab;
                AdjustTargets(ref entity, ref prefab);

                hotkeyPressed = Input.GetKey(KeyCode.LeftAlt);

                m_NameTooltip.icon = m_ImageSystem.GetInstanceIcon(entity, prefab);
                m_NameTooltip.entity = entity;

                // Reset timer if entity changed
                if (lastEntity != null && !lastEntity.Equals(entity))
                {
                    timer = 0;
                    lastEntity = null;
                }

                m_TooltipGroup.children.Clear();
                m_SecondaryTooltipGroup.children.Clear();

                if (IsInfomodeActivated())
                {
                    AddMouseTooltip(m_NameTooltip);
                } else
                {
                    try
                    {
                        m_TooltipGroup.children.Add(m_NameTooltip);

                        // ExtendedTooltips entry point
                        LocalSettingsItem settings = m_LocalSettings.Settings;
                        if (!settings.DisableMod)
                        {
                            timer += World.Time.DeltaTime;
                            if ((settings.DisplayMode == DisplayMode.OnKey && hotkeyPressed)
                                || (settings.DisplayMode != DisplayMode.OnKey && settings.DisplayMode != DisplayMode.Delayed)
                                || (settings.DisplayMode == DisplayMode.Delayed && timer > 0.60f)
                            )
                            {
                                CreateExtendedTooltips(entity, prefab);
                                lastEntity = entity;
                            }
                        }

                        UpdateTooltipGroupPosition();
                        AddGroup(m_TooltipGroup);
                        AddGroup(m_SecondaryTooltipGroup);
                    }
                    catch (System.Exception e)
                    {
                        UnityEngine.Debug.Log("Creating ExtendedTooltips failed at: " + e);
                    }
                }                
            } else
            {
                timer = 0;
            }
        }

        private void LoadSettings()
        {
            try
            {
                m_LocalSettings = new();
                m_LocalSettings.Init();
                m_LocalSettingsLoaded = true;
            }
            catch (System.Exception e)
            {
                UnityEngine.Debug.Log($"Error loading settings: {e.Message}");
            }
        }

        private void CreateExtendedTooltips(Entity selectedEntity, Entity prefab)
        {
            // CITIZEN TOOLTIP
            
            if (m_LocalSettings.Settings.Citizen && EntityManager.TryGetComponent<Citizen>(selectedEntity, out var citizen))
            {
                m_CitizenTooltipBuilder.Build(selectedEntity, citizen, m_TooltipGroup);
                m_TooltipGroup.SetChildrenChanged();

                return; // don't have any other info. No need to check for other components
            }

            // VEHICLE TOOLTIP
            if (m_LocalSettings.Settings.Vehicle && EntityManager.HasComponent<Vehicle>(selectedEntity))
            {
                m_VehicleTooltipBuilder.Build(selectedEntity, prefab, m_TooltipGroup);
                return; // don't have any other info. No need to check for other components
            }

            // ROAD TOOLTIP
            if (m_LocalSettings.Settings.Road && EntityManager.HasComponent<AggregateElement>(selectedEntity))
            {
                m_RoadTooltipBuilder.Build(selectedEntity, m_TooltipGroup);
                return; // don't have any other info. No need to check for other components
            }

            // SPAWNABLES TOOLTIP
            if (m_LocalSettings.Settings.Spawnable && HasSpawnableBuildingData(selectedEntity, prefab, out int buildingLevel, out int currentCondition, out int levelingCost, out SpawnableBuildingData spawnableData))
            {
                m_SpawnablesTooltipBuilder.Build(selectedEntity, prefab, buildingLevel, currentCondition, levelingCost, spawnableData, m_TooltipGroup, m_SecondaryTooltipGroup);
            }

            // EFFICIENCY TOOLTIP
            if (m_LocalSettings.Settings.Efficiency && HasEfficiency(selectedEntity, prefab) && EntityManager.TryGetBuffer(selectedEntity, true, out DynamicBuffer<Efficiency> buffer))
            {
                m_EfficiencyTooltipBuilder.Build(buffer, m_TooltipGroup);
            }

            // PARK BUILDINGS TOOLTIP
            if ((m_LocalSettings.Settings.Park) && EntityManager.HasComponent<Game.Buildings.Park>(selectedEntity))
            {
                m_ParkTooltipBuilder.Build(selectedEntity, prefab, m_TooltipGroup);
                return; // don't have any other info. No need to check for other components
            }

            // PARKING FACILITY TOOLTIP
            if (m_LocalSettings.Settings.ParkingFacility && EntityManager.HasComponent<Game.Buildings.ParkingFacility>(selectedEntity))
            {
                m_ParkingFacilityTooltipBuilder.Build(selectedEntity, m_TooltipGroup);
                return; // don't have any other info. No need to check for other components
            }

            // PUBLIC TRANSPORTATION TOOLTIP
            if (m_LocalSettings.Settings.PublicTransport && (EntityManager.HasComponent<WaitingPassengers>(selectedEntity) || EntityManager.HasBuffer<ConnectedRoute>(selectedEntity) || EntityManager.HasComponent<Game.Buildings.TransportStation>(selectedEntity)))
            {
                m_PublicTransportationTooltipBuilder.Build(selectedEntity, m_TooltipGroup);
                return; // don't have any other info. No need to check for other components
            }

            // EMPLOYEES TOOLTIP
            if (m_LocalSettings.Settings.Employee && HasEmployees(selectedEntity, prefab))
            {
                m_EmployeesTooltipBuilder.Build(selectedEntity, prefab, m_TooltipGroup);
            }
            
            // SCHOOL TOOLTIP
            if (m_LocalSettings.Settings.School && EntityManager.HasComponent<Game.Buildings.School>(selectedEntity))
            {
                m_SchoolTooltipBuilder.Build(selectedEntity, prefab, m_TooltipGroup);
            }

            // COMPANY (Office, Industrial, Commercial) TOOLTIP
            if (m_LocalSettings.Settings.Company && CompanyUIUtils.HasCompany(EntityManager, selectedEntity, prefab, out Entity company))
            {
                m_CompanyTooltipBuilder.Build(company, m_TooltipGroup, m_SecondaryTooltipGroup);
            }
        }

        private bool HasEfficiency(Entity selectedEntity, Entity selectedPrefab)
        {
            return EntityManager.HasComponent<Efficiency>(selectedEntity) &&
                !EntityManager.HasComponent<Abandoned>(selectedEntity) &&
                !EntityManager.HasComponent<Destroyed>(selectedEntity) &&
                (!CompanyUIUtils.HasCompany(EntityManager, selectedEntity, selectedPrefab, out Entity entity) || entity != Entity.Null);
        }

        private bool HasEmployees(Entity entity, Entity prefab)
        {
            // Building is not yet rented or is a park (parks don't have employees)
            if (!EntityManager.TryGetBuffer(entity, true, out DynamicBuffer<Renter> dynamicBuffer) || EntityManager.HasComponent<Game.Buildings.Park>(entity))
            {
                return EntityManager.HasComponent<Employee>(entity) && EntityManager.HasComponent<WorkProvider>(entity);
            }

            // Is a commercial, industrial building or office
            if (dynamicBuffer.Length == 0 && EntityManager.TryGetComponent(prefab, out SpawnableBuildingData spawnableBuildingData))
            {
                ZonePrefab prefab2 = m_PrefabSystem.GetPrefab<ZonePrefab>(spawnableBuildingData.m_ZonePrefab);
                return prefab2 != null && (prefab2.m_AreaType == AreaType.Commercial || prefab2.m_AreaType == AreaType.Industrial || prefab2.m_Office);
            }

            for (int i = 0; i < dynamicBuffer.Length; i++)
            {
                Entity renter = dynamicBuffer[i].m_Renter;
                if (EntityManager.HasComponent<CompanyData>(renter))
                {
                    return EntityManager.HasComponent<Employee>(renter) && EntityManager.HasComponent<WorkProvider>(renter);
                }
            }

            return false;
        }

        private bool HasSpawnableBuildingData(Entity entity, Entity prefab, out int buildingLevel, out int currentCondition, out int levelingCost, out SpawnableBuildingData spawnableData)
        {
            buildingLevel = default;
            currentCondition = default;
            levelingCost = default;
            spawnableData = default;

            CitySystem citySystem = EntityManager.World.GetOrCreateSystemManaged<CitySystem>();
            Entity city = citySystem.City;

            if (EntityManager.TryGetComponent(prefab, out BuildingPropertyData buildingPropertyData) &&
                EntityManager.TryGetComponent(prefab, out SpawnableBuildingData spawnableBuildingData) &&
                EntityManager.TryGetComponent(entity, out BuildingCondition buildingCondition) &&
                EntityManager.TryGetBuffer(city, true, out DynamicBuffer<CityModifier> cityEffectsBuffer) &&
                EntityManager.TryGetComponent(spawnableBuildingData.m_ZonePrefab, out ZoneData zoneData)
            )
            {
                buildingLevel = spawnableBuildingData.m_Level;
                currentCondition = buildingCondition.m_Condition;
                spawnableData = spawnableBuildingData;
                levelingCost = spawnableBuildingData.m_Level < 5 ? BuildingUtils.GetLevelingCost(zoneData.m_AreaType, buildingPropertyData, spawnableBuildingData.m_Level, cityEffectsBuffer) : 0;

                return true;
            }

            return false;
        }

        private void AdjustTargets(ref Entity instance, ref Entity prefab)
        {
            if (EntityManager.TryGetComponent<Game.Creatures.Resident>(instance, out var component) && EntityManager.TryGetComponent<PrefabRef>(component.m_Citizen, out var component2))
            {
                instance = component.m_Citizen;
                prefab = component2.m_Prefab;
            }

            if (EntityManager.TryGetComponent<Controller>(instance, out var component3) && EntityManager.TryGetComponent<PrefabRef>(component3.m_Controller, out var component4))
            {
                instance = component3.m_Controller;
                prefab = component4.m_Prefab;
            }

            if (EntityManager.TryGetComponent<Game.Creatures.Pet>(instance, out var component5) && EntityManager.TryGetComponent<PrefabRef>(component5.m_HouseholdPet, out var component6))
            {
                instance = component5.m_HouseholdPet;
                prefab = component6.m_Prefab;
            }
        }

        private bool IsInfomodeActivated()
        {
            if (m_ToolSystem.activeInfoview == null)
            {
                return false;
            }

            return m_ToolSystem.activeInfoview.name.Equals("Electricity".Trim()) || m_ToolSystem.activeInfoview.name.Equals("WaterPipes".Trim());
        }

        private void UpdateTooltipGroupPosition()
        {
            Vector3 mousePosition = InputManager.instance.mousePosition;
            float2 tooltipDistance = new(0f, 16f);

            m_TooltipGroup.position = math.round(new float2(mousePosition.x, Screen.height - mousePosition.y) + tooltipDistance);
            m_TooltipGroup.SetPropertiesChanged();

            m_SecondaryTooltipGroup.position = math.round(new float2(m_TooltipGroup.position.x - 8.0f, m_TooltipGroup.position.y));
            m_SecondaryTooltipGroup.SetPropertiesChanged();
        }
    }
}
