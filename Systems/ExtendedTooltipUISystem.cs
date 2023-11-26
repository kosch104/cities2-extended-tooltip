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
        private List<ExtendedTooltipItem> m_ExtendedTooltipItemList = [];

        protected override void OnCreate()
        {
            base.OnCreate();
            m_ExtendedTooltipSystem = World.GetOrCreateSystemManaged<ExtendedTooltipSystem>();
            CreateTooltipSettings();

            AddUpdateBinding(new GetterValueBinding<List<ExtendedTooltipItem>>(kGroup, "extendedTooltipOptions", new Func<List<ExtendedTooltipItem>>(() => m_ExtendedTooltipItemList), new ListWriter<ExtendedTooltipItem>(null), null));
            AddBinding(new TriggerBinding<int>(kGroup, "onToggle", OnToggle));

            UnityEngine.Debug.Log("ExtendedTooltipUISystem created.");
        }

        protected override void OnUpdate()
        {
            base.OnUpdate();
        }

        protected override void OnDestroy()
        {
            base.OnDestroy();
            UnityEngine.Debug.Log("ExtendedTooltipUISystem destroyed.");
        }

        private void CreateTooltipSettings()
        {
            m_ExtendedTooltipItemList = [
                new ExtendedTooltipItem { Id = (int)ExtendedTooltipSetting.Citizens, Label = "Extended Citizen (On/Off)", IsChecked = true, ParentId = -1 },
                new ExtendedTooltipItem { Id = (int)ExtendedTooltipSetting.CitizensState, Label = "State", IsChecked = true, ParentId = 0 },
                new ExtendedTooltipItem { Id = (int)ExtendedTooltipSetting.CitizensHappiness, Label = "Happiness", IsChecked = true, ParentId = 0 },
                new ExtendedTooltipItem { Id = (int)ExtendedTooltipSetting.CitizensEducation, Label = "Education", IsChecked = true, ParentId = 0 },
            ];
        }

        private void OnToggle(int setting)
        {
            bool value;

            
            switch ((ExtendedTooltipSetting) setting)
            {
                case ExtendedTooltipSetting.Citizens:
                    value = !m_ExtendedTooltipSystem.ShowCitizenTooltip;
                    UnityEngine.Debug.Log("Pushed " + ExtendedTooltipSetting.Citizens);
                    m_ExtendedTooltipSystem.ShowCitizenTooltip = value;
                    break;
                case ExtendedTooltipSetting.CitizensState:
                    value = !m_ExtendedTooltipSystem.ShowCitizenStateTooltip;
                    UnityEngine.Debug.Log("Pushed " + ExtendedTooltipSetting.Citizens);
                    m_ExtendedTooltipSystem.ShowCitizenStateTooltip = value;
                    break;
                case ExtendedTooltipSetting.CitizensHappiness:
                    value = !m_ExtendedTooltipSystem.ShowCitizenHappinessTooltip;
                    UnityEngine.Debug.Log("Pushed " + ExtendedTooltipSetting.Citizens);
                    m_ExtendedTooltipSystem.ShowCitizenHappinessTooltip = value;
                    break;
                case ExtendedTooltipSetting.CitizensEducation:
                    value = !m_ExtendedTooltipSystem.ShowCitizenEducationTooltip;
                    UnityEngine.Debug.Log("Pushed " + ExtendedTooltipSetting.Citizens);
                    m_ExtendedTooltipSystem.ShowCitizenEducationTooltip = value;
                    break;
                default:
                    value = false;
                    break;
            }

            if (m_ExtendedTooltipItemList.Find(item => item.Id == setting) != null)
            {
                UnityEngine.Debug.Log("found: " + (ExtendedTooltipSetting)setting);
            }

            return;
        }
    }

    public class ExtendedTooltipItem: IJsonWritable
    {
        public void Write(IJsonWriter writer)
        {
            writer.TypeBegin(GetType().FullName);
            writer.PropertyName("id");
            writer.Write(Id);
            writer.PropertyName("label");
            writer.Write(Label);
            writer.PropertyName("isChecked");
            writer.Write(IsChecked);
            writer.PropertyName("parentId");
            writer.Write(ParentId);
            writer.TypeEnd();
        }

        public int Id { get; set; }
        public string Label { get; set; }
        public bool IsChecked { get; set; }
        public int ParentId { get; set; }
    }

    public enum ExtendedTooltipSetting
    {
        None = -1,
        Citizens,
        CitizensState,
        CitizensHappiness,
        CitizensEducation,
    }
}
