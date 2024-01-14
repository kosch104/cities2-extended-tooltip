import React from 'react';
function EtSettingsBox({ icon, title, description, children }) {

    const { Icon } = window.$_gooee.framework;

    return <div className={settingsBoxContainer}>
        <div class="p-4">
            <div className="d-flex flex-row align-items-end w-x mb-1">
                {icon != undefined &&<Icon className="align-self-flex-start icon-md mr-2" icon={icon} />}
                <h4>{title}</h4>
            </div>
            {description != undefined && <p className="text-muted mb-2">{description}</p>}
            {children}
        </div>
    </div>;
};

export default EtSettingsBox;