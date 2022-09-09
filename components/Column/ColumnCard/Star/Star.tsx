import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../../../../styles/Column/ColumnCard/Star/Star.module.css'
import '@fortawesome/fontawesome-free/css/all.css';
import {useState, useContext, MouseEventHandler, useEffect} from 'react';
import AppContext from "../../../../context/AppContext";


type Props = {
    activate: Function,
    newFav: Function,
    callback: Function,
    isActive: boolean,
    id: number,
    gameName: string,
}


const Star: NextPage<Props> = (props:Props) => {

    const {activate, isActive} = props
    const context: any = useContext(AppContext)
    const column = context.values.state.selectedCol

    const { id, gameName, callback } = props

  return (
    <div className={styles.star}>
    {
        isActive
        ? 
        <button onClick={() => callback(column, id, gameName, false)}>
            <i className="fa-solid fa-star"></i>
            <div className={styles.bg}></div>
        </button>
        : 
        <button onClick={(e) => callback(column, id, gameName, true)}>
            <i className="fa-regular fa-star"></i>
        </button>
    } 
    </div>
  )
}

export default Star
