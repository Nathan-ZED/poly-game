import type { NextPage } from 'next'
import Image from 'next/image'
import logo from '../../public/assets/images/logo.svg'
import styles from '../../styles/Nav/Nav.module.css'

type Props = {
    css: any,
    global: any
}


const Nav: NextPage<Props> = (props) => {
  return (
      <nav className={styles.nav}>
        <article>
            <Image src={logo} alt='logo polygame'/>
            <hr/>
            <h1>
                <span className={styles.orange}>P</span>
                <span className={styles.lightorange}>o</span>
                <span className={styles.blue}>l</span>
                <span className={styles.blue}>y</span>
                game
            </h1>
        </article>
      </nav>
  )
}

export default Nav
