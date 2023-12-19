namespace ExtendedTooltip.Settings
{
    public class LocalSettingsItem
    {

        public string Version { get; } = MyPluginInfo.PLUGIN_VERSION;

        // GENERAL
        public bool DisableMod { get; set; } = false;
        public DisplayMode DisplayMode { get; set; } = 0;
        public string OnPressOnlyKey { get; set; } = "ALT";
        public bool ExtendedLayout { get; set; } = true;

        // TOOL SYSTEM
        public bool AnarchyMode { get; set; } = true;
        public bool NetToolSystem { get; set; } = true;
        public bool NetToolSystemExpanded { get; set; } = false;
        public bool NetToolMode { get; set; } = true;
        public bool NetToolElevation { get; set; } = true;

        // CITIZEN
        public bool CitizenExpanded { get; set; } = false;
        public bool Citizen { get; set; } = true;
        public bool CitizenState { get; set; } = true;
        public bool CitizenWealth { get; set; } = true;
        public bool CitizenType { get; set; } = true;
        public bool CitizenHappiness { get; set; } = true;
        public bool CitizenEducation { get; set; } = true;

        // COMPANY
        public bool CompanyExpanded { get; set; } = false;  
        public bool Company { get; set; } = true;
        public bool CompanyOutput { get; set; } = true;

        // EFFICIENCY
        public bool Efficiency { get; set; } = true;

        // EMPLOYEES
        public bool Employee { get; set; } = true;

        // PARKS
        public bool ParkExpanded { get; set; } = false;
        public bool Park { get; set; } = true;
        public bool ParkMaintenance { get; set; } = true;

        // PARKING
        public bool ParkingExpanded { get; set; } = false;
        public bool ParkingFacility { get; set; } = true;
        public bool ParkingFees { get; set; } = true;
        public bool ParkingCapacity { get; set; } = true;

        // PUBLIC TRANSPORT
        public bool PublicTransportExpanded { get; set; } = false;
        public bool PublicTransport { get; set; } = true;
        public bool PublicTransportWaitingPassengers { get; set; } = true;
        public bool PublicTransportWaitingTime { get; set; } = true;

        // ROAD
        public bool RoadExpanded { get; set; } = false;
        public bool Road { get; set; } = true;
        public bool RoadLength { get; set; } = true;
        public bool RoadUpkeep { get; set; } = true;
        public bool RoadCondition { get; set; } = true;

        // SCHOOL
        public bool SchoolExpanded { get; set; } = false;
        public bool School { get; set; } = true;
        public bool SchoolStudentCapacity { get; set; } = true;

        // SPAWNABLE
        public bool SpawnableExpanded { get; set; } = false;
        public bool Spawnable { get; set; } = true;
        public bool SpawnableHousehold { get; set; } = true;
        public bool SpawnableHouseholdDetails { get; set; } = true;
        public bool SpawnableLevel { get; set; } = true;
        public bool SpawnableLevelDetails { get; set; } = true;
        public bool SpawnableRent { get; set; } = true;
        public bool SpawnableHouseholdWealth { get; set; } = true;
        public bool SpawnableBalance { get; set; } = true;
        public bool SpawnableZoneInfo { get; set; } = true;

        // VEHICLE
        public bool VehicleExpanded { get; set; } = false;
        public bool Vehicle { get; set; } = true;
        public bool VehicleState { get; set; } = true;
        public bool VehicleDriver { get; set; } = true;
        public bool VehiclePostvan { get; set; } = true;
        public bool VehicleGarbageTruck { get; set; } = true;
        public bool VehiclePassengerDetails { get; set; } = true;
    }
}
