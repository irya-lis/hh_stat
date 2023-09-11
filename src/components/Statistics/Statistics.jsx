import React from "react";
import style from "./Statistics.module.css";
import Statistic from "./Statistic/Statistic";

const Statistics = (props) => {
    const {statistics, noExperienceStatistics, between1And3, between3And6, moreThan6} = props;

    return (
        <div className={style.statistic}>
            {statistics.map(statistic => (
                statistic.id ?
                    <Statistic
                        key={statistic.id}
                        {...statistic}
                        found={noExperienceStatistics}
                    /> : null

                ))}
        </div>
    )
}

export default Statistics;