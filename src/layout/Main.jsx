import React, {useEffect, useState} from "react";
import Vacancies from "../components/Vacancies/Vacancies";
import style from "./Main.module.css"
import Search from "../components/Search/Search";
import Loading from "../components/Loading/Loading";

const Main = () => {
    let [state, setState] = useState({
        vacancies: []
    });
    const {vacancies} = state;
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        fetch('https://api.hh.ru/vacancies?text=react')
            .then(response => response.json())
            .then(data => {
                setState(prevState => ({...prevState, vacancies: data.items}));
                setIsLoading(false);
            });
    }, []);

    const searchVacancies = (str) => {
        fetch(`https://api.hh.ru/vacancies?text=${str}`)
            .then(response => response.json())
            .then(data => setState(prevState => ({...prevState, vacancies: data.items})))
    }

    return (
        <>
            <Search searchVacancies={searchVacancies}/>
            <main className={style.main}>
                {isLoading ? (
                    <Loading/>
                ) : vacancies && vacancies.length ? (
                    <Vacancies vacancies={vacancies}/>
                ) : (
                    <h3>No vacancies found.</h3>
                )}
            </main>
        </>
    )
}

export default Main;