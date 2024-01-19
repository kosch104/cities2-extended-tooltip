using Newtonsoft.Json;
using System.IO;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ExtendedTooltip.Settings
{
    public class LocalSettings
    {
        public ModSettings m_ModSettings { get; set; }

        private readonly JsonSerializerSettings m_SerializerSettings = new()
        {
            NullValueHandling = NullValueHandling.Ignore,
            Formatting = Formatting.Indented
        };

        public void Init() => Load();
        public void Reload() => Load();

        /// <summary>
        /// Save settings to a local JSON file
        /// </summary>
        /// <param name="settings"></param>
        public void Save()
        {
            string assemblyDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            string filename = "UserSettings.json";
            string fullFilePath = Path.Combine(assemblyDirectory, filename);

            try
            {
                string updatedSettingsJson = JsonConvert.SerializeObject(m_ModSettings, m_SerializerSettings);
                File.WriteAllText(fullFilePath, updatedSettingsJson, Encoding.UTF8);
            }
            catch (System.Exception e)
            {
                UnityEngine.Debug.Log($"Error saving settings: {e.Message}");
            }
        }

        /// <summary>
        /// Load settings from a local JSON file
        /// </summary>
        private void Load()
        {
            string assemblyDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            string filename = "UserSettings.json";
            string fullFilePath = Path.Combine(assemblyDirectory, filename);

            if (!File.Exists(fullFilePath))
            {
                UnityEngine.Debug.Log("No user settings found. Use default settings.");
                fullFilePath = Path.Combine(assemblyDirectory, "DefaultSettings.json");
                if (!File.Exists(fullFilePath))
                {
                    UnityEngine.Debug.Log($"Error loading settings: {fullFilePath} does not exist.");
                    return;
                }
            }
            else
            {
                UnityEngine.Debug.Log("User settings successfully loaded.");
            }

            try
            {
                // Access settings
                string settingsJson = File.ReadAllText(fullFilePath);
                ModSettings localSettingsItem = JsonConvert.DeserializeObject<ModSettings>(settingsJson);

                if (localSettingsItem != null)
                {
                    m_ModSettings = localSettingsItem;
                }
            }
            catch (System.Exception e)
            {
                UnityEngine.Debug.Log($"Error loading settings: {e.Message}");
            }
        }
    }
}
