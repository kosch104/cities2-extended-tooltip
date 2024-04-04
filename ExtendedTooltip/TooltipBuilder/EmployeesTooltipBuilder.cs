using Colossal.Entities;
using ExtendedTooltip.Systems;
using Game.Buildings;
using Game.Companies;
using Game.Prefabs;
using Game.UI.InGame;
using Game.UI.Tooltip;
using Unity.Entities;
using Unity.Mathematics;

namespace ExtendedTooltip.TooltipBuilder
{
    public class EmployeesTooltipBuilder : TooltipBuilderBase
    {
        public EmployeesTooltipBuilder(EntityManager entityManager, CustomTranslationSystem customTranslationSystem)
        : base(entityManager, customTranslationSystem)
        {
            Mod.DebugLog($"Created EmployeesTooltipBuilder.");
        }

        public void Build(Entity selectedEntity, Entity prefab, TooltipGroup tooltipGroup)
        {
            int employeeCount = 0;
            int maxEmployees = 0;
            Entity renterEntity = GetRenter(selectedEntity);
            Entity renterPrefab = m_EntityManager.GetComponentData<PrefabRef>(renterEntity).m_Prefab;
            if (m_EntityManager.TryGetBuffer(renterEntity, true, out DynamicBuffer<Employee> dynamicBuffer) && m_EntityManager.TryGetComponent(renterEntity, out WorkProvider workProvider))
            {
                employeeCount += dynamicBuffer.Length;

                int commercialBuildingLevel = 1;
                if (m_EntityManager.TryGetComponent(prefab, out SpawnableBuildingData spawnableBuildingData))
                {
                    commercialBuildingLevel = spawnableBuildingData.m_Level;
                }
                else if (m_EntityManager.TryGetComponent(selectedEntity, out PropertyRenter propertyRenter)
                    && m_EntityManager.TryGetComponent(propertyRenter.m_Property, out PrefabRef prefabRef)
                    && m_EntityManager.TryGetComponent(prefabRef.m_Prefab, out SpawnableBuildingData spawnableBuildingData2))
                {
                    commercialBuildingLevel = spawnableBuildingData2.m_Level;
                }

                WorkplaceComplexity complexity = m_EntityManager.GetComponentData<WorkplaceData>(renterPrefab).m_Complexity;
                EmploymentData workplacesData = EmploymentData.GetWorkplacesData(workProvider.m_MaxWorkers, commercialBuildingLevel, complexity);
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

        private Entity GetRenter(Entity entity)
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
    }
}
