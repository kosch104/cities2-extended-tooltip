import React from "react";
import Example from "./example.jsx";
import Changelog from "./components/changelog.jsx";
import TabSettings from "./_tab_settings.jsx";
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
            <Icon className="icon-lg" icon="coui://GameUI/Media/Game/Notifications/LeveledUp.svg"></Icon>
            <ToolTip visible={tooltipVisible} float="up" align="right">
                <ToolTipContent title="Extended Tooltip" description={description} />
            </ToolTip>
        </button>
    </>;
};
window.$_gooee.register("extendedtooltip", "ExtendedTooltipIconButton", ExtendedTooltipButton, "bottom-right-toolbar", "extendedtooltip");

const ExtendedTooltipContainer = ({ react, setupController }) => {
    const { Grid, TabModal, Scrollable } = window.$_gooee.framework;
    const { model, update } = setupController();

    const tabs = [
        {
            name: "SETTINGS",
            label: <div>Settings</div>,
            content: <TabSettings react={react} controller={setupController} />
        },
        {
            name: "WHATSNEW",
            label: <div className="d-flex flex-row w-x">
                <div className="align-self-flex-start icon-sm fa fa-solid-stop mr-2"></div>
                <div className="flex-1 w-x">What's new!</div>
            </div>,
            content: <div>
                <Grid className="h-100" auto>
                    <div>
                        <h2 className="text-primary mb-2">What's new!</h2>
                        <div className="bg-black-trans-less-faded rounded-sm">
                            <div className="p-4">
                                <p className="mb-2">Welcome to ExtendedTooltip!</p>
                                <p>This mod is developed by Cities2Modding community.</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-muted mb-2">Changelog</h2>
                        <div>
                            <p>These are the last updates of ExtendedTooltip. You can always see more under:</p>
                        </div>
                        <div className="bg-black-trans-less-faded rounded-sm flex-1">
                            <Scrollable>
                                <div className="p-4">
                                    <Changelog/>
                                </div>
                            </Scrollable>
                        </div>
                    </div>
                </Grid>
            </div>
        },  {
            name: "ABOUT",
            label: <div>About</div>,
            content: <div>Test</div>
        }];

    const closeModal = () => {
        update("IsVisible", false);
        engine.trigger("audio.playSound", "close-panel", 1);
    };

    return model.IsVisible ? <TabModal fixed size="xl" title="Extended Tooltip" tabs={tabs} onClose={closeModal} /> : null;
};
window.$_gooee.register("extendedtooltip", "ExtendedTooltipContainer", ExtendedTooltipContainer, "main-container", "extendedtooltip");

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