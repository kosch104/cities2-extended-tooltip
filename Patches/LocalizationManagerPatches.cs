using Colossal.Localization;
using ExtendedTooltip.Systems;
using Game;
using Game.SceneFlow;
using HarmonyLib;
using Unity.Entities;

namespace ExtendedTooltip.Patches
{
    [HarmonyPatch(typeof(LocalizationManager), "SetActiveLocale")]
    class LocalizationManager_Patches
    {
        static void Postfix(string localeId)
        {
            if (World.DefaultGameObjectInjectionWorld == null)
            {
                return;
            }

            CustomTranslationSystem customTranslationSystem = World.DefaultGameObjectInjectionWorld.GetOrCreateSystemManaged<CustomTranslationSystem>();
            if (customTranslationSystem.CurrentLanguageCode != localeId)
            {
                customTranslationSystem.ReloadTranslations(localeId);
            }   
        }
    }
}
