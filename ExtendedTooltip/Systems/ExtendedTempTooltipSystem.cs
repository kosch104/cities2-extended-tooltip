using ExtendedTooltip.Models;
using ExtendedTooltip.Settings;
using Game.Tools;
using Game.UI.Tooltip;
using UnityEngine.Scripting;
namespace ExtendedTooltip.Systems
{
    public class TempElevationTooltipSystem : TooltipSystemBase
    {
        private NetToolSystem m_NetToolSystem;
        private ToolSystem m_ToolSystem;
        private CustomTranslationSystem m_CustomTranslationSystem;
        private ExtendedTooltipSystem m_ExtendedTooltipSystem;

        private LocalSettings m_Settings;
        private StringTooltip m_NetToolMode;
        private StringTooltip m_AnarchyTooltip;

        [Preserve]
        protected override void OnCreate()
        {
            base.OnCreate();

            m_ToolSystem = World.GetOrCreateSystemManaged<ToolSystem>();
            m_NetToolSystem = World.GetOrCreateSystemManaged<NetToolSystem>();
            m_CustomTranslationSystem = World.GetOrCreateSystemManaged<CustomTranslationSystem>();
            m_ExtendedTooltipSystem = World.GetOrCreateSystemManaged<ExtendedTooltipSystem>();

            m_Settings = m_ExtendedTooltipSystem.m_LocalSettings;

            m_NetToolMode = new StringTooltip
            {
                path = "netTool",
            };

            m_AnarchyTooltip = new StringTooltip
            {
                value = m_CustomTranslationSystem.GetTranslation("anarchyMode", "Anarchy"),
                path = "anarchy",
                icon = "Media/Misc/Warning.svg",
                color = TooltipColor.Warning
            };
        }

        [Preserve]
        protected override void OnUpdate()
        {
            ModSettings modSettings = m_Settings.ModSettings;
            if (m_ToolSystem != null && modSettings.ShowNetToolSystem)
            {
                // Add anarchy tooltip if the active tool is ObjectToolSystem or NetToolSystem and ignoreErrors is true
                /*if (model.ShowAnarchyMode && m_ToolSystem.ignoreErrors == true
                    && (m_ToolSystem.activeTool is ObjectToolSystem || m_ToolSystem.activeTool is NetToolSystem || m_ToolSystem.activeTool is TerrainToolSystem)
                )
                {
                    AddMouseTooltip(m_AnarchyTooltip);
                }*/

                if (modSettings.ShowNetToolMode && m_ToolSystem.activeTool is NetToolSystem)
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
            }
        }

        protected override void OnCreateForCompiler()
        {
            base.OnCreateForCompiler();
        }

        [Preserve]
        public TempElevationTooltipSystem()
        {
        }
    }
}
