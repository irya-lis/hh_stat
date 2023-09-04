import React, {useEffect, useState} from "react";
import Vacancies from "../components/Vacancies/Vacancies";
import style from "./Main.module.css"
import Search from "../components/Search/Search";
import Loading from "../components/Loading/Loading";
import Filters from "../components/Filtres/Filters";
import Statistics from "../components/Statistics/Statistics";

const Main = () => {
    const [vacancies, setVacancies] = useState([]);
    const [statistics, setStatistics] = useState([]);

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        fetch('https://api.hh.ru/vacancies')
            .then(response => response.json())
            .then(data => {
                setVacancies(data.items);
                setIsLoading(false);
            });



        fetch('https://api.hh.ru/dictionaries')
            .then(response => response.json())
            .then(data => {
                setStatistics(data.experience)
            });

    }, []);

    const searchVacancies = (str) => {
        fetch(`https://api.hh.ru/vacancies?text=${str}`)
            .then(response => response.json())
            .then(data => setVacancies(data.items))
    }

    return (
        <>
            <Search searchVacancies={searchVacancies}/>
            <Filters/>
            <Statistics statistics={statistics}/>
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