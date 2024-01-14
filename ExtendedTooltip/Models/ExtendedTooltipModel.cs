using Gooee.Plugins;
using System.Collections.Generic;

namespace ExtendedTooltip.Models
{
    public class ExtendedTooltipModel : Model
    {
        /// <summary>
        /// MOD RELATED OPTIONS
        /// </summary>

        // LOCALES
        public string Locale { get; set; } = "en";
        public Dictionary<string, string> Translations { get; set; } = [];

        // UI
        public bool IsVisible { get; set; } = false;
        public bool ShowExample { get; set; } = false;

        public string Version { get; set; } = "0.0.0";

        // GENERAL
        public bool IsEnabled { get; set; } = true;
        public bool UseExtendedLayout { get; set; } = true;
        public string DisplayMode { get; set; } = "instant";
        public string DisplayModeHotkey { get; set; } = "ALT";

        /// <summary>
        ///  TOOLTIPS
        /// </summary>

        // GENERAL
        public bool ShowCompanyOutput { get; set; } = true;
        public bool ShowEfficiency { get; set; } = true;
        public bool ShowEmployee { get; set; } = true;

        // NET TOOL
        public bool ShowNetToolSystem { get; set; } = true;
        public bool ShowNetToolMode { get; set; } = true;
        public bool ShowNetToolElevation { get; set; } = true;

        // CITIZEN
        public bool ShowCitizen { get; set; } = true;
        public bool ShowCitizenState { get; set; } = true;
        public bool ShowCitizenWealth { get; set; } = true;
        public bool ShowCitizenType { get; set; } = true;
        public bool ShowCitizenHappiness { get; set; } = true;
        public bool ShowCitizenEducation { get; set; } = true;

        // PARKS & RECREATION
        public bool ShowPark { get; set; } = true;
        public bool ShowParkMaintenance { get; set; } = true;

        // PARKING
        public bool ShowParkingFacility { get; set; } = true;
        public bool ShowParkingFees { get; set; } = true;
        public bool ShowParkingCapacity { get; set; } = true;

        // PUBLIC TRANSPORT
        public bool ShowPublicTransport { get; set; } = true;
        public bool ShowPublicTransportWaitingPassengers { get; set; } = true;
        public bool ShowPublicTransportWaitingTime { get; set; } = true;

        // ROADS
        public bool ShowRoad { get; set; } = true;
        public bool ShowRoadLength { get; set; } = true;
        public bool ShowRoadUpkeep { get; set; } = true;
        public bool ShowRoadCondition { get; set; } = true;

        // EDUCATION
        public bool ShowSchool { get; set; } = true;
        public bool ShowSchoolStudentCapacity { get; set; } = true;

        // GROWABLES
        public bool ShowGrowables { get; set; } = true;
        public bool ShowGrowablesHousehold { get; set; } = true;
        public bool ShowGrowablesHouseholdDetails { get; set; } = true;
        public bool ShowGrowablesLevel { get; set; } = true;
        public bool ShowGrowablesLevelDetails { get; set; } = true;
        public bool ShowGrowablesRent { get; set; } = true;
        public bool ShowGrowablesHouseholdWealth { get; set; } = true;
        public bool ShowGrowablesBalance { get; set; } = true;
        public bool ShowGrowablesZoneInfo { get; set; } = true;

        // VEHICLES
        public bool ShowVehicle { get; set; } = true;
        public bool ShowVehicleState { get; set; } = true;
        public bool ShowVehicleDriver { get; set; } = true;
        public bool ShowVehiclePostvan { get; set; } = true;
        public bool ShowVehicleGarbageTruck { get; set; } = true;
        public bool ShowVehiclePassengerDetails { get; set; } = true;
    }
}
