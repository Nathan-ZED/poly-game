import type { NextPage } from 'next'
import styles from '../../styles/SearchGame/SearchGame.module.css'
import SearchCard from './SearchCard/SearchCard'
import Background from "./Background/Background";
import { useContext, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import AppContext from "../../context/AppContext";

type Props = {
    show: Function,
}

const SearchGame: NextPage<Props> = (props: Props) => {

    const context: any = useContext(AppContext);
    const baseUrl = 'https://api.rawg.io/api/';
    const ApiKey = context.state.token

    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState('')
    const [timer, setTimer] = useState(0)

    //Recuperation des jeux en fonction de l'input sur rawg.io
    const getGames = async (value: string) => {
        try {
            await fetch(`${baseUrl}games?search=${value}&key=${ApiKey}`)
                .then(res => res.json())
                .then(res => setData(res.results))
        } catch (err) {
            throw Error('Aucun résultat')
        }
    }

    // Appel de recuperation des jeux avec envoi de la valeur de l'input
    // uniquement quand l'utilisateur a fini de taper depuis 400ms
    const inputChanged = (value: string) => {
        setInputValue(value)
        clearTimeout(timer)
        const newTimer: any = setTimeout(() => {
            value !== '' ? getGames(value) : setData([])
        }, 400)
        setTimer(newTimer)
    }

  return (
    <Background show={props.show} bgClass={styles.bg}>
        <motion.form
            onClick={(e) => e.stopPropagation()}
            variants={context.dropIn}
            autoComplete="off"
            initial="hidden"
            animate="visible"
            exit="exit"
            className={styles.input}
        >
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
                className={styles.inputEl}
                type='search'
                onChange={(e) => inputChanged(e.target.value)}
                name='search_game'
                placeholder='Search a video game...' />
        </motion.form>
        <AnimatePresence>
            {
                data.length <= 0
                    ? null
                    :
            <motion.div
                    className={styles.resultWrapper}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.5,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}>
                {data.map((game: any, i: number) => (
                    <SearchCard
                        key={i}
                        name={game.name}
                        img={game.background_image}
                        platforms={ game.platforms ? game.platforms[0]['platform'].name : [] }
                        genre={game.genres[0]?.name}
                    />
                ))}
                </motion.div>
            }
        </AnimatePresence>
    </Background>
  )
}

export default SearchGame
