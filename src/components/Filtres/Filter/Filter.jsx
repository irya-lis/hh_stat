import React from "react";
import style from "./Filter.module.css"

const Filter = ({ name, options }) => {
    return (
        <div>
            <span className={style.filter}>{name}</span>
            {options.map((option) => (
                <label className={style.radio} key={option.id}>
                    <input type="radio" value={option.value} name={option.name} />
                    {option.label}
                </label>
            ))}
        </div>
    );
};

export default Filter;
