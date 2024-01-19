import React from 'react';
import EtSettingsBox from './components/_et_settings_box.jsx';

const TabSettings = ({ react, model, update, trigger }) => {

    const { Grid, FormGroup, FormCheckBox, Dropdown, Button, Icon, Slider } = window.$_gooee.framework;
    const [tooltipCategory, setTooltipCategory] = react.useState("general");

    if (model.Translations === undefined || model.DisplayModeDelay === undefined) {
        return <div></div>;
    };

    // LANGUAGES
    const translations = model.Translations;

    // DISPLAY MODE DELAY
    const delayInMs = parseInt(model.DisplayModeDelay);
    const millisecondsStep = 10;
    const minimumMilliseconds = 160;

    const toSliderValue = () => {
        return (delayInMs - minimumMilliseconds) / millisecondsStep;
    };

    // DISPLAY MODE
    const onDisplayModeDelayChanged = (value) => {
        const milliseconds = minimumMilliseconds + (value * millisecondsStep);
        update("DisplayModeDelay", milliseconds.toString());
        trigger("DoSave");
    };

    const onDisplayModeChanged = (value) => {
        update("DisplayMode", value);
        trigger("DoSave");
    };
    const displayModeOptions = [
        {
            label: translations.displayModeInstant,
            value: "instant",
        }, {
            label: translations.displayModeDelayed,
            value: "delayed",
        }, {
            label: translations.displayModeHotkey,
            value: "hotkey",
        },
    ];
    const onDisplayModeHotkeyChanged = (value) => {
        update("DisplayModeHotkey", value);
        trigger("DoSave");
    };
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

    // TOOLTIP CATEGORY
    const onCategoryChanged = (value) => {
        setTooltipCategory(value);
    };

    // TOOLTIP SETTINGS
    const onSettingsToggle = (name, value) => {
        update(name, value)
        trigger("DoSave");
    };

    const menuButton = (id, title, icon) => {
        return <Button size="sm" style="trans" color={tooltipCategory == id ? 'dark' : null} onClick={() => onCategoryChanged(id)}>
            <div className="d-flex flex-row align-items-center">
                <Icon className="mr-1" size="sm" icon={icon} />
                <p>{title}</p>
            </div>
        </Button>
    };

    const tooltipCategoryContent = [
        {
            name: "general",
            content: <EtSettingsBox title={translations.general} description={translations.generalDescription} icon="coui://GameUI/Media/Game/Icons/Information.svg">
                <Grid>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-1" checked={model.ShowCompanyOutput} label={translations.generalCompanyOutput} onToggle={value => onSettingsToggle("ShowCompanyOutput", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.generalCompanyOutputDescription}</p>
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-1" checked={model.ShowEmployee} label={translations.generalEmployees} onToggle={value => onSettingsToggle("ShowEmployee", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.generalEmployeesDescription}</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-1" checked={model.ShowEfficiency} label={translations.generalEfficiency} onToggle={value => onSettingsToggle("ShowEfficiency", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.generalEfficiencyDescription}</p>
                        </div>
                    </div>
                </Grid>
            </EtSettingsBox>
        },
        {
            name: "citizens",
            content: <EtSettingsBox title={translations.citizen} description={translations.citizenDescription} icon="coui://GameUI/Media/Game/Icons/Population.svg">
                <Grid>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-1" checked={model.ShowCitizenState} label={translations.citizenState} onToggle={value => onSettingsToggle("ShowCitizenState", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.citizenStateDescription}</p>
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-1" checked={model.ShowCitizenWealth} label={translations.citizenWealth} onToggle={value => onSettingsToggle("ShowCitizenWealth", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.citizenWealthDescription}</p>
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-1" checked={model.ShowCitizenType} label={translations.citizenType} onToggle={value => onSettingsToggle("ShowCitizenType", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.citizenTypeDescription}</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-1" checked={model.ShowCitizenHappiness} label={translations.citizenHappiness} onToggle={value => onSettingsToggle("ShowCitizenHappiness", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.citizenHappinessDecription}</p>
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-1" checked={model.ShowCitizenEducation} label={translations.citizenEducation} onToggle={value => onSettingsToggle("ShowCitizenEducation", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.citizenEducationDescription}</p>
                        </div>
                    </div>
                </Grid>
            </EtSettingsBox>
        },
        {
            name: "education",
            content: <EtSettingsBox title={translations.education} description={translations.educationDescription} icon="coui://GameUI/Media/Game/Icons/Education.svg">
                <Grid>
                    <div class="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-1" label={translations.educationStudentCapacity} checked={model.ShowEducationStudentCapacity} onToggle={(value) => onSettingsToggle("ShowEducationStudentCapacity", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.educationStudentCapacityDescription}</p>
                        </div>
                    </div>
                    <div class="col-6">&nbsp;</div>
                </Grid>
            </EtSettingsBox>
        },
        {
            name: "growables",
            content: <EtSettingsBox title={translations.growables} description={translations.growablesDescription} icon="coui://GameUI/Media/Game/Icons/Zones.svg">
                <Grid>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowGrowablesHousehold} label={translations.growablesHousehold} onToggle={value => onSettingsToggle("ShowGrowablesHousehold", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.growablesHouseholdDescription}</p>
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowGrowablesHouseholdDetails} label={translations.growablesHouseholdDetails} onToggle={value => onSettingsToggle("ShowGrowablesHouseholdDetails", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.growablesHouseholdDetailsDescription}</p>
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowGrowablesLevel} label={translations.growablesLevel} onToggle={value => onSettingsToggle("ShowGrowablesLevel", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.growablesLevelDescription}</p>
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowGrowablesLevelDetails} label={translations.growablesLevelDetails} onToggle={value => onSettingsToggle("ShowGrowablesLevelDetails", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.growablesLevelDetailsDescription}</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowGrowablesHouseholdWealth} label={translations.growablesHouseholdWealth} onToggle={value => onSettingsToggle("ShowGrowablesHouseholdWealth", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.growablesHouseholdWealthDescription}</p>
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowGrowablesRent} label={translations.growablesRent} onToggle={value => onSettingsToggle("ShowGrowablesRent", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.growablesRentDescription}</p>
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowGrowablesBalance} label={translations.growablesBalance} onToggle={value => onSettingsToggle("ShowGrowablesBalance", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.growablesBalanceDescription}</p>
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowGrowablesZoneInfo} label={translations.growablesZoneInfo} onToggle={value => onSettingsToggle("ShowGrowablesZoneInfo", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.growablesZoneInfoDescription}</p>
                        </div>
                    </div>
                </Grid>
            </EtSettingsBox>
        },
        {
            name: "nettool",
            content: <EtSettingsBox title={translations.toolSystem} description={translations.toolSystemNetToolDescription} icon="coui://GameUI/Media/Game/Icons/RoadsServices.svg">
                <Grid>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-2" label={translations.toolSystemNetToolMode} checked={model.ShowNetToolMode} onToggle={(value) => onSettingsToggle("ShowNetToolMode", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.toolSystemNetToolModeDescription}</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-2" label={translations.toolSystemNetToolElevation} checked={model.ShowNetToolElevation} onToggle={(value) => onSettingsToggle("ShowNetToolElevation", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.toolSystemNetToolElevationDescription}</p>
                        </div>
                    </div>
                </Grid>
            </EtSettingsBox>
        },
        {
            name: "parks",
            content: <EtSettingsBox title={translations.park} description={translations.parkDescription} icon="coui://GameUI/Media/Game/Icons/ParksAndRecreation.svg">
                <div className="my-3">
                    <FormCheckBox className="mb-2" checked={model.ShowParkMaintenance} label={translations.parkMaintenance} onToggle={value => onSettingsToggle("ShowParkMaintenance", value)} disabled={!model.IsEnabled} />
                    <p className="text-muted fs-sm">{translations.parkMaintenanceDescription}</p>
                </div>
            </EtSettingsBox>
        },
        {
            name: "parking",
            content: <EtSettingsBox title={translations.parkingFacility} description={translations.parkingFacilityDescription} icon="coui://GameUI/Media/Game/Icons/Parking.svg">
                <Grid>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowParkingFees} label={translations.parkingFees} onToggle={value => onSettingsToggle("ShowParkingFees", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.parkingFeesDescription}</p>
                        </div>
                    </div>
                    <div class="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowParkingCapacity} label={translations.parkingCapacity} onToggle={value => onSettingsToggle("ShowParkingCapacity", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.parkingCapacityDescription}</p>
                        </div>
                    </div>
                </Grid>
            </EtSettingsBox>
        },
        {
            name: "publictransport",
            content: <EtSettingsBox title={translations.publicTransport} description={translations.publicTransportDescription} icon="coui://GameUI/Media/Game/Icons/TransportationOverview.svg">
                <Grid>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowPublicTransportWaitingPassengers} label={translations.publicTransportWaitingPassengers} onToggle={value => onSettingsToggle("ShowPublicTransportWaitingPassengers", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.publicTransportWaitingPassengersDescription}</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowPublicTransportWaitingTime} label={translations.publicTransportWaitingTime} onToggle={value => onSettingsToggle("ShowPublicTransportWaitingTime", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.publicTransportWaitingTimeDescription}</p>
                        </div>
                    </div>
                </Grid>
            </EtSettingsBox>
        },
        {
            name: "roads",
            content: <EtSettingsBox title={translations.road} description={translations.roadDescription} icon="coui://GameUI/Media/Game/Icons/Roads.svg">
                <Grid>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowRoadLength} label={translations.roadLength} onToggle={value => onSettingsToggle("ShowRoadLength", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.roadLengthDescription}</p>
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowRoadUpkeep} label={translations.roadUpkeep} onToggle={value => onSettingsToggle("ShowRoadUpkeep", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.roadUpkeepDescription}</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowRoadCondition} label={translations.roadCondition} onToggle={value => onSettingsToggle("ShowRoadCondition", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.roadConditionDescription}</p>
                        </div>
                    </div>
                </Grid>
            </EtSettingsBox>
        },
        {
            name: "vehicles",
            content: <EtSettingsBox title={translations.vehicle} description={translations.vehicleDescription} icon="coui://GameUI/Media/Game/Icons/Traffic.svg">
                <Grid>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowVehicleState} label={translations.vehicleState} onToggle={value => onSettingsToggle("ShowVehicleState", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.vehicleStateDescription}</p>
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowVehicleDriver} label={translations.vehicleDriver} onToggle={value => onSettingsToggle("ShowVehicleDriver", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.vehicleDriverDescription}</p>
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowVehiclePostvan} label={translations.vehiclePostvan} onToggle={value => onSettingsToggle("ShowVehiclePostvan", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.vehiclePostvanDescription}</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowVehicleGarbageTruck} label={translations.vehicleGarbageTruck} onToggle={value => onSettingsToggle("ShowVehicleGarbageTruck", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.vehicleGarbageTruckDescription}</p>
                        </div>
                        <div className="my-3">
                            <FormCheckBox className="mb-2" checked={model.ShowVehiclePassengerDetails} label={translations.vehiclePassengerDetail} onToggle={value => onSettingsToggle("ShowVehiclePassengerDetails", value)} disabled={!model.IsEnabled} />
                            <p className="text-muted fs-sm">{translations.vehiclePassengerDetailDescription}</p>
                        </div>
                    </div>
                </Grid>
            </EtSettingsBox>
        }
    ];

    return <div>
        <Grid className="h-100">
            <div className="col-3 p-4 bg-black-trans-faded rounded-sm">
                <div class="mb-2">
                    <h2 className="text-primary">{translations.general}</h2>
                </div>
                <div className="bg-black-trans-less-faded rounded-sm mb-4">
                    <div class="p-4">
                        <FormGroup label={translations.enableMod}>
                            <small className="text-muted mb-2">{translations.enableModDescription}</small>
                            <FormCheckBox checked={model.IsEnabled} label={translations.uiOnOff} onToggle={value => onSettingsToggle("IsEnabled", value)} />
                        </FormGroup>
                    </div>
                </div>
                <div className="bg-black-trans-less-faded rounded-sm mb-4">
                    <div class="p-4">
                        <FormGroup label={translations.displayMode}>
                            <small className="text-muted mb-2">{translations.displayModeDescription}</small>
                            <Dropdown options={displayModeOptions} selected={model.DisplayMode} onSelectionChanged={onDisplayModeChanged} />
                        </FormGroup>
                        {model.DisplayMode == "hotkey" ? <FormGroup className="mt-3" label={translations.displayModeHotkey}>
                            <Dropdown options={displayModeHotkeyOptions} selected={model.DisplayModeHotkey} onSelectionChanged={onDisplayModeHotkeyChanged} disabled={!model.IsEnabled} />
                            <small className="form-text text-muted">{translations.displayModeHotkeyDescription}</small>
                        </FormGroup> : null}
                        {model.DisplayMode == 'delayed' ? <FormGroup className="mt-3" label={translations.displayModeDelay}>
                            <Grid>
                                <div className="col-10">
                                    <Slider value={toSliderValue} onValueChanged={value => onDisplayModeDelayChanged(Number(value))} />
                                </div>
                                <div className="col-2 align-items-center justify-content-center">
                                    {delayInMs >= 1000 ? delayInMs / 1000 + "s" : delayInMs + "ms"}
                                </div>
                            </Grid>
                            <small className="form-text text-muted mt-2">{translations.displayModeDelayDescription}</small>
                        </FormGroup>: null}
                    </div>
                </div>
                <div className="bg-black-trans-less-faded rounded-sm mb-4">
                    <div class="p-4">
                        <FormGroup label={ translations.extendedLayout }>
                            <small className="text-muted mb-2">{translations.extendedLayoutDescription}</small>
                            <FormCheckBox checked={model.UseExtendedLayout} label={translations.uiOnOff} onToggle={value => onSettingsToggle("UseExtendedLayout", value)} disabled={!model.IsEnabled} />
                        </FormGroup>
                    </div>
                </div>
            </div>
            <div className="col-9 p-4 bg-black-trans-faded rounded-sm">
                <div class="d-flex flex-row align-items-center mb-2">
                    <h2 className="text-primary mr-2">{translations.uiTabTooltips}</h2>
                    <p>{translations.uiTabTooltipsDescription}</p>
                </div>
                <Grid>
                    <div class="col-3 bg-black-trans-less-faded rounded-sm">
                        <div className="btn-group-vertical w-100">
                            {menuButton("general", "General", "coui://GameUI/Media/Game/Icons/Information.svg")}
                            {menuButton("citizens", translations.citizen, "coui://GameUI/Media/Game/Icons/Population.svg")}
                            {menuButton("education", translations.education, "coui://GameUI/Media/Game/Icons/Education.svg")}
                            {menuButton("growables", translations.growables, "coui://GameUI/Media/Game/Icons/Zones.svg")}
                            {menuButton("nettool", translations.toolSystem, "coui://GameUI/Media/Game/Icons/RoadsServices.svg")}
                            {menuButton("parks", translations.park, "coui://GameUI/Media/Game/Icons/ParksAndRecreation.svg")}
                            {menuButton("parking", translations.parkingFacility, "coui://GameUI/Media/Game/Icons/Parking.svg")}
                            {menuButton("publictransport", translations.publicTransport, "coui://GameUI/Media/Game/Icons/TransportationOverview.svg")}
                            {menuButton("roads", translations.road, "coui://GameUI/Media/Game/Icons/Roads.svg")}
                            {menuButton("vehicles", translations.vehicle, "coui://GameUI/Media/Game/Icons/Traffic.svg")}
                        </div>
                    </div>
                    <div class="col-9">
                        {!model.IsEnabled && <div className="alert alert-danger mb-2">
                            <div className="d-flex flex-row align-items-center">
                                <Icon fa className="mr-2" icon="solid-circle-exclamation"></Icon>
                                <div>{translations.modDisabledMessage}</div>
                            </div>
                        </div>}
                        {tooltipCategoryContent.find(x => x['name'] === tooltipCategory).content}
                    </div>
                </Grid>
            </div>
        </Grid>
    </div>;
}

export default TabSettings;