using ExtendedTooltip.Models;
using ExtendedTooltip.Systems;
using Gooee.Plugins;
using Gooee.Plugins.Attributes;
using System.Threading.Tasks;

namespace ExtendedTooltip.Controllers
{
    public class ExtendedTooltipController : Controller<ExtendedTooltipModel>
    {
        ExtendedTooltipUISystem m_ExtendedTooltipUISystem;
        public override ExtendedTooltipModel Configure()
        {
            m_ExtendedTooltipUISystem = World.GetOrCreateSystemManaged<ExtendedTooltipUISystem>();
            ExtendedTooltipModel model = m_ExtendedTooltipUISystem.m_Model;

            return model;
        }

        [OnTrigger]
        public async Task DoSave()
        {
            var settings = m_ExtendedTooltipUISystem.m_ExtendedTooltipSystem.m_LocalSettings;
            await settings.Save();
        }
    }
}
