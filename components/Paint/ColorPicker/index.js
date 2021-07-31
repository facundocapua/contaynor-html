import {useEffect, useRef, useState} from "react";
import styles from './ColorPicker.module.css'

const ColorPicker = ({colors, onChangeColor}) => {
    const container = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);

    const handleContextMenu = e => {
        e.preventDefault()
        setPosY(e.clientY - 10)
        setPosX(e.clientX - 10)
        setIsVisible(true)
    }

    const hideColorPicker = e => {
        setIsVisible(false)
    }

    useEffect(() => {
        document.addEventListener('contextmenu', handleContextMenu)

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu)
        }
    }, [])

    useEffect(() => {
        if (isVisible) {
            document.addEventListener('click', hideColorPicker)
        }

        return () => {
            document.removeEventListener('click', hideColorPicker);
        }
    });

    useEffect(() => {
        if (isVisible) {
            container.current.style.display = 'flex';
            setTimeout(() => {
                container.current.style.opacity = '1';
            }, 10);
        } else {
            container.current.style.opacity = '0';
            setTimeout(() => {
                container.current.style.display = 'none';
            }, 1000);
        }
    }, [isVisible]);

    return (
        <ul ref={container} className={styles.colorPicker}
            style={{
                top: posY,
                left: posX,
            }}
            onMouseLeave={hideColorPicker}
        >
            {colors.map(color => (
                <li>
                    <div className={styles[color]} onClick={e => onChangeColor(color)}></div>
                </li>
            ))}
        </ul>
    )
}


export default ColorPicker