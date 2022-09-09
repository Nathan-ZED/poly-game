import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Nav from '../components/Nav/Nav'
import Column from '../components/Column/Column'
import SearchGame from '../components/SearchGame/SearchGame'
import {useContext, useEffect, useState} from "react";
import AddColumn from "../components/AddColumn/AddColumn";
import {Reorder} from "framer-motion";
import AddPopup from "../components/AddPopup/AddPopup";
import AppContext from "../context/AppContext";


const Home: NextPage = () => {
    const [searchVisible, setSearchVisible] = useState(false)
    const [addVisible, setAddVisible] = useState(false)

    const context: any = useContext(AppContext)
    const [columns, setColumns] = useState(context.state.columns)
    const [isOd, setIsOdd] = useState(true)

    const bgCallback = (b: boolean) => {
        b ? setIsOdd(!b) : setIsOdd(!b)
        console.log(b)
    }

    const show = (show:boolean) => {
        show
            ? setSearchVisible(true)
            : setSearchVisible(false)
    }

    const showAdd = (show: boolean) => {
        show
            ? setAddVisible(true)
            : setAddVisible(false)
    }

  return (
    <>
      <Head>
          <title>Polygame</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Nav css={styles} global={global}/>
      </header>
      <main>
            <Reorder.Group axis={'x'} values={columns} onReorder={setColumns}  className={styles.list}>
                    {columns.map((column: Object) =>
                            <Reorder.Item value={column} key={column.id} className={styles.listLi} >
                                <Column column={column} show={show} bgCallback={bgCallback} isOdd={isOd} />
                            </Reorder.Item>
                    )}
            </Reorder.Group>
                <AddColumn show={showAdd}/>
          {
              searchVisible
                  ? <SearchGame show={show} />
                  : null
          }
          {
           addVisible
                ? <AddPopup show={showAdd} visible={addVisible} />
                : null
          }
      </main>
    </>
  )
}

export default Home
