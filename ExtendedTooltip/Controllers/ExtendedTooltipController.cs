using ExtendedTooltip.Models;
using ExtendedTooltip.Settings;
using ExtendedTooltip.Systems;
using Gooee.Plugins;
using Gooee.Plugins.Attributes;
using System;

namespace ExtendedTooltip.Controllers
{
    public partial class ExtendedTooltipController : Controller<ExtendedTooltipModel>
    {
        ExtendedTooltipUISystem m_ExtendedTooltipUISystem;
        LocalSettings m_Settings;

        public ExtendedTooltipModel m_Model
        {
            get
            {
                return Model;
            }
        }

        public override ExtendedTooltipModel Configure()
        {
            m_ExtendedTooltipUISystem = World.GetOrCreateSystemManaged<ExtendedTooltipUISystem>();

            // Get saved local settings

            m_Settings = new();
            try
            {
                m_Settings.Init();

            } catch (Exception ex)
            {
                Mod.DebugLog($"Error loading settings: {ex.Message}");
                Mod.DebugLog("Disable ExtendedTooltipSystem.");

                return null;
            }

            // Create Model
            ExtendedTooltipModel model = m_Settings.ModSettings;

            model.Translations = m_ExtendedTooltipUISystem.m_SettingLocalization;
            model.Version = Mod.Version;

            Mod.DebugLog("Controller successfully created.");

            return model;
        }

        [OnTrigger]
        public void DoSave()
        {
            m_Settings.ModSettings = Model;
            if (short.TryParse(Model.DisplayModeDelay, out short delay))
            {
                m_Settings.ModSettings.DisplayModeDelay = delay;
            } else
            {
                Mod.DebugLog("Could not parse display mode delay to short. Skip.");
            }

            m_Settings.Save();
        }
    }
}
