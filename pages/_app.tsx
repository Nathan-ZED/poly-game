import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@fortawesome/fontawesome-free/css/all.css';
import AppContext from "../context/AppContext";
import {useContext, useState} from "react";

//Initialisation du contexte avec des valeurs par default
const values = {
    state: {
        columns: [
            {
                id: 1,
                icon: 'fa-solid fa-database',
                name: 'Liste de souhaits',
                color: 'rgba(251, 87, 121, 1)',
                games: [],
                favorites: [],
            },
            {
                id: 2,
                icon: 'fa-brands fa-playstation',
                name: 'Playstation',
                color: 'rgba(0, 99, 251, 1)',
                games: [],
                favorites: [],
            },
            {
                id: 3,
                icon: 'fa-solid fa-gamepad',
                name: 'Nintendo Switch',
                color: 'rgba(255, 168, 0, 1)',
                games: [],
                favorites: [],
            },
            {
                id: 4,
                icon: 'fa-brands fa-xbox',
                name: 'XBOX',
                color: 'rgba(24, 219, 126, 1)',
                games: [],
                favorites: [],
            },
        ],
        token: 'cd9650e94d394c9db63f905156829c20',
    },
    dropIn: {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 25,
                stiffness: 500,
            },
        },
        exit: {
            y: "100vh",
            opacity: 0,
        },
    },
}

export const useGlobalContext = () => useContext(AppContext)

function MyApp({ Component, pageProps }: AppProps) {

  return (
      <AppContext.Provider
      value={{
          values: values,
          showAdd: [],
      }}
      >
        <Component {...pageProps} />
      </AppContext.Provider>
  )
}

export default MyApp
