import React from "react";
import style from "./Vacancy.module.css"

const Vacancy = (props) => {

    const {id, name, salary} = props;
    const {from, currency} = salary || {};

    return (
        <div className={style.list} key={id}>
            <div>name: {name}</div>
            <div>Salary:</div>
            <div>From: {from}</div>
            <div>Currency: {currency}</div>

        </div>
    )
}

export default Vacancy;