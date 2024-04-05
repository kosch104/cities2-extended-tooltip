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
                        <b className="mb-1">v1.0.4</b>
                    </div>
                </div>
                <ul className="fs-sm">
                    <li>Proper implementation of controller model</li>
                    <li>Proper tooltip path handling fixing issues with other mods adding tooltips to the same tool</li>
                    <li>Fix verison string</li>
                </ul>
            </div>
            <div className="mb-2">
                <div className="d-flex flex-row w-x">
                    <Icon fa className="align-self-flex-start icon-sm mr-2" icon="solid-circle-chevron-right" />
                    <div className="flex-1 w-x">
                        <b className="mb-1">v1.0.3</b>
                    </div>
                </div>
                <ul className="fs-sm">
                    <li>Adds support for patch v1.1.1f</li>
                </ul>
            </div>
            <div className="mb-2">
                <div className="d-flex flex-row w-x">
                    <Icon fa className="align-self-flex-start icon-sm mr-2" icon="solid-circle-chevron-right" />
                    <div className="flex-1 w-x">
                        <b className="mb-1">v1.0.2</b>
                    </div>
                </div>
                <ul className="fs-sm">
                    <li>Adds support for patch v1.1.1f</li>
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
                    <li>Fix bulldozer issue which crashes the game.</li>
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
                    <li>Hello PDXMods! Initial release.</li>
                </ul>
            </div>
        </div>
    );
}

export default Changelog;