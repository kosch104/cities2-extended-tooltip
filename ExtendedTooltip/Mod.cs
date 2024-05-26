using Colossal.IO.AssetDatabase;
using Colossal.Logging;

using ExtendedTooltip.Systems;

using Game;
using Game.Modding;
using Game.SceneFlow;
using Game.UI.Tooltip;

using HarmonyLib;

namespace ExtendedTooltip
{
	public class Mod : IMod
	{
		public const string Id = nameof(ExtendedTooltip);
		private const string HarmonyId = "com.Konsi." + Id;
		private Harmony harmony;

		public static ILog Log { get; } = LogManager.GetLogger(nameof(ExtendedTooltip)).SetShowsErrorsInUI(false);
		public static ModSettings Settings { get; private set; }

		public void OnLoad(UpdateSystem updateSystem)
		{
			Log.Info(nameof(OnLoad));

			Settings = new ModSettings(this);
			Settings.RegisterInOptionsUI();

			foreach (var item in new LocaleHelper("ExtendedTooltip.Locale.json").GetAvailableLanguages())
			{
				GameManager.instance.localizationManager.AddSource(item.LocaleId, item);
			}

			AssetDatabase.global.LoadSettings(nameof(ExtendedTooltip), Settings, new ModSettings(this));

			updateSystem.UpdateAt<CustomTranslationSystem>(SystemUpdatePhase.UIUpdate);
			updateSystem.UpdateAt<ExtendedTooltipUISystem>(SystemUpdatePhase.UIUpdate);
			updateSystem.UpdateAt<ExtendedTempTooltipSystem>(SystemUpdatePhase.UITooltip);
			updateSystem.UpdateAt<ExtendedTooltipSystem>(SystemUpdatePhase.UITooltip);
			updateSystem.UpdateAt<ExtendedBulldozerTooltipSystem>(SystemUpdatePhase.UITooltip);

			harmony = new Harmony(HarmonyId);
			harmony.PatchAll(typeof(Mod).Assembly);
		}

		public void OnDispose()
		{
			Log.Info(nameof(OnDispose));

			harmony.UnpatchAll(HarmonyId);

			if (Settings != null)
			{
				Settings.UnregisterInOptionsUI();
				Settings = null;
			}
		}
	}
}
