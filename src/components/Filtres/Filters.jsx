import React, {useState} from "react";
import Filter from "./Filter/Filter";
import style from "./Filters.module.css"


const Filters = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const vacanciesOptions = [
        {id: 1, label: "All", name: "radio", value: "All"},
        {id: 2, label: "Only Russia", name: "radio", value: "Only Russia"},
    ];

    const salaryOptions = [
        {id: 1, label: "Net", name: "radio1", value: "Net"},
        {id: 2, label: "Gross", name: "radio1", value: "Gross"},
    ];

    return (
        <div className={style.extendedSearch}>
            <label htmlFor="toggleCheckbox" className={style.extended} onChange={toggleExpand}>
                Расширенный поиск
            </label>
            <input type="checkbox" id="toggleCheckbox" className={style.toggleCheckbox} />
            <div className={`${style.box} ${isExpanded ? style.expanded : ""}`}>
                <Filter name="Вакансии" options={vacanciesOptions} />
                <Filter name="Зарплата" options={salaryOptions} />
            </div>
        </div>
    );
};
export default Filters;




