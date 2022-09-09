import { motion } from "framer-motion";
import type { NextPage } from 'next'
import {MouseEventHandler, ReactNode} from "react";

type Props = {
    children: ReactNode,
    bgClass: string,
    show: Function,
}

const Background: NextPage<Props> = (props:Props) => {

    const { children, bgClass, show } = props;

    return (
        <motion.div
            onClick={() => show(false)}
            className={bgClass}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    );
};

export default Background;