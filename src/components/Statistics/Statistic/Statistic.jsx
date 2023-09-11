import React from "react";
import style from "./Statistic.module.css";

const Statistic = (...props) => {
    const {id, name, found} = props;
    return (
        <div className={style.statisticList} key={id}>
            <span>Найдено вакансий: {found}</span>
            <span>Найдено резюме: {12}</span>
            <span>Опыт: {name}</span>
        </div>
    );
};

export default Statistic;
