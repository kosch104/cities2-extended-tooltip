using Game.Input;
using Game.Tools;
using Game.UI.Tooltip;
using HarmonyLib;
using Unity.Mathematics;
using UnityEngine;

namespace ExtendedTooltip.Patches
{
    [HarmonyPatch(typeof(BulldozeToolTooltipSystem), "OnUpdate")]
    class BulldozingToolTooltipSystem_OnUpdatePatch
    {
        static bool Prefix(BulldozeToolTooltipSystem __instance)
        {
            ToolSystem m_ToolSystem = Traverse.Create(__instance).Field("m_ToolSystem").GetValue<ToolSystem>();
            BulldozeToolSystem m_BulldozeTool = __instance.World.GetOrCreateSystemManaged<BulldozeToolSystem>();

            if (m_ToolSystem.activeTool == m_BulldozeTool && m_BulldozeTool.tooltip != 0)
            {
                StringTooltip stringTooltip1 = new()
                {
                    value = "Object abreißen",
                    path = "bulldozeTool",
                };

                TooltipGroup tooltipGroup = new()
                {
                    horizontalAlignment = TooltipGroup.Alignment.Center,
                    verticalAlignment = TooltipGroup.Alignment.Center,
                    path = "bulldozeTool",
                    children = {
                        stringTooltip1
                    }
                };

                Vector3 mousePosition = InputManager.instance.mousePosition;
                tooltipGroup.position = math.round(new float2(mousePosition.x, Screen.height - mousePosition.y) + new float2(0f, 16f));
                Traverse.Create(__instance).Method("AddGroup", tooltipGroup).GetValue();
            }

            return false;
        }

        private static float2 WorldToTooltipPos(Vector3 worldPos)
        {
            var xy = ((float3)Camera.main.WorldToScreenPoint(worldPos)).xy;
            xy.y = Screen.height - xy.y;
            return xy;
        }
    }
}
