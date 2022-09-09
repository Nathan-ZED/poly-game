import type { NextPage } from 'next'
import styles from '../../../styles/Column/ColumnHead/ColumnHead.module.css'
import '@fortawesome/fontawesome-free/css/all.css';
import {useState} from "react";
import { motion } from "framer-motion";

type Props = {
    icon: string
    color: string,
    name: string,
    number: number,
}


const ColumnHead: NextPage<Props> = (props) => {

    const [isHover, setIsHover] = useState(false)

    const headStyle = {
        background: props.color,
      };

  return (
        <div onMouseEnter={() => setIsHover(!isHover)}
             onMouseLeave={() => setIsHover(!isHover)}
             className={styles.flexCard}
             style={headStyle}
        >
            <div>
                <i className={props.icon}></i>
                <h3>{props.name}</h3>
            </div>
            {
                isHover
                    ?   <motion.button>
                            <i className="fa-solid fa-pen"></i>
                        </motion.button>
                    :   <span>{props.number}</span>
            }
        </div>
  )
}

export default ColumnHead
