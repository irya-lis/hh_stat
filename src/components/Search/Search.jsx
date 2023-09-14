import React, {useState} from "react";
import style from "./Search.module.css";

const Search = ({searchVacancies}) => {
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
    };

    const clearInp = () => {
        setSearchTerm(""); // Очищ поле ввода
    }

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



                <button className={`${style.clearInp} ${style.hintBottom}`} data-hint="Очистить" onClick={clearInp}>X</button>
            <button className={style.button} onClick={performSearch}>Отправить</button>
        </div>
    );
};

export default Search;
