import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../../../styles/Column/ColumnCard/ColumnCard.module.css'
import '@fortawesome/fontawesome-free/css/all.css';
import Star from './Star/Star'
import { Reorder, motion } from "framer-motion"
import {useContext, useEffect, useState} from "react";
import AppContext from "../../../context/AppContext";
import noImg from '../../../public/assets/images/no-img.jpeg'

type Props = {
    gameInfo: any,
    newFavorite: Function,
    id: number,
    gameName: string,
    gameGenre: string,
    gamePlatform?: [],
    gameImg: string,
}

const ColumnCard: NextPage<Props> = (props) => {
    const { id, gameName, gameGenre, gamePlatform, gameImg } = props
    const {gameInfo} = props
    const [imgUrl, setImgUrl] = useState(gameImg)
    const context: any = useContext(AppContext)
    const column = context.values.state.selectedCol
    const [game, setGame] = useState(gameInfo)

    const [isFavorite,  setIsFavorite] = useState<boolean>(false);

    const putCardFavorite = async (active: any) => {
        if(active) {
            setIsFavorite(true)
            gameInfo.favorite = true
        } else {
            setIsFavorite(false)
            gameInfo.favorite = false
        }
        props.newFavorite(gameInfo, active)
    }

    useEffect(() => {
        setGame(gameInfo)
        setImgUrl(game.img)
    }, [game.img, gameInfo])


  return (
    <Reorder.Item key={id} value={gameInfo} className={styles.card}>

                    <Star
                        putCardFavorite={(isFavorite: any) => putCardFavorite(isFavorite)}
                        id={id}
                        game={gameInfo}
                        isFavorite={isFavorite}
                        setFavorite={setIsFavorite}
                    />
            <article>
                        <Image
                            unoptimized={true}
                            src={imgUrl ? imgUrl : noImg}
                            alt={game.name}
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
