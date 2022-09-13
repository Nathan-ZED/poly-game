import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../../../../styles/Column/ColumnCard/Star/Star.module.css'
import '@fortawesome/fontawesome-free/css/all.css';
import {useState, useContext, MouseEventHandler, useEffect} from 'react';
import AppContext from "../../../../context/AppContext";


type Props = {
    putCardFavorite: Function,
    setFavorite: Function,
    game: any
    isFavorite: boolean,
    id: number,
}


const Star: NextPage<Props> = (props:Props) => {

    const { putCardFavorite, isFavorite, game } = props


    const putActive = (activ: boolean) => {
        putCardFavorite(activ)
    }

  return (
    <div className={styles.star}>
    {
        game.favorite
        ?
        <button onClick={() => putActive(false)}>
            <i className="fa-solid fa-star"></i>
            <div className={styles.bg}></div>
        </button>
        :
        <button onClick={() => putActive(true)}>
            <i className="fa-regular fa-star"></i>
        </button>
    }
    </div>
  )
}

export default Star
