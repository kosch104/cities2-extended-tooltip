using Game;
using Game.SceneFlow;
using System;
using System.IO;
using System.Text.Json;

namespace ExtendedTooltip.Systems
{
    public class CustomTranslationSystem: GameSystemBase
    {
        private string LanguageCode { get; set; }
        private JsonDocument Translations { get; set; }
        public static string FrameworkDescription { get; }

        protected override void OnCreate()
        {
            base.OnCreate();
            LanguageCode = GameManager.instance.localizationManager.activeLocaleId;
            UnityEngine.Debug.Log("CustomTranslationSystem created.");
            LoadCustomTranslations();
        }

        protected override void OnUpdate()
        {
            LanguageCode = GameManager.instance.localizationManager.activeLocaleId;
            UnityEngine.Debug.Log("CustomTranslationSystem updated.");
            LoadCustomTranslations();
        }

        private void LoadCustomTranslations()
        {
            string assemblyPath = System.Reflection.Assembly.GetExecutingAssembly().Location;
            string directory = Path.GetDirectoryName(assemblyPath);
            string filePath = Path.Combine(directory, $"Translations{Path.DirectorySeparatorChar}{LanguageCode}.json");

            // Load JSON file based on language code
            try
            {
                if (!File.Exists(filePath))
                {
                    UnityEngine.Debug.Log($"No custom translations found for {LanguageCode} at {filePath}.");
                    return;
                }

                // Now you have the JSON content in the 'jsonContent' variable
                string jsonContent = File.ReadAllText(filePath);
                Translations = JsonDocument.Parse(jsonContent);
                UnityEngine.Debug.Log($"Successfully loaded custom translations for {LanguageCode}.");
            } catch (Exception e)
            {
                UnityEngine.Debug.Log($"Failed to load custom translations for {LanguageCode} from ${filePath}.");
                UnityEngine.Debug.Log(e.Message);
            }
        }

        public string GetTranslation(string key, string fallback = "Translation missing.", params string[] vars)
        {
            if (Translations == null || !Translations.RootElement.TryGetProperty(key, out var rawTranslationString))
            {
                return fallback;
            }

            return HandleTranslationString(rawTranslationString.GetString(), fallback, vars);
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
                    UnityEngine.Debug.Log("Invalid amount of arguments. It must be a even number.");
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