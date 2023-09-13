import React from "react";
import style from "./Statistic.module.css";

const Statistic = ({id, name, noExperience, between1And3, between3And6, moreThan6}) => {
    const countVacancies = id === "noExperience" ? noExperience :
        id === "between1And3" ? between1And3 :
            id === "between3And6" ? between3And6 :
                id === "moreThan6" ? moreThan6 : 0;

    return (
        <div className={style.statisticList} key={id}>
            <span>Найдено вакансий: {countVacancies}</span>
            <span>Найдено резюме: {0}</span>
            <span>Опыт: {name}</span>

        </div>
    );
};

export default Statistic;

