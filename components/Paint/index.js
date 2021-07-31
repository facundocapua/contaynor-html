import {Fragment, useEffect, useState} from "react";
import Cell from "./Cell";
import ColorPicker from "./ColorPicker";

const colsNumber = 100;

const getCells = (height, width, isClicked, color) => {
    const squareSize = Math.floor(width / colsNumber);
    const rowsNumber = Math.floor(height / squareSize);

    let cells = []
    for (let i = 0; i < rowsNumber; i++) {
        for (let j = 0; j < colsNumber; j++) {
            cells.push(<Cell key={'cell' + i + '-' + j} size={squareSize} color={color} isClicked={isClicked}/>)
        }
    }

    return cells;
};

const colors = ['red', 'magenta', 'salmon', 'yellow', 'cyan']

const Paint = () => {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const [currentColor, setCurrentColor] = useState(colors[0]);


    const setCellInfo = () => {
        setWidth(Math.floor(window.innerWidth / colsNumber) * 100);
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        setCellInfo()

        window.addEventListener('resize', setCellInfo);
    }, [])

    const handleMouseDown = e => {
        if (e.button === 0) {
            setIsClicked(true)
        }
    }

    const handleMouseUp = e => {
        setIsClicked(false)
    }

    return (
        <Fragment>
            <ColorPicker colors={colors} onChangeColor={setCurrentColor}/>
            <div className="container" style={{width: width + 'px'}} onMouseDown={handleMouseDown}
                 onMouseUp={handleMouseUp}>
                {height > 0 && width > 0 ? getCells(height, width, isClicked, currentColor) : ''}
            </div>
        </Fragment>
    )
}

export default Paint