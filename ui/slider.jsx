import React from 'react';

const $Slider = ({ value, min, max, unit }) => {
    const valuePercent = value * 100 + unit;
    return (
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: '10rem', marginTop: '0' }}>
                <div className="value_jjh" style={{ display: 'flex', width: '45rem', alignItems: 'center', justifyContent: 'center' }}>{valuePercent}</div>
                <div
                    className="slider_fKm slider_pUS horizontal slider_KjX"
                    style={{
                        flex: 1,
                        margin: '10rem',
                    }}
                >
                    <div className="track-bounds_H8_">
                        <div className="range-bounds_lNt" style={{ width: '50%' }}>
                            <div className="range_KXa range_iUN"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default $Slider;