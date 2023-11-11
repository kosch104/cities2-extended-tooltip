using System.IO;
using System.Text.Json;

namespace ExtendedTooltip.Services
{
    public class TranslationService
    {
        private readonly string languageCode;
        private readonly JsonDocument translations;

        public TranslationService(string languageCode)
        {
            this.languageCode = languageCode;

            // Load JSON file based on language code
            string jsonContent = File.ReadAllText($"{languageCode}.json");
            translations = JsonDocument.Parse(jsonContent);
        }

        public string GetTranslation(string key)
        {
            // Retrieve translation from JSON document
            if (translations.RootElement.TryGetProperty(key, out var translation))
            {
                return translation.GetString();
            }

            // If key not found, return the key itself
            return key;
        }
    }
}