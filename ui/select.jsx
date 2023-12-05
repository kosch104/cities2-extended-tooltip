import React from 'react'
import ReactDOM from 'react-dom';

const $Select = ({ react, style, event, selected, children }) => {
    const [active, setActive] = react.useState(false);
    const [portalContainer, setPortalContainer] = react.useState(null);
    const pickerRef = react.useRef(null); // Ref to attach to the select field
    const dropdownRef = react.useRef(null); // Ref for the dropdown content


    // Function to check if the click is outside the dropdown
    const handleClickOutside = (event) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target) &&
            dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setActive(false);
        }
    };

    react.useEffect(() => {
        // Create a single container for the portal if not already created
        if (!document.getElementById('select-portal')) {
            const container = document.createElement('div');
            container.id = 'select-portal';
            document.body.appendChild(container);
            setPortalContainer(container);
        } else {
            setPortalContainer(document.getElementById('select-portal'));
        }

        // Add event listener to close the dropdown when clicking outside
        document.addEventListener('click', handleClickOutside, true);

        // Cleanup the event listener
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    react.useEffect(() => {
        // Toggle the click listener based on dropdown state
        if (active) {
            document.addEventListener('click', handleClickOutside, true);
        } else {
            document.removeEventListener('click', handleClickOutside, true);
        }
    }, [active]);

    const getDropdownPosition = () => {
        if (pickerRef.current) {
            const rect = pickerRef.current.getBoundingClientRect();
            return {
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width
            };
        }
        return {};
    };

    const onToggle = () => {
        setActive(!active);
    };

    const onSelectionChanged = (val) => {
        engine.trigger(event, val);
    };

    // Define the dropdown content
    const dropdownContent = active ? (
        <div ref={dropdownRef} style={{
            display: 'flex',
            position: 'absolute',
            ...getDropdownPosition(),
            zIndex: 9999
        }}>
            <div className="dropdown-popup_mMv" style={{ maxWidth: 'inherit', 'width': '100%' }}>
                <div className="dropdown-menu_jf2 dropdown-menu_Swd">
                    {
                        children.map((child) => (
                            <button key={child.id} className="dropdown-item_sZT selected" style={{ padding: '5rem', height: 'auto' }} onClick={() => onSelectionChanged(child.value)}>{child.label}</button>
                        ))
                    }
                </div>
            </div>
        </div>
    ) : null;

    return (<div style={{ width: '100%' }}>
        <div ref={pickerRef} className="dropdown-toggle_V9z dropdown-toggle_prl value-field_yJi value_PW_ dropdown_pJu item-states_QjV" onClick={onToggle} style={{ padding: '5rem', height: 'auto', ...style }}>
            <div className="label_l_4">{children[selected].label}</div>
            <div className="tinted-icon_iKo indicator_Xmj" style={{ maskImage: 'url(Media/Glyphs/StrokeArrowDown.svg)' }}></div>
            {portalContainer && dropdownContent && ReactDOM.createPortal(dropdownContent, portalContainer)}
        </div>
    </div>);
}

export default $Select