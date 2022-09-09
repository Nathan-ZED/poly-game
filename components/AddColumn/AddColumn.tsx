import type { NextPage } from 'next'
import '@fortawesome/fontawesome-free/css/all.css';
import styles from '../../styles/AddColumn/AddColumn.module.css'
import {motion} from "framer-motion";

type Props = {
    show: Function,
}


const AddColumn: NextPage<Props> = (props) => {

    const { show } = props;

    return (
                <aside className={styles.addColumn}>
                    <div className={styles.top}>
                        <motion.button
                            onClick={() => show(true)}
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.1 }}
                        >
                            <i className="fa-solid fa-plus"></i>
                        </motion.button>
                    </div>
                </aside>
    )
}

    export default AddColumn
