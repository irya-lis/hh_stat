import React from "react";
import style from "./Statistic.module.css";

const Statistic = (props) => {
    const {id, name} = props;

    return (
        <div className={style.statisticList} key={id}>
            <span>Опыт: {name} </span>
        </div>
    )
}

export default Statistic;