using ExtendedTooltip.Models;
using Game.UI;
using System.Collections.Generic;

namespace ExtendedTooltip.Systems
{
    class ExtendedTooltipUISystem : UISystemBase
    {
        private CustomTranslationSystem m_CustomTranslationSystem;
        public ExtendedTooltipSystem m_ExtendedTooltipSystem;
        public ExtendedTooltipModel m_Model;
        public Dictionary<string, string> m_SettingLocalization;

        protected override void OnCreate()
        {
            base.OnCreate();
            m_ExtendedTooltipSystem = World.GetOrCreateSystemManaged<ExtendedTooltipSystem>();
            m_CustomTranslationSystem = World.GetOrCreateSystemManaged<CustomTranslationSystem>();
            m_Model = m_ExtendedTooltipSystem.m_LocalSettings.SettingsModel;

            CreateLanguages();

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

        private void CreateLanguages() {
            m_SettingLocalization = new()
            {
                // GENERAL
                { "disableMod", m_CustomTranslationSystem.GetTranslation("setting.disableMod", "Disable Mod") },
                { "disableMod.description", m_CustomTranslationSystem.GetTranslation("setting.disableMod.description", "Disable the mod globally.") },
                { "displayMode", m_CustomTranslationSystem.GetTranslation("setting.displayMode", "Display mode") },
                { "displayMode.description", m_CustomTranslationSystem.GetTranslation("setting.displayMode.description", "Decide between different display modes for the tooltip.") },
                { "displayMode.instant", m_CustomTranslationSystem.GetTranslation("setting.displayMode.instant", "Instant (default)") },
                { "displayMode.delayed", m_CustomTranslationSystem.GetTranslation("setting.displayMode.delayed", "Delayed") },
                { "displayMode.onKey", m_CustomTranslationSystem.GetTranslation("setting.displayMode.onKey", "Hold key (ALT)") },
                { "extendedLayout", m_CustomTranslationSystem.GetTranslation("setting.extendedLayout", "Extended Layout") },
                { "extendedLayout.description", m_CustomTranslationSystem.GetTranslation("setting.extendedLayout.description", "Use a second layout group to show tooltips.") },

                // TOOL SYSTEMS
                { "toolSystem", m_CustomTranslationSystem.GetTranslation("setting.toolSystem", "Tool Systems") },
                { "toolSystem.description", m_CustomTranslationSystem.GetTranslation("setting.toolSystem.description", "Enable tooltips for different tool systems.") },

                // NET TOOL SYSTEM

                { "toolSystem.anarchyMode", m_CustomTranslationSystem.GetTranslation("setting.toolSystem.anarchyMode", "Anarchy") },
                { "toolSystem.anarchyMode.description", m_CustomTranslationSystem.GetTranslation("setting.toolSystem.anarchyMode.description", "Shows anarchy status.") },

                { "toolSystem.netTool", m_CustomTranslationSystem.GetTranslation("setting.toolSystem.netTool", "Net Tool") },
                { "toolSystem.netTool.description", m_CustomTranslationSystem.GetTranslation("setting.toolSystem.netTool.description", "Enable tooltips for the Net Tool.") },
                { "toolSystem.netTool.mode", m_CustomTranslationSystem.GetTranslation("setting.toolSystem.netTool.mode", "Net Tool Mode") },
                { "toolSystem.netTool.mode.description", m_CustomTranslationSystem.GetTranslation("setting.toolSystem.netTool.mode.description", "Shows which mode (straight, curve, ect.) is in use.") },
                { "toolSystem.netTool.elevation", m_CustomTranslationSystem.GetTranslation("setting.toolSystem.netTool.elevation", "Elevation") },
                { "toolSystem.netTool.elevation.description", m_CustomTranslationSystem.GetTranslation("setting.toolSystem.netTool.elevation.description", "Adds elevation to net tool mode tooltip.") },

                // ENTITY TOOLTIPS
                { "entities", m_CustomTranslationSystem.GetTranslation("entities", "Entities") },
                { "entities.description", m_CustomTranslationSystem.GetTranslation("entities.description", "Enables entity tooltips. (Citizen, Vehicles, Buildings, Spawnings, ect.)") },

                // CITIZEN
                { "citizen", m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.CITIZEN_TYPE[Citizen]", "Citizens") },
                { "citizenState", m_CustomTranslationSystem.GetTranslation("setting.citizen.state", "Citizen state") },
                { "citizenHappiness", m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.CITIZEN_HAPPINESS", "Citizen happiness") },
                { "citizenEducation", m_CustomTranslationSystem.GetLocalGameTranslation("Infoviews.INFOVIEW[Education]", "Educational Facilities") },
                { "citizenWealth", m_CustomTranslationSystem.GetLocalGameTranslation("StatisticsPanel.STAT_TITLE[Wealth]", "Citizen wealth") },
                { "citizenType", m_CustomTranslationSystem.GetLocalGameTranslation("Tutorials.TITLE[TaxationTutorialType]", "Citizen type") },

                // COMPANY
                { "company", m_CustomTranslationSystem.GetTranslation("setting.company", "Company") },
                { "companyOutput", m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.PRODUCTION", "Company Output") },

                // EFFICIENCY
                { "efficiency", m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.EFFICIENCY", "Efficiency")},

                // EMPLOYEE
                { "employee", m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.EMPLOYEES", "Employee")},

                // PARK
                { "park", m_CustomTranslationSystem.GetLocalGameTranslation("Services.NAME[Parks & Recreation]", "Parks")},
                { "parkMaintenance", m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.PARK_MAINTENANCE", "Maintenance")},
                
                // PARKING
                { "parkingFacility", m_CustomTranslationSystem.GetLocalGameTranslation("SubServices.NAME[RoadsParking]", "Parking Facilities")},
                { "parkingFees", m_CustomTranslationSystem.GetTranslation("setting.parking.fees", "Fees")},
                { "parkingCapacity", m_CustomTranslationSystem.GetTranslation("setting.parking.capacity", "Capacity")},
                
                // PUBLIC TRANSPORT
                { "publicTransport", m_CustomTranslationSystem.GetLocalGameTranslation("TransportInfoPanel.PUBLIC_TRANSPORT_TITLE", "Public Transport")},
                { "publicTransportWaitingPassengers", m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.WAITING_PASSENGERS", "Waiting Passengers")},
                { "publicTransportWaitingTime", m_CustomTranslationSystem.GetTranslation("setting.public_transportation.waiting_time", "Waiting Time")},

                // ROAD
                { "road", m_CustomTranslationSystem.GetLocalGameTranslation("Services.NAME[Roads]", "Roads")},
                { "roadLength", m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.ROAD_LENGTH", "Length")},
                { "roadUpkeep", m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.ROAD_UPKEEP", "Upkeep")},
                { "roadCondition", m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.ROAD_CONDITION", "Condition")},
                
                // SCHOOL
                { "school", m_CustomTranslationSystem.GetLocalGameTranslation("SubServices.NAME[Education]", "Educational Facilities")},
                { "schoolStudentCapacity", m_CustomTranslationSystem.GetTranslation("setting.school.student.capacity", "Students Capacity")},
                
                // SPAWNABLE
                { "spawnable", m_CustomTranslationSystem.GetLocalGameTranslation("Services.NAME[Zones]", "Spawnable")},
                { "spawnableZoneInfo", m_CustomTranslationSystem.GetTranslation("setting.spawnable.zone_info", "Zone Info")},
                { "spawnableLevel", m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.LEVEL", "Level")},
                { "spawnableLevelDetails", m_CustomTranslationSystem.GetTranslation("setting.spawnable.level_details", "Level Detail")},
                { "spawnableHousehold", m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.HOUSEHOLDS", "Households")},
                { "spawnableHouseholdDetails", m_CustomTranslationSystem.GetTranslation("setting.spawnable.household_details", "Household Details")},
                { "spawnableHouseholdWealth", m_CustomTranslationSystem.GetLocalGameTranslation("StatisticsPanel.STAT_TITLE[Wealth]", "Household Wealth")},
                { "spawnableRent", m_CustomTranslationSystem.GetTranslation("rent", "Rent")},
                { "spawnableBalance", m_CustomTranslationSystem.GetTranslation("balance", "Balance")},

                // VEHICLE
                { "vehicle", m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.VEHICLES[HouseholdVehicle]", "Vehicles")},
                { "vehicleState", m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.VEHICLE_STATE", "Status")},
                { "vehicleDriver", m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.DRIVER", "Driver")},
                { "vehicleGarbageTruck", m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.GARBAGE_VEHICLE_TITLE[GarbageTruck]", "Garbage Truck")},
                { "vehiclePostvan", m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.POST_VEHICLE_TITLE", "Postvan")},
                { "vehiclePassengerDetail", m_CustomTranslationSystem.GetLocalGameTranslation("SelectedInfoPanel.PASSENGERS_TITLE", "Passengers")},

            };
        }
    }
}
