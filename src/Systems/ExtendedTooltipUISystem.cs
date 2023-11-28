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
        private Dictionary<int, Action> expandActions;

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
                { 3, () => m_Settings.CitizenEducation = !m_Settings.CitizenEducation },
                { 4, () => m_Settings.Company = !m_Settings.Company },
                { 5, () => m_Settings.CompanyOutput = !m_Settings.CompanyOutput },
                { 6, () => m_Settings.Efficiency = !m_Settings.Efficiency },
                { 7, () => m_Settings.Employee = !m_Settings.Employee },
                { 8, () => m_Settings.ParkingFacility = !m_Settings.ParkingFacility },
                { 9, () => m_Settings.ParkingFees = !m_Settings.ParkingFees },
                { 10, () => m_Settings.ParkingCapacity = !m_Settings.ParkingCapacity },
                { 11, () => m_Settings.Park = !m_Settings.Park },
                { 12, () => m_Settings.ParkMaintenance = !m_Settings.ParkMaintenance },
                { 13, () => m_Settings.PublicTransport = !m_Settings.PublicTransport },
                { 14, () => m_Settings.PublicTransportWaitingPassengers = !m_Settings.PublicTransportWaitingPassengers },
                { 15, () => m_Settings.PublicTransportWaitingTime = !m_Settings.PublicTransportWaitingTime },
                { 16, () => m_Settings.Road = !m_Settings.Road },
                { 17, () => m_Settings.RoadLength = !m_Settings.RoadLength },
                { 18, () => m_Settings.RoadUpkeep = !m_Settings.RoadUpkeep },
                { 19, () => m_Settings.RoadCondition = !m_Settings.RoadCondition },
                { 20, () => m_Settings.School = !m_Settings.School },
                { 21, () => m_Settings.SchoolStudentCapacity = !m_Settings.SchoolStudentCapacity },
                { 22, () => m_Settings.SchoolStudentCount = !m_Settings.SchoolStudentCount },
                { 23, () => m_Settings.Spawnable = !m_Settings.Spawnable },
                { 24, () => m_Settings.SpawnableLevel = !m_Settings.SpawnableLevel },
                { 25, () => m_Settings.SpawnableLevelDetails = !m_Settings.SpawnableLevelDetails },
                { 26, () => m_Settings.SpawnableHousehold = !m_Settings.SpawnableHousehold },
                { 27, () => m_Settings.SpawnableHouseholdDetails = !m_Settings.SpawnableHouseholdDetails },
                { 28, () => m_Settings.SpawnableRent = m_Settings.SpawnableRent },
                { 29, () => m_Settings.Vehicle = !m_Settings.Vehicle },
                { 30, () => m_Settings.VehiclePassengerDetail = !m_Settings.VehiclePassengerDetail },
                { 91, () => m_Settings.UseOnPressOnly = !m_Settings.UseOnPressOnly },
                { 90, () => m_Settings.DisableMod = !m_Settings.DisableMod },
            };
            expandActions = new()
            {
                { 0, () => m_Settings.CitizenExpanded = !m_Settings.CitizenExpanded },
                { 4, () => m_Settings.CompanyExpanded = !m_Settings.CompanyExpanded },
                { 8, () => m_Settings.ParkingExpanded = !m_Settings.ParkingExpanded },
                { 11, () => m_Settings.ParkExpanded = !m_Settings.ParkExpanded },
                { 13, () => m_Settings.PublicTransportExpanded = !m_Settings.PublicTransportExpanded },
                { 16, () => m_Settings.RoadExpanded = !m_Settings.RoadExpanded },
                { 20, () => m_Settings.SchoolExpanded = !m_Settings.SchoolExpanded },
                { 23, () => m_Settings.SpawnableExpanded = !m_Settings.SpawnableExpanded },
                { 29, () => m_Settings.VehicleExpanded = !m_Settings.VehicleExpanded }
            };

            /// GENERAL
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "disableMod", () => m_Settings.DisableMod, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "useOnPressOnly", () => m_Settings.UseOnPressOnly, null, null));

            /// CITIZENS
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "citizen", () => m_Settings.Citizen, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "expandCitizen", () => m_Settings.CitizenExpanded, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "citizenState", () => m_Settings.CitizenState, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "citizenHappiness", () => m_Settings.CitizenHappiness, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "citizenEducation", () => m_Settings.CitizenEducation, null, null));

            /// COMPANIES
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "company", () => m_Settings.Company, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "expandCompany", () => m_Settings.CompanyExpanded, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "companyOutput", () => m_Settings.CompanyOutput, null, null));

            /// EFFICIENCY
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "efficiency", () => m_Settings.Efficiency, null, null));

            /// EMPLOYEES
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "employee", () => m_Settings.Employee, null, null));

            /// PARKS
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "park", () => m_Settings.Park, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "expandPark", () => m_Settings.ParkExpanded, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "parkMaintenance", () => m_Settings.ParkMaintenance, null, null));

            /// PARKING
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "parkingFacility", () => m_Settings.ParkingFacility, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "expandParking", () => m_Settings.ParkingExpanded, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "parkingFees", () => m_Settings.ParkingFees, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "parkingCapacity", () => m_Settings.ParkingCapacity, null, null));

            /// PUBLIC TRANSPORT
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "publicTransport", () => m_Settings.PublicTransport, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "expandPublicTransport", () => m_Settings.PublicTransportExpanded, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "publicTransportWaitingPassengers", () => m_Settings.PublicTransportWaitingPassengers, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "publicTransportWaitingTime", () => m_Settings.PublicTransportWaitingTime, null, null));

            /// ROAD
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "road", () => m_Settings.Road, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "expandRoad", () => m_Settings.RoadExpanded, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "roadLength", () => m_Settings.RoadLength, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "roadUpkeep", () => m_Settings.RoadUpkeep, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "roadCondition", () => m_Settings.RoadCondition, null, null));

            /// SCHOOL
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "school", () => m_Settings.School, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "expandSchool", () => m_Settings.SchoolExpanded, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "schoolStudentCapacity", () => m_Settings.SchoolStudentCapacity, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "schoolStudentCount", () => m_Settings.SchoolStudentCount, null, null));

            /// SPAWNABLE
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "spawnable", () => m_Settings.Spawnable, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "expandSpawnable", () => m_Settings.SpawnableExpanded, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "spawnableHousehold", () => m_Settings.SpawnableHousehold, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "spawnableHouseholdDetails", () => m_Settings.SpawnableHouseholdDetails, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "spawnableLevel", () => m_Settings.SpawnableLevel, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "spawnableLevelDetails", () => m_Settings.SpawnableLevelDetails, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "spawnableRent", () => m_Settings.SpawnableRent, null, null));

            /// VEHICLE
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "vehicle", () => m_Settings.Vehicle, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "expandVehicle", () => m_Settings.VehicleExpanded, null, null));
            AddUpdateBinding(new GetterValueBinding<bool>(kGroup, "vehiclePassengerDetail", () => m_Settings.VehiclePassengerDetail, null, null));

            AddBinding(new TriggerBinding<int>(kGroup, "onToggle", OnToggle));
            AddBinding(new TriggerBinding<int>(kGroup, "onExpand", OnExpand));

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
                UnityEngine.Debug.Log($"Toggle Setting with Id {settingId} found.");
                toggleAction.Invoke();
                m_ExtendedTooltipSystem.m_LocalSettings.Save();
            }
            else
            {
                UnityEngine.Debug.Log($"Toggle Setting with Id {settingId} not found.");
            }
        }

        private void OnExpand(int settingId)
        {
            if (expandActions.TryGetValue(settingId, out Action expandAction))
            {
                expandAction.Invoke();
                m_ExtendedTooltipSystem.m_LocalSettings.Save();
            }
            else
            {
                UnityEngine.Debug.Log($"Expand setting with Id {settingId} not found.");
            }
        }
    }
}
