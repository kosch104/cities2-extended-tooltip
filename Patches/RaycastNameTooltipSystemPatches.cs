using Colossal.Entities;
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
using Unity.Collections;
using Unity.Entities;
using Unity.Mathematics;
using UnityEngine;
using static Colossal.AssetPipeline.Diagnostic.Report;
using static Colossal.IO.AssetDatabase.AtlasFrame;
using Student = Game.Buildings.Student;

namespace ExtendedTooltip.Patches
{
    [HarmonyPatch(typeof(RaycastNameTooltipSystem), "OnUpdate")]
    public class RaycastNameTooltipSystem_OnUpdate
    {
        private static EntityManager m_EntityManager;
        private static PrefabSystem m_PrefabSystem;

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
                CreateExtendedTooltip(entity, prefab, ref tooltipGroup);

                defaultTooltip.icon = m_ImageSystem.GetInstanceIcon(entity, prefab);
                defaultTooltip.entity = entity;

                Traverse.Create(__instance).Method("AddGroup", tooltipGroup).GetValue();
            }

            return false;
        }

        private static void CreateExtendedTooltip(Entity selectedEntity, Entity prefab, ref TooltipGroup tooltipGroup)
        {

            // Add citizen info if available
            if (m_EntityManager.TryGetComponent<Citizen>(selectedEntity, out var citizen))
            {
                CreateExtendedTooltipForCitizen(selectedEntity, citizen, ref tooltipGroup);
                return;
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
                        value = "Efficiency: " + efficiency + "%",
                        color = efficiency <= 99 ? TooltipColor.Warning : TooltipColor.Success,
                    };
                    tooltipGroup.children.Add(efficiencyTooltip);
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
                    int employeeCountPercentage = (int)math.round(100 * employeeCount / maxEmployees);

                    StringTooltip employeeTooltip = new()
                    {
                        icon = "Media/Game/Icons/Commuter.svg",
                        value = "Employees: " + employeeCount + "/" + maxEmployees,
                        color = employeeCountPercentage <= 90 ? TooltipColor.Warning : TooltipColor.Success,
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
                    icon = "Media/Game/Icons/Workers.svg",
                    value = "Students: " + studentCount + "/" + studentCapacity,
                };
                tooltipGroup.children.Add(studentTooltip);
            }

            if (CompanyUIUtils.HasCompany(m_EntityManager, selectedEntity, prefab, out Entity company))
            {
                CreateTooltipsForOutputCompanies(company, ref tooltipGroup);
            }
        }

        private static bool HasEfficiency(Entity selectedEntity, Entity selectedPrefab)
        {
            return m_EntityManager.HasComponent<Efficiency>(selectedEntity) &&
                !m_EntityManager.HasComponent<Abandoned>(selectedEntity) &&
                !m_EntityManager.HasComponent<Destroyed>(selectedEntity) &&
                (!CompanyUIUtils.HasCompany(m_EntityManager, selectedEntity, selectedPrefab, out Entity entity) || entity != Entity.Null);
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
            var happinessStringBuilder = CachedLocalizedStringBuilder<CitizenHappinessKey>.Id((CitizenHappinessKey t) => $"SelectedInfoPanel.CITIZEN_HAPPINESS_TITLE[{t:G}]");
            StringTooltip happinessTooltip = new()
            {
                icon = "Media/Game/Icons/" + happinessKey.ToString() + ".svg",
                value = happinessStringBuilder[happinessKey],
                color = happinessValue < 50 ? TooltipColor.Error : happinessValue < 75 ? TooltipColor.Warning : TooltipColor.Success
            };
            tooltipGroup.children.Add(happinessTooltip);

            // Education
            CitizenEducationKey educationKey = CitizenUIUtils.GetEducation(citizen);
            var educationStringBuilder = CachedLocalizedStringBuilder<CitizenEducationKey>.Id((CitizenEducationKey t) => $"SelectedInfoPanel.CITIZEN_EDUCATION[{t:G}]");
            StringTooltip educationTooltip = new()
            {
                icon = "Media/Game/Icons/Education.svg",
                value = educationStringBuilder[educationKey],
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
                    companyOutputTooltip.value = "Sells: " + outputResource.ToString();
                    tooltipGroup.children.Add(companyOutputTooltip);

                    return;
                }

                if (m_EntityManager.HasComponent<Game.Companies.ProcessingCompany>(companyEntity))
                {
                    Resource outputResource = industrialProcessData.m_Output.m_Resource;
                    companyOutputTooltip.icon = "Media/Game/Resources/" + outputResource.ToString() + ".svg";
                    companyOutputTooltip.value = "Produces: " + outputResource.ToString();
                    tooltipGroup.children.Add(companyOutputTooltip);

                    return;
                }

                if (m_EntityManager.HasComponent<Game.Companies.ExtractorCompany>(companyEntity))
                {
                    Resource outputResource = industrialProcessData.m_Output.m_Resource;
                    companyOutputTooltip.icon = "Media/Game/Resources/" + outputResource.ToString() + ".svg";
                    companyOutputTooltip.value = "Produces: " + outputResource.ToString();
                    tooltipGroup.children.Add(companyOutputTooltip);

                    return;
                }

                if (m_EntityManager.HasComponent<Game.Companies.StorageCompany>(companyEntity))
                {
                    StorageCompanyData componentData = m_EntityManager.GetComponentData<StorageCompanyData>(companyEntityPrefab);
                    Resource outputResource = componentData.m_StoredResources;
                    companyOutputTooltip.icon = "Media/Game/Resources/" + outputResource.ToString() + ".svg";
                    companyOutputTooltip.value = "Stores: " + outputResource.ToString();
                    tooltipGroup.children.Add(companyOutputTooltip);

                    return;
                }
            }
        }

        // Token: 0x0600457B RID: 17787 RVA: 0x00288094 File Offset: 0x00286294
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

        private static TooltipColor CalculateTooltipColorByValue(int value)
        {
            if (value <= 50)
            {
                return TooltipColor.Error;
            }
            else if (value <= 99)
            {
                return TooltipColor.Warning;
            }
            else if (value == 100)
            {
                return TooltipColor.Info;
            }
            else
            {
                return TooltipColor.Success;
            }
        }
    }
}
