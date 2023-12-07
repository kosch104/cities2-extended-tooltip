using Colossal.Entities;
using ExtendedTooltip.Systems;
using Game.Agents;
using Game.Citizens;
using Game.UI.InGame;
using Game.UI.Tooltip;
using System;
using Unity.Entities;
using Unity.Mathematics;

namespace ExtendedTooltip.TooltipBuilder
{
    class CitizenTooltipBuilder : TooltipBuilderBase
    {
        public CitizenTooltipBuilder(EntityManager entityManager, CustomTranslationSystem customTranslationSystem)
        : base(entityManager, customTranslationSystem) {
            UnityEngine.Debug.Log($"Created CitizenTooltipBuilder.");
        }

        public void Build(Entity entity, Citizen citizen, TooltipGroup tooltipGroup)
        {
            // State
            if (m_Settings.CitizenState)
            {
                CitizenStateKey stateKey = CitizenUIUtils.GetStateKey(m_EntityManager, entity);
                StringTooltip stateTooltip = new()
                {
                    icon = "Media/Game/Icons/AdvisorInfoView.svg",
                    value = $"{m_CustomTranslationSystem.GetLocalGameTranslation($"SelectedInfoPanel.CITIZEN_STATE[{stateKey}]", "")}",
                    color = TooltipColor.Info,
                };
                tooltipGroup.children.Add(stateTooltip);
            }

            /*if (m_EntityManager.TryGetComponent(entity, out TaxPayer taxPayer))
            {
                int wage = (taxPayer.m_UntaxedIncome - ((int)math.round(0.01f * taxPayer.m_AverageTaxRate * taxPayer.m_UntaxedIncome)));
                wage = wage < 0 ? 0 : wage;
                StringTooltip wageTooltip = new()
                {
                    icon = "Media/Game/Icons/Money.svg",
                    value = $"Wage: {wage}",
                };
                tooltipGroup.children.Add(wageTooltip);
            }*/

            // Happiness
            if (m_Settings.CitizenHappiness)
            {
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
            }

            // Education
            if (m_Settings.CitizenEducation)
            {
                CitizenEducationKey educationKey = CitizenUIUtils.GetEducation(citizen);
                string educationLabelString = m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.CITIZEN_EDUCATION_TITLE", "Education");
                string educationValueString = m_CustomTranslationSystem.GetLocalGameTranslation($"SelectedInfoPanel.CITIZEN_EDUCATION[{Enum.GetName(typeof(CitizenEducationKey), educationKey)}]", educationKey.ToString());
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
}
