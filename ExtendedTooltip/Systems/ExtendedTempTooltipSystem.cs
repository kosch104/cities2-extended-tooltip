using ExtendedTooltip.Settings;
using Game.Common;
using Game.Prefabs;
using Game.Simulation;
using Game.Tools;
using Game.UI.Tooltip;
using HarmonyLib;
using System;
using System.Linq;
using Unity.Entities;
using Unity.Mathematics;
using UnityEngine.Scripting;

namespace ExtendedTooltip.Systems
{
    public partial class ExtendedTempTooltipSystem : TooltipSystemBase
    {
        private NetToolSystem m_NetToolSystem;
        private ToolSystem m_ToolSystem;
        private CustomTranslationSystem m_CustomTranslationSystem;
        private ExtendedTooltipSystem m_ExtendedTooltipSystem;
        private ToolRaycastSystem m_ToolRaycastSystem;
        private TerrainSystem m_TerrainSystem;
        private TerrainToolSystem m_TerrainToolSystem;

        private ModSettings m_Settings;
        private StringTooltip m_NetToolMode;

        private Type _waterFeaturesType;

        [Preserve]
        protected override void OnCreate()
        {
            base.OnCreate();

            m_ToolSystem = World.GetOrCreateSystemManaged<ToolSystem>();
            m_NetToolSystem = World.GetOrCreateSystemManaged<NetToolSystem>();
            m_CustomTranslationSystem = World.GetOrCreateSystemManaged<CustomTranslationSystem>();
            m_ExtendedTooltipSystem = World.GetOrCreateSystemManaged<ExtendedTooltipSystem>();
            m_TerrainToolSystem = World.GetOrCreateSystemManaged<TerrainToolSystem>();
            m_TerrainSystem = World.GetOrCreateSystemManaged<TerrainSystem>();
            m_ToolRaycastSystem = World.GetOrCreateSystemManaged<ToolRaycastSystem>();

            m_Settings = m_ExtendedTooltipSystem.m_LocalSettings.ModSettings;
            DetectWaterFeaturesMod();

            m_NetToolMode = new StringTooltip
            {
                path = "etNetTool",
            };
        }

        [Preserve]
        protected override void OnUpdate()
        {
            if (m_ToolSystem == null || m_ToolSystem.activeTool is DefaultToolSystem)
                return;

            if (m_ToolSystem.activeTool is NetToolSystem && m_Settings.ShowNetToolSystem && m_Settings.ShowNetToolMode)
            {
                m_NetToolMode.icon = $"Media/Tools/Net Tool/{m_NetToolSystem.mode}.svg";
                m_NetToolMode.value = m_CustomTranslationSystem.GetLocalGameTranslation($"ToolOptions.TOOLTIP_TITLE[{m_NetToolSystem.mode}]");

                // Add elevation to tooltip if it's not 0.0f
                if (m_Settings.ShowNetToolElevation && m_NetToolSystem.elevation != 0.0f)
                {
                    // Add + sign for positive elevation (- is added by default)
                    string sign = (m_NetToolSystem.elevation > 0.0f) ? "+" : "";
                    m_NetToolMode.value = m_CustomTranslationSystem.GetLocalGameTranslation($"ToolOptions.TOOLTIP_TITLE[{m_NetToolSystem.mode}]") + $" ({sign}{m_NetToolSystem.elevation} m)";
                }

                AddMouseTooltip(m_NetToolMode);
            }

            if ((m_Settings.ShowTerrainToolHeight && m_ToolSystem.activeTool is TerrainToolSystem) || (m_Settings.ShowWaterToolHeight && (m_ToolSystem.activeTool is WaterToolSystem || AnyOtherSupportedCustomToolSystem())))
            {
                TerrainHeightData heightData = m_TerrainSystem.GetHeightData();

                if (m_ToolRaycastSystem.GetRaycastResult(out RaycastResult raycastResult))
                {
                    float3 applyPosition = raycastResult.m_Hit.m_HitPosition;
                    float applyHeight = TerrainUtils.SampleHeight(ref heightData, applyPosition);
                    FloatTooltip terrainToolMode = new()
                    {
                        icon = "Media/Glyphs/TrendUp.svg",
                        path = "etTerrainToolApplyHeight",
                        unit = "length",
                        value = applyHeight,
                    };
                    AddMouseTooltip(terrainToolMode);

                    // Add level height tooltip if the tool is set to level
                    if (m_ToolSystem.activeTool is TerrainToolSystem)
                    {
                        if (m_TerrainToolSystem.prefab.m_Type == TerraformingType.Level || m_TerrainToolSystem.prefab.m_Type == TerraformingType.Slope)
                        {
                            float3 targetPosition = Traverse.Create(m_TerrainToolSystem).Field<float3>("m_TargetPosition").Value;
                            float targetHeight = TerrainUtils.SampleHeight(ref heightData, targetPosition);
                            FloatTooltip terrainTargetPosition = new()
                            {
                                icon = $"Media/Tools/Terrain Tool/{Enum.GetName(typeof(TerraformingType), m_TerrainToolSystem.prefab.m_Type)}.svg",
                                path = "etTerrainToolTargetHeight",
                                unit = "length",
                                color = targetHeight > applyHeight ? TooltipColor.Success : targetHeight == applyHeight ? TooltipColor.Info : TooltipColor.Error,
                                value = targetHeight
                            };
                            AddMouseTooltip(terrainTargetPosition);

                            if (m_TerrainToolSystem.prefab.m_Type == TerraformingType.Slope)
                            {
                                float length = math.distance(targetPosition, applyPosition);
                                FloatTooltip terrainSlope = new()
                                {
                                    icon = "Media/Glyphs/Slope.svg",
                                    path = "etTerrainToolSlope",
                                    unit = "percentageSingleFraction",
                                    signed = true,
                                    value = 100f * (applyPosition.y - targetPosition.y) / Math.Max(1, length),
                                };
                                AddMouseTooltip(terrainSlope);
                            }
                        }
                    }
                }
            }
        }

        private void DetectWaterFeaturesMod()
        {
            _waterFeaturesType = m_ExtendedTooltipSystem?.loadedAssemblies.FirstOrDefault(a => a.GetName().Name == "Water_Features")?
                .GetTypes()
                .FirstOrDefault(t => t.FullName == "Water_Features.Tools.CustomWaterToolSystem");
        }

        private bool AnyOtherSupportedCustomToolSystem()
        {
            if (_waterFeaturesType == null)
                return false;

            return m_ToolSystem.activeTool.GetType() == _waterFeaturesType;
        }

        protected override void OnCreateForCompiler()
        {
            base.OnCreateForCompiler();
        }

        [Preserve]
        public ExtendedTempTooltipSystem()
        {
        }
    }
}
