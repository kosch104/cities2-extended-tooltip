using ExtendedTooltip.Settings;
using Game.Common;
using Game.Prefabs;
using Game.Simulation;
using Game.Tools;
using Game.UI.Tooltip;
using Gooee.Plugins;
using HarmonyLib;
using System;
using System.Linq;
using System.Reflection;
using Unity.Entities;
using Unity.Mathematics;
using UnityEngine.Scripting;

namespace ExtendedTooltip.Systems
{
    public class ExtendedTempTooltipSystem : TooltipSystemBase
    {
        private NetToolSystem m_NetToolSystem;
        private ToolSystem m_ToolSystem;
        private CustomTranslationSystem m_CustomTranslationSystem;
        private ExtendedTooltipSystem m_ExtendedTooltipSystem;
        private ToolRaycastSystem m_ToolRaycastSystem;
        private TerrainSystem m_TerrainSystem;
        private TerrainToolSystem m_TerrainToolSystem;

        private LocalSettings m_Settings;
        private StringTooltip m_NetToolMode;

        private Type _waterFeaturesType;
        private Assembly[] loadedAssemblies;

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

            loadedAssemblies = AppDomain.CurrentDomain.GetAssemblies();
            m_Settings = m_ExtendedTooltipSystem.m_LocalSettings;
            DetectWaterFeaturesMod();

            m_NetToolMode = new StringTooltip
            {
                path = "netTool",
            };
        }

        [Preserve]
        protected override void OnUpdate()
        {
            ModSettings modSettings = m_Settings.ModSettings;
            if (m_ToolSystem != null && m_ToolSystem.activeTool is not DefaultToolSystem)
            {
                if (m_ToolSystem.activeTool is NetToolSystem && modSettings.ShowNetToolSystem && modSettings.ShowNetToolMode)
                {
                    m_NetToolMode.icon = $"Media/Tools/Net Tool/{m_NetToolSystem.mode}.svg";
                    m_NetToolMode.value = m_CustomTranslationSystem.GetLocalGameTranslation($"ToolOptions.TOOLTIP_TITLE[{m_NetToolSystem.mode}]");

                    // Add elevation to tooltip if it's not 0.0f
                    if (modSettings.ShowNetToolElevation && m_NetToolSystem.elevation != 0.0f)
                    {
                        // Add + sign for positive elevation (- is added by default)
                        string sign = (m_NetToolSystem.elevation > 0.0f) ? "+" : "";
                        m_NetToolMode.value = m_CustomTranslationSystem.GetLocalGameTranslation($"ToolOptions.TOOLTIP_TITLE[{m_NetToolSystem.mode}]") + $" ({sign}{m_NetToolSystem.elevation} m)";
                    }

                    AddMouseTooltip(m_NetToolMode);
                }

                if ((modSettings.ShowTerrainToolHeight && m_ToolSystem.activeTool is TerrainToolSystem) || (modSettings.ShowWaterToolHeight && (m_ToolSystem.activeTool is WaterToolSystem || AnyOtherSupportedCustomToolSystem())))
                {
                    TerrainHeightData heightData = m_TerrainSystem.GetHeightData();

                    if (m_ToolRaycastSystem.GetRaycastResult(out RaycastResult raycastResult))
                    {
                        int applyHeight = (int) TerrainUtils.SampleHeight(ref heightData, raycastResult.m_Hit.m_HitPosition);
                        StringTooltip terrainToolMode = new()
                        {
                            icon = "Media/Glyphs/Slope.svg",
                            path = "terrainToolApplyHeight",
                            value = m_CustomTranslationSystem.GetLocalGameTranslation("Common.VALUE_METER", "-", "SIGN", "", "VALUE", applyHeight.ToString()),
                        };
                        AddMouseTooltip(terrainToolMode);

                        // Add level height tooltip if the tool is set to level
                        if (m_ToolSystem.activeTool is TerrainToolSystem && m_TerrainToolSystem.prefab.m_Type == TerraformingType.Level)
                        {
                            float3 targetPosition = Traverse.Create(m_TerrainToolSystem).Field<float3>("m_TargetPosition").Value;
                            int targetHeight = (int)TerrainUtils.SampleHeight(ref heightData, targetPosition);
                            StringTooltip terrainTargetPosition = new()
                            {
                                icon = "Media/Tools/Terrain Tool/Level.svg",
                                path = "terrainToolTargetHeight",
                                color = targetHeight > applyHeight ? TooltipColor.Success : targetHeight == applyHeight ? TooltipColor.Info : TooltipColor.Error,
                                value = m_CustomTranslationSystem.GetLocalGameTranslation("Common.VALUE_METER", "-", "SIGN", "", "VALUE", targetHeight.ToString()),
                            };
                            AddMouseTooltip(terrainTargetPosition);
                        }
                    }
                }
            }
        }

        private void DetectWaterFeaturesMod()
        {
            _waterFeaturesType = loadedAssemblies.FirstOrDefault(a => a.GetName().Name == "Water_Features")?
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
