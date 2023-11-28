namespace ExtendedTooltip.Settings
{
    public class LocalSettingsItem
    {
       
        public string Version { get; set; }

        public bool UseOnPressOnly { get; set; } = true;

        public string OnPressOnlyKey { get; set; } = "ALT";

        public bool Citizen { get; set; } = true;

        public bool CitizenState { get; set; } = true;

        public bool CitizenHappiness { get; set; } = true;

        public bool CitizenEducation { get; set; } = true;

        public bool Company { get; set; } = true;

        public bool CompanyOutput { get; set; } = true;

        public bool Efficiency { get; set; } = true;

        public bool Employee { get; set; } = true;

        public bool Park { get; set; } = true;

        public bool ParkingFacility { get; set; } = true;

        public bool PublicTransport { get; set; } = true;

        public bool Road { get; set; } = true;

        public bool School { get; set; } = true;

        public bool Spawnable { get; set; } = true;

        public bool SpawnableHousehold { get; set; } = true;

        public bool SpawnableLevel { get; set; } = true;

        public bool SpawnableRent { get; set; } = true;

        public bool Vehicle { get; set; } = true;

        public bool VehicleCapacity { get; set; } = true;
    }
}
