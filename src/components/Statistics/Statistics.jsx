import React from "react";
import style from "./Statistics.module.css";
import Statistic from "./Statistic/Statistic";


const Statistics = (props) => {
   const {statistics} = props;
    return (
        <div className={style.statistic}>
            {statistics.map(statistic => (
               statistic.id ? <Statistic key={statistic.id} {...statistic}/> : null
            ))}
        </div>
    )

}

export default Statistics;