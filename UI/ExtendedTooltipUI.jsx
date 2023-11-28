import React from 'react'
import { useDataUpdate } from 'hookui-framework'
import * as styles from './styles'

const panelStyle = { position: 'absolute'};

const $Panel = ({ title, children, react }) => {
    const [position, setPosition] = react.useState({ top: 100, left: 10 });
    const [dragging, setDragging] = react.useState(false);
    const [rel, setRel] = react.useState({ x: 0, y: 0 }); // Position relative to the cursor

    const onMouseDown = (e) => {
        if (e.button !== 0) return; // Only left mouse button
        const panelElement = e.target.closest('.panel_YqS');

        // Calculate the initial relative position
        const rect = panelElement.getBoundingClientRect();
        setRel({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });

        setDragging(true);
        e.stopPropagation();
        e.preventDefault();
    }

    const onMouseUp = (e) => {
        setDragging(false);
        // Remove window event listeners when the mouse is released
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }

    const onMouseMove = (e) => {
        if (!dragging) return;

        setPosition({
            top: e.clientY - rel.y,
            left: e.clientX - rel.x,
        });
        e.stopPropagation();
        e.preventDefault();
    }

    const draggableStyle = {
        ...panelStyle,
        top: position.top + 'px',
        left: position.left + 'px',
    }

    react.useEffect(() => {
        if (dragging) {
            // Attach event listeners to window
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        }

        return () => {
            // Clean up event listeners when the component unmounts or dragging is finished
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [dragging]); // Only re-run the effect if dragging state changes

    return (
        <div className="panel_YqS active-infoview-panel_aTq" style={draggableStyle}>
            <div className="header_H_U header_Bpo child-opacity-transition_nkS"
                onMouseDown={onMouseDown}>
                <div className="title-bar_PF4 title_Hfc">
                    <div className="icon-space_h_f"></div>
                    <div className="title_SVH title_zQN">{title}</div>
                    <button class="button_bvQ button_bvQ close-button_wKK">
                        <div class="tinted-icon-iKo icon_PhD" stlye="mask-image: url(Media/Glyphs/Close.svg); "></div>
                    </button>
                </div>
            </div>
            <div class="content_XD5 content_AD7 child-opacity-transition_nkS content_BIL">
                <div class="section_sop section_gUk statistics-menu_y86">
                    <div class="content_flM content_owQ first_l25 last_ZNw">
                        <div class="scrollable_DXr y_SMM track-visible-y_RCA scrollable_By7">
                            <div class="content_gqa">
                                <div className="content_Q1O">
                                    <div class="statistics-category-item_qVI">
                                        <div class="header_Ld7">Tooltips</div>
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ExtendedTooltipUI = ({ react }) => {

    const [showCitizenGroup, setShowCitizenGroup] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.citizen', setShowCitizenGroup);

    const [showCitizenStateTooltip, setShowCitizenStateTooltip] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.citizenState', setShowCitizenStateTooltip);

    const [showCitizenHappinessTooltip, setShowCitizenHappinessTooltip] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.citizenHappiness', setShowCitizenHappinessTooltip);

    const [showCitizenEducationTooltip, setShowCitizenEducationTooltip] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.citizenEducation', setShowCitizenEducationTooltip);

    const [showCompanyGroup, setShowCompanyGroup] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.company', setShowCompanyGroup);

    const [showCompanyOutput, setShowCompanyOutput] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.companyOutput', setShowCompanyOutput);

    const [showEfficiencyGroup, setShowEfficiencyGroup] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.efficiency', setShowEfficiencyGroup);

    const [showEmployeeGroup, setShowEmployeeGroup] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.employee', setShowEmployeeGroup);

    const [showParkingGroup, setShowParkingGroup] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.parking', setShowParkingGroup);

    const [showParkingFees, setShowParkingFees] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.parkingFees', setShowParkingFees);

    const [showParkingCapacity, setShowParkingCapacity] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.parkingCapacity', setShowParkingCapacity);

    const [showParkGroup, setShowParkGroup] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.park', setShowParkGroup);

    const [showParkMaintenance, setShowParkMaintenance] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.parkMaintenance', setShowParkMaintenance);

    const [showPublicTransportationGroup, setShowPublicTransportationGroup] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.publicTransportation', setShowPublicTransportationGroup);

    const [showPublicTransportationWaitingPassengers, setShowPublicTransportationWaitingPassengers] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.publicTransportationWaitingPassengers', setShowPublicTransportationWaitingPassengers);

    const [showPublicTransportationWaitingTime, setShowPublicTransportationWaitingTime] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.publicTransportationWaitingTime', setShowPublicTransportationWaitingTime);

    const [showRoadGroup, setShowRoadGroup] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.road', setShowRoadGroup);

    const [showRoadLength, setShowRoadLength] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.roadLength', setShowRoadLength);

    const [showRoadUpkeep, setShowRoadUpkeep] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.roadUpkeep', setShowRoadUpkeep);

    const [showRoadCondition, setShowRoadCondition] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.roadCondition', setShowRoadCondition);

    const [showSchoolGroup, setShowSchoolGroup] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.school', setShowSchoolGroup);

    const [showSchoolStudentCapacity, setShowSchoolStudentCapacity] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.schoolStudentCapacity', setShowSchoolStudentCapacity);

    const [showSchoolStudentCount, setShowSchoolStudentCount] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.schoolStudentCount', setShowSchoolStudentCount);

    const [showSpawnablesGroup, setShowSpawnablesGroup] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.spawnables', setShowSpawnablesGroup);

    const [showSpawnablesLevel, setShowSpawnablesLevel] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.spawnablesLevel', setShowSpawnablesLevel);

    const [showSpawnablesLevelDetails, setShowSpawnablesLevelDetails] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.spawnablesLevelDetails', setShowSpawnablesLevelDetails);

    const [showSpawnablesHousehold, setShowSpawnablesHousehold] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.spawnablesHousehold', setShowSpawnablesHousehold);

    const [showSpawnablesHouseholdDetails, setShowSpawnablesHouseholdDetails] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.spawnablesHouseholdDetails', setShowSpawnablesHouseholdDetails);

    /*const [showSpawnablesWealth, setShowSpawnablesWealth] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.spawnablesWealth', setShowSpawnablesWealth);*/

    const [showSpawnablesRent, setShowSpawnablesRent] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.spawnablesRent', setShowSpawnablesRent);

    const [showVehicles, setShowVehicles] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.vehicles', setShowVehicles);

    const [showVehiclePassengerDetails, setShowVehiclePassengerDetails] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.spawnablesVehiclesPassengerDetails', setShowVehiclePassengerDetails);

    const tooltipsSettingsData = [
        {
            id: 0, label: 'Citizen', isChecked: showCitizenGroup,
            children: [
                { id: 1, label: 'State', isChecked: showCitizenStateTooltip },
                { id: 2, label: 'Happiness', isChecked: showCitizenHappinessTooltip },
                { id: 3, label: 'Education', isChecked: showCitizenEducationTooltip },
            ]
        }, 
        {
            id: 4, label: 'Company', isChecked: showCompanyGroup,
            children: [
                { id: 5, label: 'Company Output', isChecked: showCompanyOutput },
            ],
        },
        { id: 6, label: 'Efficiency', isChecked: showEfficiencyGroup, children: [] },
        { id: 7, label: 'Employee', isChecked: showEmployeeGroup, children: [] },
        {
            id: 8, label: 'Parking Facilities', isChecked: showParkingGroup,
            children: [
                { id: 9, label: 'Fees', isChecked: showParkingFees },
                { id: 10, label: 'Capacity', isChecked: showParkingCapacity },
            ],
        },
        {
            id: 11, label: 'Parks', isChecked: showParkGroup,
            children: [
                { id: 12, label: 'Maintenance', isChecked: showParkMaintenance },
            ]
        },
        {
            id: 13, label: 'Public Transportation', isChecked: showPublicTransportationGroup,
            children: [
                { id: 14, label: 'Waiting Passengers', isChecked: showPublicTransportationWaitingPassengers },
                { id: 15, label: 'Average Waiting Time', isChecked: showPublicTransportationWaitingTime },
            ]
        },
        {
            id: 16, label: 'Roads', isChecked: showRoadGroup,
            children: [
                { id: 17, label: 'Length', isChecked: showRoadLength },
                { id: 18, label: 'Upkeep', isChecked: showRoadUpkeep },
                { id: 19, label: 'Condition', isChecked: showRoadCondition },
            ]
        },
        {
            id: 20, label: 'Educational Facilities', isChecked: showSchoolGroup,
            children: [
                { id: 21, label: 'Student Capacity', isChecked: showSchoolStudentCapacity },
                { id: 22, label: 'Student Count', isChecked: showSchoolStudentCount },
            ]
        },
        {
            id: 23, label: 'Spawnables', isChecked: showSpawnablesGroup,
            children: [
                { id: 24, label: 'Level', isChecked: showSpawnablesLevel },
                { id: 25, label: 'Level Details', isChecked: showSpawnablesLevelDetails },
                { id: 26, label: 'Household', isChecked: showSpawnablesHousehold },
                { id: 27, label: 'Household Details', isChecked: showSpawnablesHouseholdDetails },
                { id: 28, label: 'Rent', isChecked: showSpawnablesRent },
            ]
        },
        {
            id: 29, label: 'Vehicles', isChecked: showVehicles,
            children: [
                { id: 30, label: 'Passenger Details', isChecked: showVehiclePassengerDetails }
            ]
        },
    ];

    const Setting = ({ setting, nested }) => {
        const { label, isChecked, children } = setting;

        const [expanded, setExpanded] = react.useState(false);
        const checked_class = isChecked ? styles.CLASS_CHECKED : styles.CLASS_UNCHECKED

        const onToggle = () => {
            console.log(setting.id);
            engine.trigger("extendedTooltip.onToggle", setting.id);
        }
        const expandedToggle = () => {
            console.log(expanded)
            setExpanded(!expanded);
        }

        const nestingStyle = { '--nesting': nested };
        const borderColor = 'rgba(134, 205, 144, 1.000000)';
        const borderStyle = {
            borderTopColor: borderColor,
            borderLeftColor: borderColor,
            borderRightColor: borderColor,
            borderBottomColor: borderColor
        };

        const maskImageStyle = { maskImage: expanded === false ? 'url(Media/Glyphs/ThickStrokeArrowRight.svg)' : 'url(Media/Glyphs/ThickStrokeArrowDown.svg)' }
        const renderChildren = () => {
            if (children && children.length > 0 && expanded) {
                return (
                    <div className="content_mJm foldout-expanded">
                        {children.map((child) => (
                            <Setting key={child.id} setting={child} onToggle={onToggle} nested={nested + 1} />
                        ))}
                    </div>
                );
            }

            return null;
        };

        return (
            <div className={styles.many(styles.CLASS_TT_FOLDOUT, styles.CLASS_TT_DISABLE_MOUSE_STATES)} style={nestingStyle} >
                <div className={styles.many(styles.CLASS_TT_HEADER, styles.CLASS_TT_ITEMMOUSESTATES, styles.CLASS_TT_ITEM_FOCUSED)} onClick={expandedToggle}>
                    <div className={styles.CLASS_TT_ICON}>
                        <div className={styles.many(styles.CLASS_TT_CHILD_TOGGLE, styles.CLASS_TT_ITEMMOUSESTATES, checked_class)} onClick={onToggle} style={borderStyle}>
                            <div className={styles.many(styles.CLASS_TT_CHECKMARK, checked_class)}></div>
                        </div>
                    </div>
                    <div className={styles.CLASS_TT_HEADER_CONTENT}>
                        <div className={styles.CLASS_TT_LABEL}>{label}</div>
                    </div>
                    {children && children.length > 0 && <div class="tinted-icon_iKo toggle_RV4 toggle_yQv" style={maskImageStyle}></div>}
                </div>
                {renderChildren()}
            </div>
        );
    }

    const SettingsList = ({ settingsData }) => {
        return (
            <div class="items_AIY">
                {settingsData.map((setting) => (
                    <Setting
                        key={setting.id}
                        nested={0}
                        setting={setting}
                    />
                ))}
            </div>
        );
    };

    return <$Panel title="Extended Tooltip" react={react}>
        <SettingsList settingsData={tooltipsSettingsData} />
    </$Panel>
};

const TestComponent = ({ react }) => <div></div>

window._$hookui.registerPanel({
    id: '89pleasure.extendedTooltip',
    name: 'ExtendedTooltip',
    icon: 'Media/Game/Icons/Journal.svg',
    component: ExtendedTooltipUI
})