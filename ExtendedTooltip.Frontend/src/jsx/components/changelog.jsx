import React from 'react';
// import ReactMarkdown from 'react-markdown';

function Changelog({react}) {
    const { Icon } = window.$_gooee.framework;
    return (
        <div>
            <div className="mb-2">
                <div className="d-flex flex-row w-x">
                    <Icon fa className="align-self-flex-start icon-sm mr-2" icon="solid-circle-chevron-right" />
                    <div className="flex-1 w-x">
                        <b className="mb-1">v1.2.0</b>
                    </div>
                </div>
                <ul className="fs-sm">
                    <li>Added household wealth tooltip</li>
                    <li>Added citizen wealth tooltip</li>
                    <li>Added citizen type (tourist, citizen, commuter) tooltip</li>
                    <li>Added "In stock" label to industrial/company/office storage tooltip</li>
                    <li>Added Polish language</li>
                    <li>Fixed waiting passengers tooltip on public transport stations</li>
                    <li>Only show min-max rent if they are different</li>
                    <li>Changed the layout for households</li>
                    <li>Update Korean translation (thx to @hibiyasleep)</li>
                    <li>Update Japanese translation (thx to @hibiyasleep)</li>
                    <li>Update Chinese translation (thx to @hibiyasleep)</li>
                    <li>Added translation for Anarchy Mode (thx to @hibiyasleep)</li>
                </ul>
            </div>
            <div className="mb-2">
                <div className="d-flex flex-row w-x">
                    <Icon fa className="align-self-flex-start icon-sm mr-2" icon="solid-circle-chevron-right" />
                    <div className="flex-1 w-x">
                        <b className="mb-1">v1.1.0</b>
                    </div>
                </div>
                <ul className="fs-sm">
                    <li>New Feature: Added tons (t), barrels (bbl.) and liters (l, kl) for resource tooltips</li>
                    <li>Fixed French translation (thx to @Edou24)</li>
                    <li>Requirements updated to HookUI v0.3.5</li>
                </ul>
            </div>
            <div className="mb-2">
                <div className="d-flex flex-row w-x">
                    <Icon fa className="align-self-flex-start icon-sm mr-2" icon="solid-circle-chevron-right" />
                    <div className="flex-1 w-x">
                        <b className="mb-1">v1.0.1</b>
                    </div>
                </div>
                <ul className="fs-sm">
                    <li>Fix padding of tooltip group for higher resolutions by changing the layout a bit</li>
                </ul>
            </div>
            <div className="mb-2">
                <div className="d-flex flex-row w-x">
                    <Icon fa className="align-self-flex-start icon-sm mr-2" icon="solid-circle-chevron-right" />
                    <div className="flex-1 w-x">
                        <b className="mb-1">v1.0.0</b>
                    </div>
                </div>
                <ul className="fs-sm">
                    <li>New Feature: Added an extended layout to improve tooltips readability</li>
                    <li>New Feature: Added company/industry storage info</li>
                    <li>Fixed some languages not showing</li>
                </ul>
            </div>
            <div className="mb-2">
                <div className="d-flex flex-row w-x">
                    <Icon fa className="align-self-flex-start icon-sm mr-2" icon="solid-circle-chevron-right" />
                    <div className="flex-1 w-x">
                        <b className="mb-1">v0.10.0</b>
                    </div>
                </div>
                <ul className="fs-sm">
                    <li>New Feature: Added balance info to households. Thx to @Biffa for the idea</li>
                    <li>New Feature: Added passenger info to public transport station buildings</li>
                    <li>New Feature: Added more detailed rent info to buildings with 1+ households</li>
                    <li>Fixed citizen state tooltip. Thx @Rotiti for reporting</li>
                    <li>Added color indictator to low density households. Thx @Scaristotle for reporting</li>
                </ul>
            </div>
            <div className="mb-2">
                <div className="d-flex flex-row w-x">
                    <Icon fa solid className="align-self-flex-start icon-sm mr-2" icon="solid-circle-chevron-right" />
                    <div className="flex-1 w-x">
                        <b className="mb-1">v0.9.1</b>
                    </div>
                </div>
                <ul className="fs-sm">
                    <li>Added Anarchy Mode indicator for terrain tool</li>
                </ul>
            </div>
            <div className="mb-2">
                <div className="d-flex flex-row w-x">
                    <Icon fa className="align-self-flex-start icon-sm mr-2" icon="solid-circle-chevron-right" />
                    <div className="flex-1 w-x">
                        <b className="mb-1">v0.9.0</b>
                    </div>
                </div>
                <ul className="fs-sm">
                    <li>New Feature: Anarchy Mode indicator</li>
                    <li>New Feature: Net Tool Tooltips</li>
                    <li>Shows the current net tool mode</li>
                    <li>Shows the elevation</li>
                </ul>
            </div>
        </div>
    );
}

export default Changelog;