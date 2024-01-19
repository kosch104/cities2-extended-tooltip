import React from "react";
// import Example from "./example.jsx";
import TabSettings from "./_tab_settings.jsx";
import About from "./_about.jsx";
import "./styles.jsx";

const ExtendedTooltipButton = ({ react, setupController }) => {
    const [tooltipVisible, setTooltipVisible] = react.useState(false);

    const onMouseEnter = () => {
        setTooltipVisible(true);
        engine.trigger("audio.playSound", "hover-item", 1);
    };

    const onMouseLeave = () => {
        setTooltipVisible(false);
    };

    const { ToolTip, ToolTipContent, Icon } = window.$_gooee.framework;

    const { model, update } = setupController();

    const onClick = () => {
        const newValue = !model.IsVisible;
        update("IsVisible", newValue);
        engine.trigger("audio.playSound", "select-item", 1);

        if (newValue) {
            engine.trigger("audio.playSound", "open-panel", 1);
            engine.trigger("tool.selectTool", null);
        }
        else
            engine.trigger("audio.playSound", "close-panel", 1);
    };

    const description = `Open the ExtendedTooltip v${model.Version} panel.`;

    return <>
        <div className="spacer_oEi"></div>
        <button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} class="button_s2g button_ECf item_It6 item-mouse-states_Fmi item-selected_tAM item-focused_FuT button_s2g button_ECf item_It6 item-mouse-states_Fmi item-selected_tAM item-focused_FuT toggle-states_X82 toggle-states_DTm">
            <svg className="icon" viewBox="0 0 24 24" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns: dc="http://purl.org/dc/elements/1.1/">
                <g transform="translate(0 -1028.4)">
                    <path d="m22 1030.4c1.105 0 2 0.9 2 2v3 2 3c0 1.1-0.895 2-2 2v4l-4.875-4h-2.125-6c-1.1046 0-2-0.9-2-2v-3-2-3c0-1.1 0.8954-2 2-2h6 1 6z" fill="#2980b9" />
                    <path d="m22 1029.4c1.105 0 2 0.9 2 2v3 2 3c0 1.1-0.895 2-2 2v4l-4.875-4h-2.125-6c-1.1046 0-2-0.9-2-2v-3-2-3c0-1.1 0.8954-2 2-2h6 1 6z" fill="#3498db" />
                    <path d="m2 1036.4c-1.1046 0-2 0.9-2 2v3 2 3c0 1.1 0.89543 2 2 2v4l4.875-4h2.125 6c1.105 0 2-0.9 2-2v-3-2-3c0-1.1-0.895-2-2-2h-6-1-6z" fill="#27ae60" />
                    <path d="m2 1035.4c-1.1046 0-2 0.9-2 2v3 2 3c0 1.1 0.89543 2 2 2v4l4.875-4h2.125 6c1.105 0 2-0.9 2-2v-3-2-3c0-1.1-0.895-2-2-2h-6-1-6z" fill="#2ecc71" />
                    <path d="m6 13c0 0.552-0.4477 1-1 1s-1-0.448-1-1 0.4477-1 1-1 1 0.448 1 1z" transform="matrix(1.5 0 0 1.5 -3 1023.4)" fill="#27ae60" />
                    <path d="m6 13c0 0.552-0.4477 1-1 1s-1-0.448-1-1 0.4477-1 1-1 1 0.448 1 1z" transform="matrix(1.5 0 0 1.5 -3 1022.4)" fill="#ecf0f1" />
                    <path d="m6 13c0 0.552-0.4477 1-1 1s-1-0.448-1-1 0.4477-1 1-1 1 0.448 1 1z" transform="matrix(1.5 0 0 1.5 1 1023.4)" fill="#27ae60" />
                    <path d="m6 13c0 0.552-0.4477 1-1 1s-1-0.448-1-1 0.4477-1 1-1 1 0.448 1 1z" transform="matrix(1.5 0 0 1.5 1 1022.4)" fill="#ecf0f1" />
                    <path d="m6 13c0 0.552-0.4477 1-1 1s-1-0.448-1-1 0.4477-1 1-1 1 0.448 1 1z" transform="matrix(1.5 0 0 1.5 5 1023.4)" fill="#27ae60" />
                    <path d="m6 13c0 0.552-0.4477 1-1 1s-1-0.448-1-1 0.4477-1 1-1 1 0.448 1 1z" transform="matrix(1.5 0 0 1.5 5 1022.4)" fill="#ecf0f1" />
                </g>
            </svg>
            <ToolTip visible={tooltipVisible} float="up" align="right">
                <ToolTipContent title="Extended Tooltip" description={description} />
            </ToolTip>
        </button>
    </>;
};
window.$_gooee.register("extendedtooltip", "ExtendedTooltipIconButton", ExtendedTooltipButton, "bottom-right-toolbar", "extendedtooltip");

const ExtendedTooltipContainer = ({ react, setupController }) => {
    const { TabModal } = window.$_gooee.framework;
    const { model, update, trigger } = setupController();

    if (model.Translations === undefined || model.DisplayModeDelay === undefined) {
        return <div></div>;
    };
    const translations = model.Translations;

    const tabs = [
        {
            name: "SETTINGS",
            label: <div>{translations.uiTabSettings}</div>,
            content: <TabSettings react={react} model={model} update={update} trigger={trigger} />
        },
        {
            name: "ABOUT",
            label: <div>{translations.uiTabAbout}</div>,
            content: <About react={react} model={model} update={update} />
        }
    ];

    const closeModal = () => {
        update("IsVisible", false);
        engine.trigger("audio.playSound", "close-panel", 1);
    };

    return model.IsVisible ? <TabModal fixed size="xl" title="Extended Tooltip" tabs={tabs} onClose={closeModal} /> : null;
};
window.$_gooee.register("extendedtooltip", "ExtendedTooltipContainer", ExtendedTooltipContainer, "main-container", "extendedtooltip");

/*
const ExtendedTooltipExampleButton = ({ react, setupController }) => {
    const [tooltipVisible, setTooltipVisible] = react.useState(false);
    const onMouseEnter = () => {
        setTooltipVisible(true);
        engine.trigger("audio.playSound", "hover-item", 1);
    };

    const onMouseLeave = () => {
        setTooltipVisible(false);
    };

    const { ToolTip, ToolTipContent } = window.$_gooee.framework;
    const { model, update } = setupController();
    const onClick = () => {
        const newValue = !model.ShowExample;
        update("ShowExample", newValue);
        engine.trigger("audio.playSound", "select-item", 1);

        if (newValue) {
            engine.trigger("audio.playSound", "open-panel", 1);
            engine.trigger("tool.selectTool", null);
        }
        else
            engine.trigger("audio.playSound", "close-panel", 1);
    };
    return <>
        <div className="spacer_oEi"></div>
        <button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} class="button_s2g button_ECf item_It6 item-mouse-states_Fmi item-selected_tAM item-focused_FuT button_s2g button_ECf item_It6 item-mouse-states_Fmi item-selected_tAM item-focused_FuT toggle-states_X82 toggle-states_DTm">
            <div className="fa fa-solid-toolbox icon-lg"></div>
            <ToolTip visible={tooltipVisible} float="up" align="right">
                <ToolTipContent title="ExtendedTooltip" description="Open the ExtendedTooltip modal to adjust the mod settings." />
            </ToolTip>
        </button>
    </>;
};
window.$_gooee.register("extendedtooltip", "ExtendedTooltipExampleButton", ExtendedTooltipExampleButton, "bottom-right-toolbar", "extendedtooltip");
window.$_gooee.register("extendedTooltip", "Example", Example, "main-container", "extendedtooltip");
*/