using Colossal.IO;
using Colossal.Json;
using Game;
using Game.SceneFlow;
using Newtonsoft.Json;
using System;
using System.IO;
using System.IO.Compression;
using System.Text;
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
            string langPackZip = Path.Combine(directory, "language_pack.zip");

            // Load JSON file based on language code
            try
            {
                if (!File.Exists(langPackZip))
                {
                    UnityEngine.Debug.Log($"Language pack not found at {langPackZip}.");
                    return;
                }

                UnityEngine.Debug.Log($"Language pack found at {langPackZip}.");

                // Now you have the JSON content in the 'jsonContent' variable
                using ZipArchive zipArchive = ZipFile.OpenRead(langPackZip);
                foreach (ZipArchiveEntry entry in zipArchive.Entries)
                {
                    if (entry.FullName.StartsWith(LanguageCode) && entry.FullName.EndsWith(".json"))
                    {
                        StreamReader languageStream = new(entry.Open(), Encoding.UTF8);
                        string languageContent = languageStream.ReadToEnd();

                        Translations = JsonDocument.Parse(languageContent);
                        UnityEngine.Debug.Log($"Successfully loaded custom translations for {LanguageCode}.");
                        languageStream.Close();

                        return;
                    }
                }
                zipArchive.Dispose();

            } catch (Exception e)
            {
                UnityEngine.Debug.Log($"Failed to load custom translations.");
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