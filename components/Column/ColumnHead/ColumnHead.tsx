import type { NextPage } from 'next'
import styles from '../../../styles/Column/ColumnHead/ColumnHead.module.css'
import '@fortawesome/fontawesome-free/css/all.css';
import {MouseEventHandler, useContext, useState} from "react";
import { motion } from "framer-motion";
import AppContext from "../../../context/AppContext";

type Props = {
    icon: string
    color: string,
    name: string,
    number: number,
    showAdd: (show: boolean) => Function,
    getColumn: Function,
    column: object,
}


const ColumnHead: NextPage<Props> = (props:Props) => {

    const [isHover, setIsHover] = useState(false)
    const context: any = useContext(AppContext)
    const addVisible = context.showAdd[0]
    const setAddVisible = context.showAdd[1]

    const { icon, color, name } = props;

    const headStyle = {
        background: props.color,
      };


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
        <div onMouseEnter={() => setIsHover(!isHover)}
             onMouseLeave={() => setIsHover(!isHover)}
             className={styles.flexCard}
             style={headStyle}>
            <div>
                <i className={props.icon}></i>
                <h3>{props.name}</h3>
            </div>
            {
                isHover
                    ?   <motion.button onClick={() => showEdit(addVisible, true)}>
                            <i className="fa-solid fa-pen"></i>
                        </motion.button>
                    :   <span>{props.number}</span>
            }
        </div>
  )
}

export default ColumnHead
