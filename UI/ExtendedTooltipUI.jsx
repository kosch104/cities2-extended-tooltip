import React from 'react';
import { $Panel } from 'hookui-framework'
import { useDataUpdate } from 'hookui-framework'
import { $Field } from 'hookui-framework'

const citizenTooltipData = [
    {
        id: 1,
        label: "Extended Citizen (On/Off)",
        isChecked: true,
        children: [
            { id: 2, label: "State", isChecked: true },
            { id: 3, label: "Happiness", isChecked: true },
            { id: 4, label: "Education", isChecked: true },
        ],
    },
];

const TooltipOption = ({ label, isChecked, onToggle }) => {
    return <$Field label={label} checked={isChecked} onToggle={onToggle} />;
};

const ExtendedTooltipUI = ({ react }) => {
    const [tooltipsData, setTooltipsData] = react.useState(citizenTooltipData);

    const handleOptionsUpdate = (id, isParent) => {
        const updatedOptions = tooltipsData.map((tooltip) =>
            tooltip.id === id
                ? isParent
                    ? { ...tooltip, isChecked: !tooltip.isChecked }
                    : { ...tooltip }
                : tooltip.children
                    ? {
                        ...tooltip,
                        children: tooltip.children.map((child) =>
                            child.id === id ? { ...child, isChecked: !child.isChecked } : child
                        ),
                    }
                    : { ...tooltip }
        );
        setTooltipsData(updatedOptions);
    };

    useDataUpdate(react, "extendedTooltip.extendedTooltipOptions", (data) => {
        console.log(data)
        setTooltipsData(data)
    });

    const options = tooltipsData.map((tooltip) => {
        return (
            <div key={tooltip.id}>
                <TooltipOption
                    key={tooltip.id}
                    label={tooltip.label}
                    isChecked={tooltip.isChecked}
                    onToggle={() => handleOptionsUpdate(tooltip.id, true)}
                />
                {tooltip.children && tooltip.isChecked && tooltip.children.map((child) => (
                <div key={child.id} style={{ marginLeft: '20px' }}>
                    <TooltipOption
                        key={child.id}
                        label={child.label}
                        isChecked={child.isChecked}
                        onToggle={() => handleOptionsUpdate(child.id, false)}
                    />
                </div>
                ))}
            </div>
        );
    });

    return (
        <div>
            <$Panel title="Extended Tooltip" react={react}>
                {options}
                <pre>{JSON.stringify(tooltipsData, null, 2)}</pre>
            </$Panel>
        </div>
    );
};

window._$hookui.registerPanel({
    id: "89pleasure.extendedTooltip",
    name: "ExtendedTooltip",
    icon: "Media/Game/Icons/Journal.svg",
    component: ExtendedTooltipUI
})