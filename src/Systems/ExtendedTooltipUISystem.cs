using Colossal.UI.Binding;
using ExtendedTooltip.Settings;
using Game.UI;
using System;
using System.Collections.Generic;

namespace ExtendedTooltip.Systems
{
    class ExtendedTooltipUISystem : UISystemBase
    {
        private readonly string kGroup = "extendedTooltip";
        private ExtendedTooltipSystem m_ExtendedTooltipSystem;
        private LocalSettingsItem m_Settings;
        private Dictionary<int, Action> toggleActions;

        protected override void OnCreate()
        {
            base.OnCreate();
            m_ExtendedTooltipSystem = World.GetOrCreateSystemManaged<ExtendedTooltipSystem>();
            m_Settings = m_ExtendedTooltipSystem.m_LocalSettings.Settings;
            toggleActions = new()
            {
                { 0, () => m_Settings.Citizen = !m_Settings.Citizen },
                { 1, () => m_Settings.CitizenState = !m_Settings.CitizenState },
                { 2, () => m_Settings.CitizenHappiness = !m_Settings.CitizenHappiness },
                { 3, () => m_Settings.CitizenEducation = !m_Settings.CitizenEducation }
            };

            /// CITIZENS
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "citizen", () => m_Settings.Citizen, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "citizenState", () => m_Settings.CitizenState, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "citizenHappiness", () => m_Settings.CitizenHappiness, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "citizenEducation", () => m_Settings.CitizenEducation, null, null));

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

        private void OnToggle(int settingId)
        {
            if (toggleActions.TryGetValue(settingId, out Action toggleAction))
            {
                toggleAction.Invoke();
                m_ExtendedTooltipSystem.m_LocalSettings.Save();
            }
            else
            {
                UnityEngine.Debug.Log($"Setting with Id {settingId} not found.");
            }
        }
    }
}
