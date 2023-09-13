import React, { useState } from "react";
import style from "./Search.module.css";

const Search = ({ searchVacancies }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleKey = (event) => {
        if (event.key === 'Enter') {
            performSearch();

        }
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const performSearch = () => {
        searchVacancies(searchTerm);
        // setSearchTerm(""); // Очищ поле ввода после поиска
    };

    return (
        <div className={style.form}>
            <input
                className={style.input}
                type="text"
                placeholder="Поиск"
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKey}
            />
            <button
                className={style.button}
                onClick={performSearch}
            >
                Отправить
            </button>
        </div>
    );
};

export default Search;
