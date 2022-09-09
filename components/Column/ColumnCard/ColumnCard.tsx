import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../../../styles/Column/ColumnCard/ColumnCard.module.css'
import '@fortawesome/fontawesome-free/css/all.css';
import Star from './Star/Star'
import { Reorder } from "framer-motion"
import {useContext, useEffect, useState} from "react";
import AppContext from "../../../context/AppContext";
import noImg from '../../../public/assets/images/no-img.jpeg'

type Props = {
    isFav: boolean,
    gameInfo: object,
    id: number,
    gameName: string,
    gameGenre: string,
    gameImg: string,
    gamePlatform: string,
    newFav: Function,
}


const ColumnCard: NextPage<Props> = (props) => {

    const [imgUrl, setImgUrl] = useState('')
    const context: any = useContext(AppContext)
    const [isActive, setIsActive] = useState(false)
    const [isFav, setIsFav] = useState(props.isFav)
    const [games, setGame] = useState('')
    const column = context.values.state.selectedCol

    const {
        gameName,
        gameGenre,
        gamePlatform,
        id,
        gameInfo,
        gameImg,
    } = props

    const callBackUp = (col: any, id: number, name:string, active: boolean) => {
        let game = column.games.find(el => el.id === id);
        game === undefined
            ? game = column.games.find(el => el.name === name)
            : null
        props.newFav(game, active)
    }

    useEffect(() => {
        setImgUrl(gameImg)
    }, [])


  return (
    <Reorder.Item key={id} id={`${id}`} value={gameInfo} className={styles.card}>
                <Star
                    activate={setIsActive}
                    id={id}
                    callback={callBackUp}
                    isActive={isFav}
                    newFav={props.newFav}
                    gameName={gameName}
                />
        <article>
                    <Image
                        unoptimized={true}
                        src={imgUrl ? imgUrl : noImg}
                        alt={gameName}
                        width={'70px'}
                        height={'100%'}
                        className={styles.image}
                    />

            <div className={styles.main}>
                <h4>{gameName}</h4>
                <div className={styles.list}>
                    <div className={styles.li}>
                        <p>Genre: <span>{gameGenre}</span></p>
                    </div>
                    <div className={styles.li}>
                        <p>Platforms: <span>{gamePlatform}</span></p>
                    </div>
                </div>
            </div>
        </article>
    </Reorder.Item>
  )
}

export default ColumnCard
