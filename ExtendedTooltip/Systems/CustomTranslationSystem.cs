using Game;
using Game.SceneFlow;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Text;

namespace ExtendedTooltip.Systems
{
    public partial class CustomTranslationSystem: GameSystemBase
    {
        public string Prefix { get; set; } = Mod.Name.Trim().ToLower();
        private string LanguageCode { get; set; }
        public string CurrentLanguageCode => LanguageCode;
        private Dictionary<string, string> Translations { get; set; }
        public static string FrameworkDescription { get; }

        protected override void OnCreate()
        {
            base.OnCreate();
            LanguageCode = GameManager.instance.localizationManager.activeLocaleId;
            Mod.DebugLog("CustomTranslationSystem created.");
            LoadCustomTranslations();
        }

        protected override void OnUpdate()
        {
        }

        public void ReloadTranslations(string locale)
        {
            LanguageCode = locale;
            Mod.DebugLog("Reloading translations.");
            LoadCustomTranslations();
        }

        private void LoadCustomTranslations()
        {
            string langPackZip = Path.Combine(Mod.AssemblyPath, "language_pack.data");

            // Load JSON file based on language code
            try
            {
                if (!File.Exists(langPackZip))
                {
                    Mod.DebugLog($"Language pack not found at {langPackZip}.");
                    return;
                }

                Mod.DebugLog($"Language pack found at {langPackZip}.");

                using ZipArchive zipArchive = ZipFile.OpenRead(langPackZip);
                foreach (ZipArchiveEntry entry in zipArchive.Entries)
                {
                    if (entry.FullName.StartsWith(LanguageCode) && entry.FullName.EndsWith(".json"))
                    {
                        using StreamReader languageStream = new(entry.Open(), Encoding.UTF8);
                        string languageContent = languageStream.ReadToEnd();

                        Translations = JsonConvert.DeserializeObject<Dictionary<string, string>>(languageContent);
                        Mod.DebugLog($"Successfully loaded custom translations for {LanguageCode}.");

                        return;
                    }
                }

            } catch (Exception e)
            {
                Mod.DebugLog($"Failed to load custom translations.");
                Mod.DebugLog(e.Message);
            }
        }

        public string GetTranslation(string key, string fallback = "Translation missing.", params string[] vars)
        {
            var dictionaryKey = $"{Prefix}.{key}";
            if (Translations == null || !Translations.ContainsKey(dictionaryKey))
            {
                return fallback;
            }

            return HandleTranslationString(Translations[dictionaryKey], fallback, vars);
        }

        public string GetLocalGameTranslation(string id, string fallback = "Translation failed.", params string[] vars)
        {
            if (GameManager.instance == null || !GameManager.instance.localizationManager.activeDictionary.TryGetValue(id, out string translatedText))
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
                    Mod.DebugLog("Invalid amount of arguments. It must be a even number.");
                    return fallback;
                }

                for (int i = 0; i < vars.Length; i += 2)
                {
                    string placeholder = vars[i];
                    string value = vars[i + 1];

                    translation = translation.Replace("{" + placeholder + "}", value);
                }

                return translation;
            }

            return translation;
        }
    }
}