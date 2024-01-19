import React from 'react';
import Changelog from "./components/changelog.jsx";

const About = ({ react, model, update, trigger }) => {

    const { Grid, Scrollable, Icon, Button } = window.$_gooee.framework;

    const launchGitHub = (url) => {
        engine.trigger("89pleasure_extendedtooltip.launchUrl", "https://github.com/89pleasure/cities2-extended-tooltip");
    };
    const launchDiscord = (url) => {
        engine.trigger("89pleasure_extendedtooltip.launchUrl", "https://discord.gg/KGRNBbm5Fh");
    };
    const launchReddit = (url) => {
        engine.trigger("89pleasure_extendedtooltip.launchUrl", "https://www.reddit.com/r/cities2modding");
    };
    const launchGooee = (url) => {
        engine.trigger("89pleasure_extendedtooltip.launchUrl", "https://github.com/Cities2Modding/Gooee")
    }

    return <div>
        <Grid className="h-100">
            <div className="col-6 p-4 align-items-end bg-black-trans-faded rounded-sm" style={{ justifyContent: 'space-between' }}>
                <div className="mb-3">
                    <h2 className="text-primary mb-2">Thank you!</h2>
                    <div className="bg-black-trans-less-faded rounded-sm">
                        <div className="p-4">
                            <p className="mb-3 d-flex flex-row align-items-center">
                                <strong>...for using ExtendedTooltip for your city planning!</strong>
                                <Icon className="ml-1" size="sm" icon="coui://GameUI/Media/Game/Icons/Happy.svg"></Icon>
                            </p>
                            <p className="mb-3">ExtendedTooltip is one of the first mods developed for Cities: Skylines II. The aim of the mod is to show users information that is useful and helpful in building the city as quickly and easily as possible. It displays countless information and offers extensive setting options. </p>
                            <p className="mb-3">This mod is constantly under development. If you feel that you have found a bug, have suggestions for improvement or just want to talk to us, you can reach us in our Discord linked below.</p>
                            <p>Thank you for your support!</p>
                            <p>
                                <strong>89pleasure</strong>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="my-3">
                    <h2 className="text-primary mb-2">Join the forces</h2>
                    <div className="p-4 bg-black-trans-less-faded rounded-sm">
                        <div className="d-flex flex-row justify-content-space-between" style={{ justifyContent: 'space-between' }}>
                            <Button className="d-flex flex-row align-items-center" color="primary" style="trans" onClick={() => launchDiscord()}>
                                <Icon icon="https://assets-global.website-files.com/6257adef93867e50d84d30e2/653714c1f22aef3b6921d63d_636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg" className="mr-2" />
                                <p>Join our Discord</p>
                            </Button>
                            <Button className="d-flex flex-row align-items-center" color="primary" style="trans" onClick={() => launchGitHub()}>
                                <Icon icon="https://raw.githubusercontent.com/prplx/svg-logos/master/svg/github-icon.svg" className="mr-2" />
                                <p>Code on Github</p>
                            </Button>
                            <Button className="d-flex flex-row align-items-center" color="primary" style="trans" onClick={() => launchReddit()}>
                                <Icon icon="https://www.svgrepo.com/download/14413/reddit.svg" className="mr-2" />
                                <p>Post on Reddit</p>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="my-3">
                    <h2 className="text-primary mb-2">Credits</h2>
                    <div className="bg-black-trans-less-faded rounded-sm">
                        <div className="p-4">
                            <p className="mb-3">This mod is developed with the help of the tremendous Cities2Modding community.</p>
                            <p>
                                <strong>Special thanks to: optimus-code, Rebecca and everyone I missed for their amazing help and support.</strong>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <Grid className="align-items-center">
                        <div className="col-2 fs-sm text-muted">
                            <p>Author:</p>
                            <p>Version:</p>
                            <p>License:</p>
                        </div>
                        <div className="col-2 fs-sm text-muted">
                            <p>89pleasure</p>
                            <p>v{model.Version}</p>
                            <p>GPL-2.0</p>
                        </div>
                        <div className="col-5 fs-sm text-muted">
                            <p>This mod is using the amazing Gooee UI Framework by optimus-code.</p>
                        </div>
                        <div className="col-3 fs-sm text-muted">
                            <Button style="trans" color="light" size="sm" onClick={() => launchGooee()}>Learn more</Button>
                        </div>
                    </Grid>
                </div>
            </div>
            <div className="col-6 p-4 bg-black-trans-faded rounded-sm">
                <h2 className="text-primary mb-2">Changelog</h2>
                <div className="bg-black-trans-less-faded rounded-sm flex-1">
                    <Scrollable>
                        <div className="p-4">
                            <Changelog />
                        </div>
                    </Scrollable>
                </div>
            </div>
        </Grid>
    </div>;
}

export default About;