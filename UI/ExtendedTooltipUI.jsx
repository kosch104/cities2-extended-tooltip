import React from 'react'
import { useDataUpdate } from 'hookui-framework'
import * as styles from './styles'

const panelStyle = { position: 'absolute', maxHeight: '600rem' };

const $Panel = ({ title, children, react }) => {
    const [position, setPosition] = react.useState({ top: 100, left: 10 });
    const [dragging, setDragging] = react.useState(false);
    const [rel, setRel] = react.useState({ x: 0, y: 0 }); // Position relative to the cursor
    const [topValue, setTopValue] = react.useState(0);

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

    const handleScroll = (event) => {
        setTopValue(event.target.scrollTop);
    }
    const scrollableStyle = { height: '200px', top: topValue };

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
            <div class="content_XD5 content_AD7 child-opacity-transition_nkS content_BIL"
                style={{ height: '500px', overflowY: 'scroll' }}>
                <div class="section_sop section_gUk statistics-menu_y86" style={{ width: '100%' }}>
                    <div class="content_flM content_owQ first_l25 last_ZNw">
                        <div class="scrollable_DXr y_SMM track-visible-y_RCA scrollable_By7">
                            <div class="content_gqa" onScroll={handleScroll}>
                                <div className="content_Q1O">
                                    {children}
                                </div>
                                <div class="bottom-padding_JS3"></div>
                            </div>
                            <div class="track_e3O y_SMM">
                                <div id="scrollbar" class="thumb_Cib y_SMM" style={scrollableStyle}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ExtendedTooltipUI = ({ react }) => {

    const [translations, setTranslations] = react.useState({});
    useDataUpdate(react, 'extendedTooltip.translations', setTranslations);

    const [disableMod, setDisableMod] = react.useState(false);
    const [useOnPressOnly, setUseOnPressOnly] = react.useState(false);
    useDataUpdate(react, 'extendedTooltip.disableMod', setDisableMod);
    useDataUpdate(react, 'extendedTooltip.useOnPressOnly', setUseOnPressOnly);

    const [showCitizenGroup, setShowCitizenGroup] = react.useState(true);
    const [expandCitizenCroup, setExpandCitizenGroup] = react.useState(true);
    const [showCitizenStateTooltip, setShowCitizenStateTooltip] = react.useState(true);
    const [showCitizenHappinessTooltip, setShowCitizenHappinessTooltip] = react.useState(true);
    const [showCitizenEducationTooltip, setShowCitizenEducationTooltip] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.citizen', setShowCitizenGroup);
    useDataUpdate(react, 'extendedTooltip.expandCitizen', setExpandCitizenGroup);
    useDataUpdate(react, 'extendedTooltip.citizenState', setShowCitizenStateTooltip);
    useDataUpdate(react, 'extendedTooltip.citizenHappiness', setShowCitizenHappinessTooltip);
    useDataUpdate(react, 'extendedTooltip.citizenEducation', setShowCitizenEducationTooltip);

    const [showCompanyGroup, setShowCompanyGroup] = react.useState(true);
    const [expandCompanyGroup, setExpandCompanyGroup] = react.useState(true);
    const [showCompanyOutput, setShowCompanyOutput] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.company', setShowCompanyGroup);
    useDataUpdate(react, 'extendedTooltip.expandCompany', setExpandCompanyGroup);
    useDataUpdate(react, 'extendedTooltip.companyOutput', setShowCompanyOutput);

    const [showEfficiencyGroup, setShowEfficiencyGroup] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.efficiency', setShowEfficiencyGroup);

    const [showEmployeeGroup, setShowEmployeeGroup] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.employee', setShowEmployeeGroup);

    const [showParkGroup, setShowParkGroup] = react.useState(true);
    const [expandParkGroup, setExpandParkGroup] = react.useState(true);
    const [showParkMaintenance, setShowParkMaintenance] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.park', setShowParkGroup);
    useDataUpdate(react, 'extendedTooltip.expandPark', setExpandParkGroup);
    useDataUpdate(react, 'extendedTooltip.parkMaintenance', setShowParkMaintenance);

    const [showParkingGroup, setShowParkingGroup] = react.useState(true);
    const [expandParkingGroup, setExpandParkingGroup] = react.useState(true);
    const [showParkingFees, setShowParkingFees] = react.useState(true);
    const [showParkingCapacity, setShowParkingCapacity] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.parkingFacility', setShowParkingGroup);
    useDataUpdate(react, 'extendedTooltip.expandParking', setExpandParkingGroup);
    useDataUpdate(react, 'extendedTooltip.parkingFees', setShowParkingFees);
    useDataUpdate(react, 'extendedTooltip.parkingCapacity', setShowParkingCapacity);

    const [showPublicTransportationGroup, setShowPublicTransportationGroup] = react.useState(true);
    const [expandPublicTransportationGroup, setExpandPublicTransportationGroup] = react.useState(true);
    const [showPublicTransportationWaitingPassengers, setShowPublicTransportationWaitingPassengers] = react.useState(true);
    const [showPublicTransportationWaitingTime, setShowPublicTransportationWaitingTime] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.publicTransport', setShowPublicTransportationGroup);
    useDataUpdate(react, 'extendedTooltip.expandPublicTransport', setExpandPublicTransportationGroup);
    useDataUpdate(react, 'extendedTooltip.publicTransportWaitingPassengers', setShowPublicTransportationWaitingPassengers);
    useDataUpdate(react, 'extendedTooltip.publicTransportWaitingTime', setShowPublicTransportationWaitingTime);

    const [showRoadGroup, setShowRoadGroup] = react.useState(true);
    const [expandRoadGroup, setExpandRoadGroup] = react.useState(true);
    const [showRoadLength, setShowRoadLength] = react.useState(true);
    const [showRoadUpkeep, setShowRoadUpkeep] = react.useState(true);
    const [showRoadCondition, setShowRoadCondition] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.road', setShowRoadGroup);
    useDataUpdate(react, 'extendedTooltip.expandRoad', setExpandRoadGroup);
    useDataUpdate(react, 'extendedTooltip.roadLength', setShowRoadLength);
    useDataUpdate(react, 'extendedTooltip.roadUpkeep', setShowRoadUpkeep);
    useDataUpdate(react, 'extendedTooltip.roadCondition', setShowRoadCondition);

    const [showSchoolGroup, setShowSchoolGroup] = react.useState(true);
    const [expandSchoolGroup, setExpandSchoolGroup] = react.useState(true);
    const [showSchoolStudentCapacity, setShowSchoolStudentCapacity] = react.useState(true);
    const [showSchoolStudentCount, setShowSchoolStudentCount] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.school', setShowSchoolGroup);
    useDataUpdate(react, 'extendedTooltip.expandSchool', setExpandSchoolGroup);
    useDataUpdate(react, 'extendedTooltip.schoolStudentCapacity', setShowSchoolStudentCapacity);
    useDataUpdate(react, 'extendedTooltip.schoolStudentCount', setShowSchoolStudentCount);

    const [showSpawnableGroup, setShowSpawnableGroup] = react.useState(true);
    const [expandSpawnableGroup, setExpandSpawnableGroup] = react.useState(true);
    const [showSpawnableLevel, setShowSpawnableLevel] = react.useState(true);
    const [showSpawnableLevelDetails, setShowSpawnableLevelDetails] = react.useState(true);
    const [showSpawnableHousehold, setShowSpawnableHousehold] = react.useState(true);
    const [showSpawnableHouseholdDetails, setShowSpawnableHouseholdDetails] = react.useState(true);
    const [showSpawnableRent, setShowSpawnableRent] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.spawnable', setShowSpawnableGroup);
    useDataUpdate(react, 'extendedTooltip.expandSpawnable', setExpandSpawnableGroup);
    useDataUpdate(react, 'extendedTooltip.spawnableLevel', setShowSpawnableLevel);
    useDataUpdate(react, 'extendedTooltip.spawnableLevelDetails', setShowSpawnableLevelDetails);
    useDataUpdate(react, 'extendedTooltip.spawnableHousehold', setShowSpawnableHousehold);
    useDataUpdate(react, 'extendedTooltip.spawnableHouseholdDetails', setShowSpawnableHouseholdDetails);
    useDataUpdate(react, 'extendedTooltip.spawnableRent', setShowSpawnableRent);

    const [showVehiclesGroup, setShowVehiclesGroup] = react.useState(true);
    const [expandVehiclesGroup, setExpandVehiclesGroup] = react.useState(true);
    const [showVehiclePassengerDetails, setShowVehiclePassengerDetails] = react.useState(true);
    useDataUpdate(react, 'extendedTooltip.vehicle', setShowVehiclesGroup);
    useDataUpdate(react, 'extendedTooltip.expandVehicle', setExpandVehiclesGroup);
    useDataUpdate(react, 'extendedTooltip.vehiclePassengerDetails', setShowVehiclePassengerDetails);

    const generalSettingsData = [
        { id: 90, label: translations['disableMod'], description: translations['disableMod.description'], isChecked: disableMod },
        { id: 91, label: translations['useOnPressOnly'], description: translations['useOnPressOnly.description'], isChecked: useOnPressOnly },
    ]

    const tooltipsSettingsData = [
        {
            id: 0, label: translations['citizen'], isChecked: showCitizenGroup, expanded: expandCitizenCroup,
            children: [
                { id: 1, label: translations['citizenState'], isChecked: showCitizenStateTooltip },
                { id: 2, label: translations['citizenHappiness'], isChecked: showCitizenHappinessTooltip },
                { id: 3, label: translations['citizenEducation'], isChecked: showCitizenEducationTooltip },
            ]
        }, 
        {
            id: 4, label: translations['company'], isChecked: showCompanyGroup, expanded: expandCompanyGroup,
            children: [
                { id: 5, label: translations['companyOutput'], isChecked: showCompanyOutput },
            ],
        },
        { id: 6, label: translations['efficiency'], isChecked: showEfficiencyGroup, children: [] },
        { id: 7, label: translations['employee'], isChecked: showEmployeeGroup, children: [] },
        {
            id: 8, label: translations['parkingFacility'], isChecked: showParkingGroup, expanded: expandParkingGroup,
            children: [
                { id: 9, label: translations['parkingFees'], isChecked: showParkingFees },
                { id: 10, label: translations['parkingCapacity'], isChecked: showParkingCapacity },
            ],
        },
        {
            id: 11, label: translations['park'], isChecked: showParkGroup, expanded: expandParkGroup,
            children: [
                { id: 12, label: translations['parkMaintenance'], isChecked: showParkMaintenance },
            ]
        },
        {
            id: 13, label: translations['publicTransport'], isChecked: showPublicTransportationGroup, expanded: expandPublicTransportationGroup,
            children: [
                { id: 14, label: translations['publicTransportWaitingPassengers'], isChecked: showPublicTransportationWaitingPassengers },
                { id: 15, label: translations['publicTransportWaitingTime'], isChecked: showPublicTransportationWaitingTime },
            ]
        },
        {
            id: 16, label: translations['road'], isChecked: showRoadGroup, expanded: expandRoadGroup,
            children: [
                { id: 17, label: translations['roadLength'], isChecked: showRoadLength },
                { id: 18, label: translations['roadUpkeep'], isChecked: showRoadUpkeep },
                { id: 19, label: translations['roadCondition'], isChecked: showRoadCondition },
            ]
        },
        {
            id: 20, label: translations['school'], isChecked: showSchoolGroup, expanded: expandSchoolGroup,
            children: [
                { id: 21, label: translations['schoolStudentCapacity'], isChecked: showSchoolStudentCapacity },
                { id: 22, label: translations['schoolStudentCount'], isChecked: showSchoolStudentCount },
            ]
        },
        {
            id: 23, label: translations['spawnable'], isChecked: showSpawnableGroup, expanded: expandSpawnableGroup,
            children: [
                { id: 24, label: translations['spawnableLevel'], isChecked: showSpawnableLevel },
                { id: 25, label: translations['spawnableLevelDetails'], isChecked: showSpawnableLevelDetails },
                { id: 26, label: translations['spawnableHousehold'], isChecked: showSpawnableHousehold },
                { id: 27, label: translations['spawnableHouseholdDetails'], isChecked: showSpawnableHouseholdDetails },
                { id: 28, label: translations['spawnableRent'], isChecked: showSpawnableRent },
            ]
        },
        {
            id: 29, label: translations['vehicle'], isChecked: showVehiclesGroup, expanded: expandVehiclesGroup,
            children: [
                { id: 30, label: translations['vehiclePassengerDetail'], isChecked: showVehiclePassengerDetails }
            ]
        },
    ];

    const Setting = ({ setting, nested }) => {
        const { label, description, isChecked, expanded, children } = setting;
        const checked_class = isChecked ? styles.CLASS_CHECKED : styles.CLASS_UNCHECKED

        const onToggle = () => {
            engine.trigger("extendedTooltip.onToggle", setting.id);
        }

        const onExpand = () => {
            engine.trigger("extendedTooltip.onExpand", setting.id);
        }

        const onExpandAction = children && children.length > 0 ? onExpand : null;
        const nestingStyle = { '--nesting': nested };
        const headerContentStyle = {marginTop: '-1rem'};
        const decsriptionStyle = { fontSize: 'var(--fontSizeXS)' };
        const borderColor = isChecked ? 'rgba(134, 205, 144, 1.000000)' : 'rgba(134, 205, 144, 0.250000)';
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
            <div className={styles.many(styles.CLASS_TT_FOLDOUT, styles.CLASS_TT_DISABLE_MOUSE_STATES)} style={nestingStyle}>
                <div className={styles.many(styles.CLASS_TT_HEADER, styles.CLASS_TT_ITEMMOUSESTATES, styles.CLASS_TT_ITEM_FOCUSED)}>
                    <div className={styles.CLASS_TT_ICON} onClick={onToggle}>
                        <div className={styles.many(styles.CLASS_TT_CHILD_TOGGLE, styles.CLASS_TT_ITEMMOUSESTATES, checked_class)} style={borderStyle}>
                            <div className={styles.many(styles.CLASS_TT_CHECKMARK, checked_class)}></div>
                        </div>
                    </div>
                    <div className={styles.CLASS_TT_HEADER_CONTENT} style={headerContentStyle} onClick={onExpandAction}>
                        <div className={styles.CLASS_TT_LABEL}>{label}</div>
                        {description && <div style={decsriptionStyle}>{description}</div>}
                    </div>
                    {children && children.length > 0 && <div class="tinted-icon_iKo toggle_RV4 toggle_yQv" style={maskImageStyle} onClick={onExpandAction}></div>}
                </div>
                {renderChildren()}
            </div>
        );
    }

    const SettingsList = ({ name, settings }) => {
        return (
            <div class="statistics-category-item_qVI">
                <div class="header_Ld7">{name}</div>
                <div class="items_AIY">
                    {settings.map((setting) => (
                        <Setting
                            key={setting.id}
                            nested={0}
                            setting={setting}
                        />
                    ))}
                </div>
            </div>
        );
    };

    return <$Panel title="Extended Tooltip" react={react}>
        <SettingsList name="General" settings={generalSettingsData} />
        <SettingsList name="Tooltips" settings={tooltipsSettingsData} />
    </$Panel>
};

window._$hookui.registerPanel({
    id: '89pleasure.extendedTooltip',
    name: 'ExtendedTooltip',
    icon: 'Media/Game/Icons/Journal.svg',
    component: ExtendedTooltipUI
})