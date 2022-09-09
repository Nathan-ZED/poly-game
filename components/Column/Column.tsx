import type { NextPage } from 'next'
import styles from '../../styles/Column/Column.module.css'
import ColumnHead from '../../components/Column/ColumnHead/ColumnHead'
import ColumnCard from '../../components/Column/ColumnCard/ColumnCard'
import {createContext, MouseEventHandler, useContext, useEffect, useState} from 'react'
import { Reorder, motion } from "framer-motion"
import AppContext from "../../context/AppContext";


type Props = {
    isOdd: any,
    show: Function,
    bgCallback: Function,
    column: any
    showAdd: (show: boolean) => Function,
}

const Column: NextPage<Props> = (props:Props) => {
    const [color, setColor] = useState('rgba(251, 87, 121, 1)')
    const [selectedColumn, setSelectedColumn] = useState(props.column)
    const [games, setGames] = useState(selectedColumn.games)
    const [favorites, setFavorites] = useState<any[]>([])
    const context: any = useContext(AppContext)
    const bg = {
        background: color
      };

    const bgOdd = (prop: Props) => {
        prop.isOdd !== true
            ? setColor('rgba(236, 239, 240, 1)')
            : setColor('rgba(241, 245, 246, 1)')
    }

    const showAndGetColumn = (column: any) => {
        props.show(true)
        setSelectedColumn(column)
        getColumn()
    }

    const newFavorite = (elem: any, active: boolean) => {
        const gameVar = [...games]
        const favoriteVar = [...favorites]
        const addFav = [elem, ...favorites]
        const addGame = [...games, elem]

        if(active) {
            setFavorites(addFav);
            const res = gameVar.filter(item => item.name !== elem.name);
            setGames(res);
        } else {
            setGames(addGame);
            const res = favoriteVar.filter(item => item.name !== elem.name);
            setFavorites(res);
        }
    }

    const getColumn = () => {
        setSelectedColumn(props.column)
        context.values.state.selectedCol = selectedColumn;
        console.log(context.values.state.selectedCol)
    }

    const selectEditColumn = () => {
        setSelectedColumn(props.column)
    }

    useEffect(() => {
        bgOdd(props)
    }, [])

  return (
      <div className={styles.column} style={bg}>
                <ColumnHead
                    column={props.column}
                    getColumn={getColumn}
                    showAdd={props.showAdd}
                    icon={props.column.icon}
                    color={props.column.color}
                    name={props.column.name}
                    number={props.column.games.length}
                />
        <Reorder.Group
            axis={'y'}
            values={games}
            onReorder={setGames}
            className={styles.col}
        >
            {favorites.map(((fav:any, i) => (
                <ColumnCard
                    isFav={true}
                    newFav={newFavorite}
                    key={fav.id}
                    id={fav.id}
                    gameInfo={fav}
                    gameName={fav.name}
                    gameGenre={fav.genre}
                    gamePlatform={fav.platforms}
                    gameImg={fav.img}/>
            )))}
            {games.map(((game:any) => (
                    <ColumnCard
                        isFav={false}
                        newFav={newFavorite}
                        key={game.id}
                        id={game.id}
                        gameInfo={game}
                        gameName={game.name}
                        gameGenre={game.genre}
                        gamePlatform={game.platforms}
                        gameImg={game.img}/>
            )))}
        </Reorder.Group>
        <div className={styles.buttonWrapper}>
            <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => showAndGetColumn(props.column)}
            >
                <i className="fa-solid fa-plus"></i>
            </motion.button>
        </div>
      </div>
  )
}

export default Column
