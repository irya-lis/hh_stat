import React, {useState} from "react";
import style from "./Search.module.css"

const Search = (props) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleKey = (event) => {
        if (event.key === 'Enter') {
            props.searchVacancies(searchQuery);
        }
    };

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className={style.form}>
            <input
                className={style.input}
                type="text"
                placeholder="Поиск"
                onChange={handleChange}
                onKeyDown={handleKey}
            />
            <button
                className={style.button}
                onClick={() => props.searchVacancies(searchQuery)}
            >
                Отправить
            </button>
        </div>
    );
};

export default Search;