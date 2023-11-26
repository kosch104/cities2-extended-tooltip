using ExtendedTooltip.Systems;
using Game.Citizens;
using Game.UI.InGame;
using Game.UI.Localization;
using Game.UI.Tooltip;
using System;
using Unity.Entities;

namespace ExtendedTooltip.TooltipBuilder
{
    public class CitizenTooltipBuilder
    {
        private EntityManager m_EntityManager;
        private readonly CustomTranslationSystem m_CustomTranslationSystem;

        public CitizenTooltipBuilder(EntityManager entityManager, CustomTranslationSystem customTranslationSystem)
        {
            m_EntityManager = entityManager;
            m_CustomTranslationSystem = customTranslationSystem;
            
            UnityEngine.Debug.Log($"Created CitizenTooltipBuilder.");
        }

        public void Build(Entity entity, Citizen citizen, TooltipGroup tooltipGroup)
        {
            // State
            CitizenStateKey stateKey = CitizenUIUtils.GetStateKey(m_EntityManager, entity);
            var stateStringBuilder = CachedLocalizedStringBuilder<CitizenStateKey>.Id((CitizenStateKey t) => $"SelectedInfoPanel.CITIZEN_STATE[{t:G}]");
            StringTooltip stateTooltip = new()
            {
                icon = "Media/Game/Icons/Information.svg",
                value = stateStringBuilder[stateKey],
                color = TooltipColor.Info,
            };
            tooltipGroup.children.Add(stateTooltip);

            // Happiness
            int happinessValue = citizen.Happiness;
            CitizenHappinessKey happinessKey = (CitizenHappinessKey)CitizenUtils.GetHappinessKey(happinessValue);
            string happinessLabelString = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.CITIZEN_HAPPINESS", "Happiness");
            string happinessValueString = m_CustomTranslationSystem.GetLocalGameTranslation($"SelectedInfoPanel.CITIZEN_HAPPINESS_TITLE[{Enum.GetName(typeof(CitizenHappinessKey), happinessKey)}]", happinessKey.ToString());
            StringTooltip happinessTooltip = new()
            {
                icon = "Media/Game/Icons/" + happinessKey.ToString() + ".svg",
                value = $"{happinessLabelString}: {happinessValueString}",
                color = happinessValue < 50 ? TooltipColor.Error : happinessValue < 75 ? TooltipColor.Warning : TooltipColor.Success
            };
            tooltipGroup.children.Add(happinessTooltip);

            // Education
            CitizenEducationKey educationKey = CitizenUIUtils.GetEducation(citizen);
            string educationLabelString = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.CITIZEN_EDUCATION", "Education");
            string educationValueString = m_CustomTranslationSystem.GetLocalGameTranslation($"SelectedInfoPanel.CITIZEN_EDUCATION_TITLE[{Enum.GetName(typeof(CitizenEducationKey), educationKey)}]", educationKey.ToString());
            StringTooltip educationTooltip = new()
            {
                icon = "Media/Game/Icons/Education.svg",
                value = $"{educationLabelString}: {educationValueString}",
                color = TooltipColor.Info,
            };
            tooltipGroup.children.Add(educationTooltip);
        }
    }
}
