using ExtendedTooltip.Systems;
using Game;
using Game.Common;
using HarmonyLib;

namespace ExtendedTooltip.Patches
{
    [HarmonyPatch(typeof(SystemOrder), nameof(SystemOrder.Initialize))]
    class SystemOrder_Patches
    {
        static void Postfix(UpdateSystem __instance)
        {
            __instance?.UpdateAt<CustomTranslationSystem>(SystemUpdatePhase.UIUpdate);
        }
    }
}
