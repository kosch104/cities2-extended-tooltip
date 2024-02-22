using ExtendedTooltip.Settings;
using Game.Common;
using Game.Simulation;
using Game.Tools;
using Game.UI.Tooltip;
using System;
using System.Linq;
using Unity.Entities;
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

        private LocalSettings m_Settings;
        private StringTooltip m_NetToolMode;

        private System.Reflection.Assembly[] loadedAssemblies;
        private bool waterFeaturesLoaded;

        [Preserve]
        protected override void OnCreate()
        {
            base.OnCreate();

            m_ToolSystem = World.GetOrCreateSystemManaged<ToolSystem>();
            m_NetToolSystem = World.GetOrCreateSystemManaged<NetToolSystem>();
            m_CustomTranslationSystem = World.GetOrCreateSystemManaged<CustomTranslationSystem>();
            m_ExtendedTooltipSystem = World.GetOrCreateSystemManaged<ExtendedTooltipSystem>();
            m_TerrainSystem = World.GetOrCreateSystemManaged<TerrainSystem>();
            m_ToolRaycastSystem = World.GetOrCreateSystemManaged<ToolRaycastSystem>();

            loadedAssemblies = AppDomain.CurrentDomain.GetAssemblies();
            waterFeaturesLoaded = IsAssemblyLoaded("Water_Features");
            m_Settings = m_ExtendedTooltipSystem.m_LocalSettings;

            m_NetToolMode = new StringTooltip
            {
                path = "netTool",
            };
        }

        [Preserve]
        protected override void OnUpdate()
        {
            ModSettings modSettings = m_Settings.ModSettings;
            if (m_ToolSystem != null)
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
                    if (m_ToolRaycastSystem.GetRaycastResult(out RaycastResult raycastResult))
                    {
                        TerrainHeightData heightData = m_TerrainSystem.GetHeightData();
                        int height = (int) TerrainUtils.SampleHeight(ref heightData, raycastResult.m_Hit.m_HitPosition);
                        StringTooltip terrainToolMode = new()
                        {
                            icon = "Media/Glyphs/Slope.svg",
                            path = "terrainTool",
                            value = m_CustomTranslationSystem.GetLocalGameTranslation("Common.VALUE_METER", "-", "SIGN", "", "VALUE", height.ToString()),
                        };
                        AddMouseTooltip(terrainToolMode);
                    }
                }
            }
        }

        private bool IsAssemblyLoaded(string assemblyName)
        {
            return loadedAssemblies.Any(assembly => assembly.FullName.StartsWith(assemblyName));
        }

        private bool AnyOtherSupportedCustomToolSystem()
        {
            // Support for WaterFeatures mod
            /*if (waterFeaturesLoaded && m_ToolSystem.activeTool is Water_Features.Tools.CustomWaterToolSystem)
            {
                return true;
            }*/

            return false;
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
