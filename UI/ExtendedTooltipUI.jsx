import React from 'react';
import { $Panel } from 'hookui-framework'
import { useDataUpdate } from 'hookui-framework'
import { $Field } from 'hookui-framework'

const TooltipOption = ({ label, isChecked, onToggle }) => {
    return <$Field label={label} checked={isChecked} onToggle={onToggle} />;
};

const testTooltipsData = [
    { id: 1, label: "Tooltip 1", isChecked: true, parentId: -1 },
    { id: 2, label: "Tooltip 2", isChecked: false, parentId: 0 },
    { id: 3, label: "Tooltip 3", isChecked: false, parentId: 0 },
    { id: 4, label: "Tooltip 4", isChecked: false, parentId: 0 },
];

const ExtendedTooltipUI = ({ react }) => {

    const [tooltipsData, setTooltipsData] = react.useState(testTooltipsData);

    /*useDataUpdate(react, "extendedTooltip.extendedTooltipOptions", (data) => {
        setTooltipsData(data.map(({ __Type, ...rest }) => rest));
    });*/

    const options = tooltipsData.map((tooltip) => (
        <TooltipOption
            key={tooltip.id}
            label={tooltip.label}
            isChecked={tooltip.isChecked}
            onToggle={() => engine.trigger("extendedTooltip.onToggle", tooltip.id)}
        />
    ));

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