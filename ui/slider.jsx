import React from 'react';

const $Slider = ({ react, value, min, max, event, unit }) => {
    const valuePercent = (value * 100) / max;
    const [sliderValue, setSliderValue] = react.useState(valuePercent); // Initial slider value

    const handleSliderChange = (event) => {
        const newValue = Math.min(100, Math.max(0, event.clientX / window.innerWidth * 100)); // Adjust based on your layout
        setSliderValue(newValue);
    };

    return (
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: '10rem', marginTop: '0' }} onMouseMove={handleSliderChange}>
                <div className="value_jjh" style={{ display: 'flex', width: '45rem', alignItems: 'center', justifyContent: 'center' }}>{sliderValue} {unit}</div>
                <div
                    className="slider_fKm slider_pUS horizontal slider_KjX"
                    style={{
                        flex: 1,
                        margin: '10rem',
                    }}
                >
                    <div className="track-bounds_H8_">
                        <div className="range-bounds_lNt" style={{ width: sliderValue + '%' }}>
                            <div className="range_KXa range_iUN"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default $Slider;