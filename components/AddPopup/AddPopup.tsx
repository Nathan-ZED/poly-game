import type { NextPage } from 'next'
import styles from '../../styles/AddPopup/AddPopup.module.css'
import Background from "../SearchGame/Background/Background";
import {motion} from "framer-motion";
import ColorPicker from "./ColorPicker/ColorPicker";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import AppContext from "../../context/AppContext";

type Props = {
    show: Function,
    setColumns: Function,
    visible: boolean,
    columns: any,
}

const colors = [
    '#f5f8f9',
    '#E8637A',
    '#EF7C34',
    '#F2AB3C',
    '#F9D146',
    '#B7E249',
    '#66D686',
    '#60D0C7',
    '#72D8F9',
    '#2167F1',
    '#605DF0',
    '#9350DC',
    '#EE82F8',
    '#EB5BA4',
    '#F098AF',
    '#5F7893',
];

const AddPopup: NextPage<Props> = (props: Props) => {

    const [bgColor, setBgColor] = useState('#72D8F9')
    const [colName, setColName] = useState('')
    const [icon, setIcon] = useState('fa-brands fa-playstation')

    const context: any = useContext(AppContext)
    const {visible, show, columns, setColumns} = props;
    const bg = {
        background: bgColor
    }

    const addNewColumn = () => {
        show(false)
        const colCopy: any = [...columns]
        const newID = colCopy.length + 1
        const newColumn = {
            id: newID,
            icon: icon,
            name: colName,
            color: bgColor,
            games: []
        }
        colCopy.unshift(newColumn)
        setColumns(colCopy)
    }

        return (
            visible ?
                <Background show={props.show}
                            bgClass={styles.bg}>
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        variants={context.dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={styles.input}>
                        <article className={styles.addPopup}>
                            <div className={styles.topPopup}>
                                <h3>New List</h3>
                                <button onClick={() => show(false)}
                                        className={styles.closeBtn}>
                                    <i className="fa-solid fa-circle-xmark"></i>
                                </button>
                            </div>
                            <div style={bg}
                                 className={styles.setName}>
                                <select onChange={(e: ChangeEvent<HTMLSelectElement>) => setIcon(e.value)}
                                        className={styles.selectIcon}>
                                    <option selected={true}
                                            value="fa-brands fa-playstation">
                                        &#xf3df;
                                    </option>
                                    <option value="fa-solid fa-desktop">
                                        &#xf390;
                                    </option>
                                </select>
                                <input
                                    className={styles.text}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setColName(e.target.value)}
                                    type='text'
                                    placeholder='PS5'/>
                            </div>
                            <div className={styles.colorWrapper}>
                                <div>
                                    {colors.map((color, i) => (
                                        <ColorPicker
                                            changeColor={setBgColor}
                                            key={i}
                                            bg={color}/>
                                    ))}
                                </div>
                                <button
                                    onClick={() => addNewColumn()}
                                    className={styles.addBtn}>Confirm
                                </button>
                            </div>
                        </article>
                    </motion.div>
                </Background>
                : null
        )
    }

export default AddPopup
