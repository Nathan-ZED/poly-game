import type { NextPage } from 'next'
import styles from '../../styles/AddPopup/AddPopup.module.css'
import Background from "../SearchGame/Background/Background";
import {motion} from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";

type Props = {
    bg: string,
    changeColor: Function,
}


const ColorPicker: NextPage<Props> = (props: Props) => {
    const [color, setColor] = useState('');
    const { bg, changeColor } = props;

    useEffect(() => setColor(bg), []);

    const style = {
        background: color,
        width: '20px',
        height: '20px',
        borderRadius: '4px'
    }

    return <button onClick={() => changeColor(bg)} style={style}></button>
}

export default ColorPicker
