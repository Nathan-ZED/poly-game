import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Nav from '../components/Nav/Nav'
import Column from '../components/Column/Column'
import SearchGame from '../components/SearchGame/SearchGame'
import {useContext, useEffect, useRef, useState} from "react";
import AddColumn from "../components/AddColumn/AddColumn";
import {Reorder} from "framer-motion";
import AddPopup from "../components/AddPopup/AddPopup";
import AppContext from "../context/AppContext";


const Home: NextPage = () => {

    const context: any = useContext(AppContext);
    const [searchVisible, setSearchVisible] = useState(false);
    const [addVisible, setAddVisible] = useState(false);
    const [columns, setColumns] = useState(context.values.state.columns);
    const [isOd, setIsOdd] = useState(true);
    const [editMode, setEditMode] = useState(false);

    const bgCallback = (b: boolean) => {
        b ? setIsOdd(!b) : setIsOdd(!b);
    }

    const show = (show:boolean) => {
        setSearchVisible(show);
    }

    const showAdd = (show: boolean, edit: boolean) => {
        setAddVisible(show);
        setEditMode(edit);
    }

    useEffect(() => {
        context.showAdd = [addVisible, showAdd];
    }, [context, addVisible]);

  return (
    <>
      <Head>
          <title>Polygame</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Nav
            css={styles}
            global={global}/>
      </header>
      <main>
            <Reorder.Group
                axis={'x'}
                values={columns}
                onReorder={setColumns}
                className={styles.list}>
                    {columns.map((column: any) =>
                                <Column
                                    key={column.id}
                                    column={column}
                                    show={show}
                                    showAdd={(show: boolean) => showAdd}
                                    bgCallback={bgCallback}
                                    isOdd={isOd} />
                    )}
            </Reorder.Group>
                <AddColumn
                    show={showAdd}/>
          {
              searchVisible
                  ? <SearchGame
                      show={show} />
                  : null
          }
          {
           addVisible
                ?
                   <AddPopup
                       columns={columns}
                       setColumns={setColumns}
                       show={showAdd}
                       editMode={editMode}
                       visible={addVisible}
                   />
                    : null
          }
      </main>
    </>
  )
}

export default Home
