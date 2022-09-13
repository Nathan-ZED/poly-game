import type { NextPage } from 'next'
import styles from '../../styles/Column/Column.module.css'
import ColumnHead from '../../components/Column/ColumnHead/ColumnHead'
import ColumnCard from '../../components/Column/ColumnCard/ColumnCard'
import { useContext, useState} from 'react'
import { Reorder, motion, useDragControls } from "framer-motion"
import AppContext from "../../context/AppContext";


type Props = {
    isOdd: any,
    show: Function,
    bgCallback: Function,
    column: any
    showAdd: (show: boolean) => Function,
}

const Column: NextPage<Props> = (props:Props) => {

    const controls = useDragControls();

    const [color, setColor] = useState('rgba(241, 245, 246, 1)');
    const [selectedColumn, setSelectedColumn] = useState(props.column);
    const [games, setGames] = useState<any>(selectedColumn.games);
    const [favorites, setFavorites] = useState(selectedColumn.favorites);
    const context: any = useContext(AppContext);
    const [isFavoriteCard, setIsFavoriteCard] = useState(false);

    const bg = {
        background: color
      };

    const bgOdd = (prop: Props) => {
        prop.isOdd !== true
            ? setColor('rgba(236, 239, 240, 1)')
            : setColor('rgba(241, 245, 246, 1)')
    }

    const showAndGetColumn = (column: any) => {
        props.show(true);
        setSelectedColumn(column);
        getColumn();
    }

    const newFavorite = (elem: any, active: boolean) => {
        let Games = [...games]
        let count = 0;
        Games.forEach(el => {
            if(el.name !== elem.name) {
                count++
            } else {
                Games.splice(count, 1)
                count = 0
                active ? elem.favorite = true : elem.favorite = false
                active
                    ? setGames([elem, ...Games])
                    : setGames([...Games, elem])

            }
        })

    }

    const addNewGame = (game: any) => {
        const newArr = [...games]
        newArr.unshift(game)
        setGames(newArr)
    }

    const getColumn = () => {
        setSelectedColumn(props.column)
        context.getColumn = [selectedColumn, setSelectedColumn]
        context.values.state.selectedCol = selectedColumn;
        context.newGame = (el:any) => addNewGame(el)
    }

  return (
      <Reorder.Item
          value={props.column}
          key={props.column.id}
          className={styles.listLi}
          dragListener={false}
          dragControls={controls}>

          <div className={styles.column} style={bg}>
              <div
                  className="reorder-handle"
                  onPointerDown={(e) => controls.start(e)}>
                    <ColumnHead
                        column={props.column}
                        getColumn={getColumn}
                        showAdd={props.showAdd}
                        icon={props.column.icon}
                        color={props.column.color}
                        name={props.column.name}
                        number={props.column.games.length}
                    />
              </div>
            <Reorder.Group
                axis={'y'}
                values={games}
                onReorder={setGames}
                className={styles.col}
            >
                {games.map(((game:any, i:number) => (
                        <ColumnCard
                            isFavoriteCard={isFavoriteCard}
                            newFavorite={(elem:any, bool:boolean) => newFavorite(elem, bool)}
                            key={i}
                            id={game.name}
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
      </Reorder.Item>
  )
}

export default Column
