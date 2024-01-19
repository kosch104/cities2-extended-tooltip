using ExtendedTooltip.Models;
using ExtendedTooltip.Systems;
using Gooee.Plugins;
using Gooee.Plugins.Attributes;

namespace ExtendedTooltip.Controllers
{
    public class ExtendedTooltipController : Controller<ExtendedTooltipModel>
    {
        ExtendedTooltipUISystem m_ExtendedTooltipUISystem;
        public override ExtendedTooltipModel Configure()
        {
            m_ExtendedTooltipUISystem = World.GetOrCreateSystemManaged<ExtendedTooltipUISystem>();
            ExtendedTooltipModel model = m_ExtendedTooltipUISystem.m_ModSettings;
            model.Translations = m_ExtendedTooltipUISystem.m_SettingLocalization;
            model.Version = MyPluginInfo.PLUGIN_VERSION;

            return model;
        }

        [OnTrigger]
        public void DoSave()
        {
            var settings = m_ExtendedTooltipUISystem.m_ExtendedTooltipSystem.m_LocalSettings;
            settings.m_ModSettings = Model;
            if (short.TryParse(Model.DisplayModeDelay, out short delay))
            {
                settings.m_ModSettings.DisplayModeDelay = delay;
            } else
            {
                UnityEngine.Debug.Log("Could not parse display mode delay to short. Skip.");
            }
            
            settings.Save();
        }
    }
}
