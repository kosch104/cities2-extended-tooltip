using Colossal.Entities;
using ExtendedTooltip.Settings;
using ExtendedTooltip.Systems;
using Game.Citizens;
using Game.Prefabs;
using Game.UI.InGame;
using Game.UI.Tooltip;
using System;
using Unity.Entities;

namespace ExtendedTooltip.TooltipBuilder
{
    class CitizenTooltipBuilder : TooltipBuilderBase
    {
        public CitizenTooltipBuilder(EntityManager entityManager, CustomTranslationSystem customTranslationSystem)
        : base(entityManager, customTranslationSystem) {
            UnityEngine.Debug.Log($"Created CitizenTooltipBuilder.");
        }

        public void Build(Entity entity, Citizen citizen, CitizenHappinessParameterData citizenHappinessParameters, TooltipGroup tooltipGroup, TooltipGroup secondaryTooltipGroup)
        {
            ModSettings modSettings = m_ExtendedTooltipSystem.m_LocalSettings.m_ModSettings;

            // State
            if (modSettings.ShowCitizenState)
            {
                CitizenStateKey stateKey = CitizenUIUtils.GetStateKey(m_EntityManager, entity);
                StringTooltip stateTooltip = new()
                {
                    icon = "Media/Game/Icons/AdvisorInfoView.svg",
                    value = $"{m_CustomTranslationSystem.GetLocalGameTranslation($"SelectedInfoPanel.CITIZEN_STATE[{stateKey}]", "Unknown")}",
                    color = TooltipColor.Info,
                };
                tooltipGroup.children.Add(stateTooltip);
            }

            // Needs revisting, not working
            if ((modSettings.ShowCitizenWealth || modSettings.ShowCitizenType) && m_EntityManager.TryGetComponent(entity, out HouseholdMember householdMember))
            {
                Entity household = householdMember.m_Household;

                if (modSettings.ShowCitizenType)
                {
                    CitizenKey citizenKey = CitizenKey.Citizen;
                    if (m_EntityManager.HasComponent<CommuterHousehold>(householdMember.m_Household))
                    {
                        citizenKey = CitizenKey.Commuter;
                    }
                    else if (m_EntityManager.HasComponent<TouristHousehold>(householdMember.m_Household))
                    {
                        citizenKey = CitizenKey.Tourist;
                    }

                    string citizenTypeValue = m_CustomTranslationSystem.GetLocalGameTranslation($"SelectedInfoPanel.CITIZEN_TYPE[{citizenKey}]", "Unknown");
                    StringTooltip citizenTypeTooltip = new()
                    {
                        icon = $"Media/Game/Icons/{citizenKey}.svg",
                        value = $"{citizenTypeValue}",
                        color = TooltipColor.Info,
                    };
                    (modSettings.UseExtendedLayout ? secondaryTooltipGroup : tooltipGroup).children.Add(citizenTypeTooltip);
                }

                if (modSettings.ShowCitizenWealth)
                {
                    HouseholdWealthKey wealthKey = CitizenUIUtils.GetHouseholdWealth(m_EntityManager, household, citizenHappinessParameters);
                    TooltipColor tooltipColor = wealthKey switch
                    {
                        HouseholdWealthKey.Wretched => TooltipColor.Error,
                        HouseholdWealthKey.Poor => TooltipColor.Warning,
                        HouseholdWealthKey.Modest => TooltipColor.Info,
                        _ => TooltipColor.Success,
                    };
                    string wealthLabel = m_CustomTranslationSystem.GetLocalGameTranslation("StatisticsPanel.STAT_TITLE[Wealth]", "Wealth");
                    string wealthValue = m_CustomTranslationSystem.GetLocalGameTranslation($"SelectedInfoPanel.CITIZEN_WEALTH[{wealthKey}]");
                    StringTooltip wealthTooltip = new()
                    {
                        icon = "Media/Game/Icons/CitizenWealth.svg",
                        value = $"{wealthLabel}: {wealthValue}",
                        color = tooltipColor,
                    };
                    (modSettings.UseExtendedLayout ? secondaryTooltipGroup : tooltipGroup).children.Add(wealthTooltip);
                }
                
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
            if (modSettings.ShowCitizenHappiness)
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
            if (modSettings.ShowCitizenEducation)
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
