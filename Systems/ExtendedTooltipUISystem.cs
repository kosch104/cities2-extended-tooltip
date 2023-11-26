using Colossal.Annotations;
using Colossal.UI.Binding;
using Game.UI;
using System;
using System.Collections.Generic;

namespace ExtendedTooltip.Systems
{

    class ExtendedTooltipUISystem : UISystemBase
    {
        private readonly string kGroup = "extendedTooltip";
        private ExtendedTooltipSystem m_ExtendedTooltipSystem;

        protected override void OnCreate()
        {
            base.OnCreate();
            m_ExtendedTooltipSystem = World.GetOrCreateSystemManaged<ExtendedTooltipSystem>();
            AddUpdateBinding(new GetterValueBinding<List<ExtendedTooltipItem>>(kGroup, "extendedTooltipOptions", new Func<List<ExtendedTooltipItem>>(() => [
                new ExtendedTooltipItem
                {
                    Id = 1,
                    Label = "Extended Citizen (On/Off)",
                    IsChecked = true,
                    Children =
                    [
                        new ExtendedTooltipItem { Id = 2, Label = "State", IsChecked = true },
                        new ExtendedTooltipItem { Id = 3, Label = "Happiness", IsChecked = true },
                        new ExtendedTooltipItem { Id = 4, Label = "Education", IsChecked = true },
                    ]
                }
            ]), new ListWriter<ExtendedTooltipItem>(null), null));

            UnityEngine.Debug.Log("ExtendedTooltipUISystem created.");
        }
    }

    public class ExtendedTooltipItem: IJsonWritable
    {
        public void Write(IJsonWriter writer)
        {
            writer.TypeBegin("extended.tooltip.item");
            writer.PropertyName("id");
            writer.Write(Id);
            writer.PropertyName("label");
            writer.Write(Label);
            writer.PropertyName("isChecked");
            writer.Write(IsChecked);
            writer.PropertyName("children");
            writer.Write(Children);
            writer.TypeEnd();
        }

        public int Id { get; set; }
        public string Label { get; set; }
        public bool IsChecked { get; set; }

        [CanBeNull]
        public List<ExtendedTooltipItem> Children { get; set; }
    }
}
