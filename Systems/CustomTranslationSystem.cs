using Game;
using Game.SceneFlow;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace ExtendedTooltip.Systems
{
    public class CustomTranslationSystem: GameSystemBase
    {
        private string LanguageCode { get; set; }
        private JsonDocument Translations { get; set; }

        protected override void OnCreate()
        {
            base.OnCreate();
            LanguageCode = GameManager.instance.localizationManager.activeLocaleId;
            UnityEngine.Debug.Log("CustomTranslationSystem created.");
        }

        protected override void OnUpdate()
        {
            // LanguageCode = GameManager.instance.localizationManager.activeLocaleId;
            // LoadCustomTranslations();
        }

        private void LoadCustomTranslations()
        {
            // Load JSON file based on language code
            if (!File.Exists($"{LanguageCode}.json"))
            {
                return;
            }

            string jsonContent = File.ReadAllText($"{LanguageCode}.json");
            Translations = JsonDocument.Parse(jsonContent);
        }

        public string GetTranslation(string key)
        {
            // Retrieve translation from JSON document
            if (Translations.RootElement.TryGetProperty(key, out var translation))
            {
                return translation.GetString();
            }

            // If key not found, return the key itself
            return key;
        }

        public string GetLocalGameTranslation(string id, string fallback = "Translation failed.", params string[] vars)
        {
            if (GameManager.instance == null || !GameManager.instance.localizationManager.activeDictionary.TryGetValue(id, out string translatedText))
            {
                return fallback;
            }

            if (vars != null && vars.Length > 0)
            {
                if (vars.Length % 2 != 0)
                {
                    UnityEngine.Debug.Log("Ungültige Anzahl von Argumenten. Es muss eine gerade Anzahl sein.");
                    return fallback;
                }

                for (int i = 0; i < vars.Length; i += 2)
                {
                    string placeholder = vars[i];
                    string value = vars[i + 1];

                    translatedText = translatedText.Replace(placeholder, value);
                }

                return translatedText;
            }

            return translatedText;
        }
    }
}