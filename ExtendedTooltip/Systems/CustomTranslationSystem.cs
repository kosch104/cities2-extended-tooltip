using Game;
using Game.SceneFlow;

using System.Collections.Generic;
using System.IO;
using Game.UI.Localization;
using Newtonsoft.Json;

namespace ExtendedTooltip.Systems
{
	public partial class CustomTranslationSystem : GameSystemBase
	{
		public string Prefix { get; set; } = "extendedtooltip";
		private string LanguageCode { get; set; }
		public string CurrentLanguageCode => LanguageCode;
		private Dictionary<string, string> Translations { get; set; }
		public static string FrameworkDescription { get; }

		protected override void OnCreate()
		{
			base.OnCreate();
			LanguageCode = GameManager.instance.localizationManager.activeLocaleId;
			Mod.Log.Info("CustomTranslationSystem created.");
			LoadCustomTranslations();
		}

		protected override void OnUpdate()
		{
		}

		public void ReloadTranslations(string locale)
		{
			LanguageCode = locale;
			Mod.Log.Info("Reloading translations.");
			LoadCustomTranslations();
		}

		private void LoadCustomTranslations()
		{

		}

		public string GetTranslation(string key, string fallback = "Translation missing.", params string[] vars)
		{
			var dictionaryKey = $"{Prefix}.{key}";
			if (Translations == null || !Translations.ContainsKey(dictionaryKey))
			{
				return GetLocalGameTranslation(dictionaryKey, fallback, vars);
			}

			return HandleTranslationString(Translations[dictionaryKey], fallback, vars);
		}

		public string GetLocalGameTranslation(string id, string fallback = "Translation failed.", params string[] vars)
		{
			if (GameManager.instance == null || !GameManager.instance.localizationManager.activeDictionary.TryGetValue(id, out var translatedText))
			{
				return fallback;
			}

			return HandleTranslationString(translatedText, fallback, vars);
		}

		private string HandleTranslationString(string translation, string fallback, params string[] vars)
		{
			if (vars != null && vars.Length > 0)
			{
				if (vars.Length % 2 != 0)
				{
					Mod.Log.Info("Invalid amount of arguments. It must be a even number.");
					return fallback;
				}

				for (var i = 0; i < vars.Length; i += 2)
				{
					var placeholder = vars[i];
					var value = vars[i + 1];

					translation = translation.Replace("{" + placeholder + "}", value);
				}

				return translation;
			}

			return translation;
		}
	}
}