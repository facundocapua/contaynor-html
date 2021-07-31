import {useCallback, useEffect, useState} from "react";

const Cell = ({size, isClicked, color}) => {
    const [painted, setPainted] = useState(false);
    const [paintColor, setPaintColor] = useState(color);

    const handleToggle = e => {
        if (e.button === 0) {
            setPainted(!painted);
        }
    }

    const handleMouseOver = useCallback(e => {
        if (isClicked) {
            setPainted(true)
        }
    }, [isClicked]);

    useEffect(() => {
        if (!painted) {
            setPaintColor(color)
        }
    }, [color]);

    return (
        <div
            className="cell"
            style={{width: size + 'px', height: size + 'px', backgroundColor: painted ? paintColor : ''}}
            onMouseDown={handleToggle}
            onMouseOver={handleMouseOver}
        ></div>
    )
}

export default Cell