import React from "react";
import style from "./Vacancy.module.css"

const Vacancy = (props) => {

    const {id, name, salary, alternate_url} = props;
    const {from, currency} = salary || {};

    return (
        <div className={style.list} key={id}>
            <div>Vacancy: {name}</div>
            <div>Salary:</div>
            <div>From: {from}</div>
            <div>Currency: {currency}</div>
            <div className={style.link}>
                Ссылка на вакансию:
                <a href={alternate_url} target="_blank">
                    {alternate_url}
                </a>
            </div>

        </div>
    )
}

export default Vacancy;