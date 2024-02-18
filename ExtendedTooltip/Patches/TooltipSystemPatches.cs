using Game.UI.Tooltip;
using HarmonyLib;

namespace ExtendedTooltip.Patches
{

    // Skip system
    [HarmonyPatch(typeof(RaycastNameTooltipSystem), "OnCreate")]
    public static class RaycastNameTooltipSystem_OnCreate
    {
        public static bool Prefix()
        {
            return false;
        }
    }

    // Skip system
    [HarmonyPatch(typeof(RaycastNameTooltipSystem), "OnUpdate")]
    public static class RaycastNameTooltipSystem_OnUpdate
    {
        public static bool Prefix()
        {
            return false;
        }
    }

    [HarmonyPatch(typeof(BulldozeToolTooltipSystem), "OnCreate")]
    public static class BulldozeToolTooltipSystem_OnCreate
    {
        public static bool Prefix()
        {
            return false;
        }
    }

    // Skip system
    [HarmonyPatch(typeof(BulldozeToolTooltipSystem), "OnUpdate")]
    public static class BulldozeToolTooltipSystem_OnUpdate
    {
        public static bool Prefix()
        {
            return false;
        }
    }
}
