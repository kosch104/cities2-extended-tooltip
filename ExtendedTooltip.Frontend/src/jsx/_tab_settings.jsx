import React from 'react';
import EtSettingsBox from './components/_et_settings_box.jsx';

function TabSettings({ controller, react }) {

    const { Grid, FormGroup, FormCheckBox, Dropdown, Button, Icon } = window.$_gooee.framework;

    const [tooltipCategory, setTooltipCategory] = react.useState("general");

    const { model, update, trigger } = controller();

    const onCategoryChanged = (value) => {
        setTooltipCategory(value);
    };

    const onDisplayModeChanged = (value) => {
        update("DisplayMode", value);
        trigger("DoSave");
    };
    const displayModeOptions = [
        {
            label: "Instant",
            value: "instant",
        }, {
            label: "Delayed",
            value: "delayed",
        }, {
            label: "Hotkey",
            value: "hotkey",
        },
    ];
    const onDisplayModeHotkeyChanged = (value) => {
        update("DisplayModeHotkey", value);
        trigger("DoSave");
    }
    const displayModeHotkeyOptions = [
        {
            label: "CTRL",
            value: "CTRL",
        }, {
            label: "SHIFT",
            value: "SHIFT",
        }, {
            label: "ALT",
            value: "ALT",
        },
    ];

    const onSettingsToggle = (name, value) => {
        update(name, value)
        trigger("DoSave");
    }

    const tooltipCategoryContent = [
        {
            name: "general",
            content: <EtSettingsBox title="General" description="Manage tooltips which show up on multiple entities of the game." icon="coui://GameUI/Media/Game/Icons/Information.svg">
                <Grid>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-1" checked={model.ShowCompanyOutput} label="Show Company Resources" onToggle={value => onSettingsToggle("ShowCompanyOutput", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">The amount of resources the company has in stock.</p>
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-1" checked={model.ShowEmployee} label="Show Employees" onToggle={value => onSettingsToggle("ShowEmployee", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">Shows the amount of employees a buildings has.</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-1" checked={model.ShowEfficiency} label="Show Efficiency" onToggle={value => onSettingsToggle("ShowEfficiency", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">Shows the efficiency of buliding in %.</p>
                        </div>
                    </div>
                </Grid>
            </EtSettingsBox>
        },
        {
            name: "citizen",
            content: <EtSettingsBox title="Citizen" description="Manage tooltips while hover a citizen." icon="coui://GameUI/Media/Game/Icons/Population.svg">
                <Grid>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-1" checked={model.ShowCitizenState} label="Show State" onToggle={value => onSettingsToggle("ShowCitizenState", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">Shows the current state of the selected citizen.</p>
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-1" checked={model.ShowCitizenWealth} label="Show Wealth" onToggle={value => onSettingsToggle("ShowCitizenWealth", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">Shows the current wealth of the selected citizen.</p>
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-1" checked={model.ShowCitizenType} label="Show Type" onToggle={value => onSettingsToggle("ShowCitizenType", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">Shows which type the selected citizen is.</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-1" checked={model.ShowCitizenHappiness} label="Show Happiness" onToggle={value => onSettingsToggle("ShowCitizenHappiness", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">Shows how happy the selected citizen currently is.</p>
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-1" checked={model.ShowCitizenEducation} label="Show Education" onToggle={value => onSettingsToggle("ShowCitizenEducation", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">Shows the education level of the selected citizen.</p>
                        </div>
                    </div>
                </Grid>
            </EtSettingsBox>
        },
        {
            name: "education",
            content: <EtSettingsBox title="Education" description="Manage tooltips related to educational buildings." icon="coui://GameUI/Media/Game/Icons/Education.svg">
                <Grid>
                    <div class="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-1" label="Show Student Capacity" checked={model.ShowSchoolStudentCapacity} onToggle={(value) => onSettingsToggle("ShowSchoolStudentCapacity", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">Shows the currently occupied and available places at schools and universities.</p>
                        </div>
                    </div>
                    <div class="col-6">&nbsp;</div>
                </Grid>
            </EtSettingsBox>
        },
        {
            name: "growables",
            content: <EtSettingsBox title="Growables" description="Enable related tooltips for growables." icon="coui://GameUI/Media/Game/Icons/Zones.svg">
                <Grid>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowGrowablesHousehold} label="Show Households" onToggle={value => onSettingsToggle("ShowGrowablesHousehold", value)} disabled={!model.IsEnabled} />
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowGrowablesHouseholdDetails} label="Show Detailed Households" onToggle={value => onSettingsToggle("ShowGrowablesHouseholdDetails", value)} disabled={!model.IsEnabled} />
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowGrowablesHouseholdWealth} label="Show Household Wealth" onToggle={value => onSettingsToggle("ShowGrowablesHouseholdWealth", value)} disabled={!model.IsEnabled} />
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowGrowablesLevel} label="Show Level" onToggle={value => onSettingsToggle("ShowGrowablesLevel", value)} disabled={!model.IsEnabled} />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowGrowablesLevelDetails} label="Show Detailed Level" onToggle={value => onSettingsToggle("ShowGrowablesLevelDetails", value)} disabled={!model.IsEnabled} />
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowGrowablesRent} label="Show Rent" onToggle={value => onSettingsToggle("ShowGrowablesRent", value)} disabled={!model.IsEnabled} />
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowGrowablesBalance} label="Show Balance" onToggle={value => onSettingsToggle("ShowGrowablesBalance", value)} disabled={!model.IsEnabled} />
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowGrowablesZoneInfo} label="Show Zone Info" onToggle={value => onSettingsToggle("ShowGrowablesZoneInfo", value)} disabled={!model.IsEnabled} />
                        </div>
                    </div>
                </Grid>
            </EtSettingsBox>
        },
        {
            name: "nettool",
            content: <EtSettingsBox title="NetTool" description="Manage tooltips which show up while in placing roads." icon="coui://GameUI/Media/Game/Icons/Roads.svg">
                <Grid>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-2" label="Show Mode" checked={model.ShowNetToolMode} onToggle={(value) => onSettingsToggle("ShowNetToolMode", value)} disabled={!model.IsEnabled} />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-2" label="Show Elevation" checked={model.ShowNetToolElevation} onToggle={(value) => onSettingsToggle("ShowNetToolElevation", value)} disabled={!model.IsEnabled} />
                        </div>
                    </div>
                </Grid>
            </EtSettingsBox>
        },
        {
            name: "parks",
            content: <EtSettingsBox title="Parks & Recreation" description="Shows information related to company data" icon="coui://GameUI/Media/Game/Icons/ParksAndRecreation.svg">
                <FormCheckBox className="mb-2" checked={model.ShowParkMaintenance} label="Show Park Maintenance" onToggle={value => onSettingsToggle("ShowParkMaintenance", value)} disabled={!model.IsEnabled} />
            </EtSettingsBox>
        },
        {
            name: "parking",
            content: <EtSettingsBox title="Parking" description="Enable parking related tooltips." icon="coui://GameUI/Media/Game/Icons/Parking.svg">
                <FormCheckBox className="mb-2" checked={model.ShowParkingFees} label="Show Fees" onToggle={value => onSettingsToggle("ShowParkingFees", value)} disabled={!model.IsEnabled} />
                <FormCheckBox className="mb-2" checked={model.ShowParkingCapacity} label="Show Parking Capacity" onToggle={value => onSettingsToggle("ShowParkingCapacity", value)} disabled={!model.IsEnabled} />
            </EtSettingsBox>
        },
        {
            name: "publictransport",
            content: <EtSettingsBox title="Public Transportation" description="Enable parking related tooltips." icon="coui://GameUI/Media/Game/Icons/TransportationOverview.svg">
                <FormCheckBox className="mb-2" checked={model.ShowPublicTransportWaitingPassengers} label="Show Waiting Passengers" onToggle={value => onSettingsToggle("ShowPublicTransportWaitingPassengers", value)} disabled={!model.IsEnabled} />
                <FormCheckBox className="mb-2" checked={model.ShowPublicTransportWaitingTime} label="Show Waiting Time" onToggle={value => onSettingsToggle("ShowPublicTransportWaitingTime", value)} disabled={!model.IsEnabled} />
            </EtSettingsBox>
        },
        {
            name: "roads",
            content: <EtSettingsBox title="Roads" description="Enable tooltips while hover over roads" icon="coui://GameUI/Media/Game/Icons/Roads.svg">
                <FormCheckBox className="mb-2" checked={model.ShowRoadLength} label="Show Length" onToggle={value => onSettingsToggle("ShowRoadLength", value)} disabled={!model.IsEnabled} />
                <FormCheckBox className="mb-2" checked={model.ShowRoadUpkeep} label="Show Upkeep" onToggle={value => onSettingsToggle("ShowRoadUpkeep", value)} disabled={!model.IsEnabled} />
                <FormCheckBox className="mb-2" checked={model.ShowRoadCondition} label="Show Conditions" onToggle={value => onSettingsToggle("ShowRoadCondition", value)} disabled={!model.IsEnabled} />
            </EtSettingsBox>
        },
        {
            name: "vehicles",
            content: <EtSettingsBox title="Vehicles" description="Enable related tooltips for vehicles." icon="coui://GameUI/Media/Game/Icons/Traffic.svg">
                <FormCheckBox className="mb-2" checked={model.ShowVehicleState} label="Show State" onToggle={value => onSettingsToggle("ShowVehicleState", value)} disabled={!model.IsEnabled} />
                <FormCheckBox className="mb-2" checked={model.ShowVehicleDriver} label="Show Driver" onToggle={value => onSettingsToggle("ShowVehicleDriver", value)} disabled={!model.IsEnabled} />
                <FormCheckBox className="mb-2" checked={model.ShowVehiclePostvan} label="Show Postvan" onToggle={value => onSettingsToggle("ShowVehiclePostvan", value)} disabled={!model.IsEnabled} />
                <FormCheckBox className="mb-2" checked={model.ShowVehicleGarbageTruck} label="Show Garbage Truck" onToggle={value => onSettingsToggle("ShowVehicleGarbageTruck", value)} disabled={!model.IsEnabled} />
                <FormCheckBox className="mb-2" checked={model.ShowVehiclePassengerDetails} label="Show Passenger Details" onToggle={value => onSettingsToggle("ShowVehiclePassengerDetails", value)} disabled={!model.IsEnabled} />
            </EtSettingsBox>
        }
    ];

    return <div>
        <Grid className="h-100">
            <div className="col-3 p-4 bg-black-trans-faded rounded-sm">
                <h2 className="mb-2">General</h2>
                <div className="bg-black-trans-less-faded rounded-sm mb-4">
                    <div class="p-4">
                        <FormGroup label="Enable Mod">
                            <p className="text-muted mb-2">Enables a wider layout for the tooltips.</p>
                            <FormCheckBox checked={model.IsEnabled} label="On/Off" onToggle={value => onSettingsToggle("IsEnabled", value)} />
                        </FormGroup>
                    </div>
                </div>
                <div className="bg-black-trans-less-faded rounded-sm mb-4">
                    <div class="p-4">
                        <FormGroup label="Display Mode">
                            <p className="text-muted mb-2">Choose how the tooltip is displayed.</p>
                            <Dropdown options={displayModeOptions} selected={model.DisplayMode} onSelectionChanged={onDisplayModeChanged} />
                        </FormGroup>
                        {model.DisplayMode == "hotkey" ? <FormGroup className="mt-3" label="Hotkey">
                            <Dropdown options={displayModeHotkeyOptions} selected={model.DisplayModeHotkey} onSelectionChanged={onDisplayModeHotkeyChanged} disabled={!model.IsEnabled} />
                        </FormGroup> : null}
                    </div>
                </div>
                <div className="bg-black-trans-less-faded rounded-sm mb-4">
                    <div class="p-4">
                        <FormGroup label="Extended Layout">
                            <p className="text-muted mb-2">Enables a wider layout for the tooltips.</p>
                            <FormCheckBox checked={model.UseExtendedLayout} label="On/Off" onToggle={value => onSettingsToggle("UseExtendedLayout", value)} disabled={!model.IsEnabled} />
                        </FormGroup>
                    </div>
                </div>
            </div>
            <div className="col-9 p-4 bg-black-trans-faded rounded-sm">
                <h2 className="mb-2">Tooltips</h2>
                <p className="mb-2">Which tooltips you want to enable.</p>
                <div className="btn-group pb-4 w-x">
                    <Button size="sm" color={tooltipCategory == 'general' ? 'dark' : 'light'} onClick={() => onCategoryChanged("general")}>General</Button>
                    <Button size="sm" color={tooltipCategory == 'citizen' ? 'dark' : 'light'} onClick={() => onCategoryChanged("citizen")}>Citizen</Button>
                    <Button size="sm" color={tooltipCategory == 'education' ? 'dark' : 'light'} onClick={() => onCategoryChanged("education")}>Education</Button>
                    <Button size="sm" color={tooltipCategory == 'growables' ? 'dark' : 'light'} onClick={() => onCategoryChanged("growables")}>Growables</Button>
                    <Button size="sm" color={tooltipCategory == 'nettool' ? 'dark' : 'light'} onClick={() => onCategoryChanged("nettool")}>NetTool</Button>
                    <Button size="sm" color={tooltipCategory == 'parking' ? 'dark' : 'light'} onClick={() => onCategoryChanged("parking")}>Parking</Button>
                    <Button size="sm" color={tooltipCategory == 'parks' ? 'dark' : 'light'} onClick={() => onCategoryChanged("parks")}>Parks & Recreation</Button>
                    <Button size="sm" color={tooltipCategory == 'publictransport' ? 'dark' : 'light'} onClick={() => onCategoryChanged("publictransport")}>Public Transport</Button>
                    <Button size="sm" color={tooltipCategory == 'roads' ? 'dark' : 'light'} onClick={() => onCategoryChanged("roads")}>Roads</Button>
                    <Button size="sm" color={tooltipCategory == 'vehicles' ? 'dark' : 'light'} onClick={() => onCategoryChanged("vehicles")}>Vehicles</Button>
                </div>
                {!model.IsEnabled && <div className="alert alert-danger mb-2">
                    <div className="d-flex flex-row align-items-center">
                        <Icon fa className="mr-2" icon="solid-circle-exclamation"></Icon>
                        <div>Mod is globally disabled!</div>
                    </div>
                </div>}
                {tooltipCategoryContent.find(x => x['name'] === tooltipCategory).content}
            </div>
        </Grid>
    </div>;
}

export default TabSettings;