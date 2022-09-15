import type { NextPage } from 'next'
import styles from '../../../styles/Column/ColumnHead/ColumnHead.module.css'
import '@fortawesome/fontawesome-free/css/all.css';
import {MouseEventHandler, useContext, useEffect, useRef, useState} from "react";
import { motion } from "framer-motion";
import AppContext from "../../../context/AppContext";
import {useMediaQuery} from "react-responsive";

type Props = {
    icon: string
    color: string,
    name: string,
    number: number,
    showAdd: (show: boolean) => Function,
    getColumn: Function,
    column: object,
    showAndGetColumn: Function,
}


const ColumnHead: NextPage<Props> = (props:Props) => {

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const [isMobile, setIsMobile] = useState(false)
    const [isHover, setIsHover] = useState(false)
    const context: any = useContext(AppContext)
    const addVisible = context.showAdd[0]
    const setAddVisible = context.showAdd[1]

    const { icon, color, name } = props;

    const headStyle = {
        background: props.color,
      };

    const trigger = useRef()
    useEffect(() => {
        setIsMobile(isTabletOrMobile)
    }, [isTabletOrMobile])


    const showEdit = (visible: boolean, bool:boolean) => {
        props.getColumn(props.column)

        context.editValues = {
            ico: icon,
            color: color,
            name: name,
        }
        setAddVisible(!visible, bool)
    }
  return (
      <>
        <div
            suppressHydrationWarning={true}
            onMouseEnter={() => setIsHover(!isHover)}
            onMouseLeave={() => setIsHover(!isHover)}
            className={styles.flexCard}
            style={headStyle}>
            <div>
                <i className={props.icon}></i>
                <h3>{props.name}</h3>
            </div>
            <div>
                {
                    isHover || isMobile
                        ?   <motion.button
                                onClick={() => showEdit(addVisible, true)}>
                                <i className="fa-solid fa-pen"></i>
                            </motion.button>
                        :   <span>{props.number}</span>
                }
                {
                    isMobile ?
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => props.showAndGetColumn(props.column)}>
                            <i className="fa-sharp fa-solid fa-plus"></i>
                        </motion.button>
                        : null
                }
            </div>
        </div>
      </>
  )
}

export default ColumnHead
