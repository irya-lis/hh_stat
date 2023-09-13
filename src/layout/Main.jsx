import React, { useEffect, useState } from "react";
import Vacancies from "../components/Vacancies/Vacancies";
import style from "./Main.module.css";
import Search from "../components/Search/Search";
import Loading from "../components/Loading/Loading";
import Statistics from "../components/Statistics/Statistics";
import Filters from "../components/Filters/Filters";
import Paginator from "../components/Pagination/Pagination";

const Main = () => {
    const [vacancies, setVacancies] = useState([]);
    const [statistics, setStatistics] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [vacanciesStat, setVacanciesStat] = useState("");
    const [vacancyPage, setVacancyPage] = useState(0);
    const [vacanciesPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const [noExperience, setNoExperience] = useState(0);
    const [between1And3, setBetween1And3] = useState(0);
    const [between3And6, setBetween3And6] = useState(0);
    const [moreThan6, setMoreThan6] = useState(0);
    const [searched, setSearched] = useState(false); //  состояние для отслеживания выполненного поиска

    useEffect(() => {
        const fetchVacancies = () => {
            setIsLoading(true);
            setSearched(true); //  поиск выполнен

            fetch(
                `https://api.hh.ru/vacancies?text=${vacanciesStat}&page=${vacancyPage}&per_page=${vacanciesPerPage}`
            )
                .then((response) => response.json())
                .then((data) => {
                    setVacancies(data.items);
                    setIsLoading(false);
                    setTotalPages(data.pages);
                });
        };

        const fetchStatistics = () => {
            fetch("https://api.hh.ru/dictionaries")
                .then((response) => response.json())
                .then((data) => {
                    setStatistics(data.experience);
                });
        };

        if (vacanciesStat !== "") {
            fetchVacancies();
            fetchStatistics();
        }
    }, [vacancyPage, vacanciesPerPage, vacanciesStat]);

    const currentVacancies = vacancies;

    const paginate = (pageNumber) => {
        setVacancyPage(pageNumber);
    };

    const nextPage = () => {
        if (vacancyPage < totalPages) {
            setVacancyPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (vacancyPage > 1) {
            setVacancyPage((prev) => prev - 1);
        }
    };

    const searchVacancies = (str) => {
        setVacanciesStat(str);
        setSearched(false); // Сбрасываю флаг выполненного поиска при новом запросе


        fetch(`https://api.hh.ru/vacancies?text=${str}&page=1&per_page=${vacanciesPerPage}`)
            .then((response) => response.json())
            .then((data) => {
                setVacancies(data.items);
                setIsLoading(false);
                setTotalPages(data.pages);
                setVacancyPage(1);
            });

        fetch(`https://api.hh.ru/vacancies?text=${str}&experience=noExperience`)
            .then((response) => response.json())
            .then((data) => {
                setNoExperience(data.found);
            });

        fetch(`https://api.hh.ru/vacancies?text=${str}&experience=between1And3`)
            .then((response) => response.json())
            .then((data) => {
                setBetween1And3(data.found);
            });

        fetch(`https://api.hh.ru/vacancies?text=${str}&experience=between3And6`)
            .then((response) => response.json())
            .then((data) => {
                setBetween3And6(data.found);
            });

        fetch(`https://api.hh.ru/vacancies?text=${str}&experience=moreThan6`)
            .then((response) => response.json())
            .then((data) => {
                setMoreThan6(data.found);
            });
    };

    return (
        <>
            <Search searchVacancies={searchVacancies} />
            <Filters />
            <Statistics
                searchVacancies={searchVacancies}
                statistics={statistics}
                vacancies={currentVacancies}
                noExperience={noExperience}
                between1And3={between1And3}
                between3And6={between3And6}
                moreThan6={moreThan6}
            />
            <div className={style.main}>
                {isLoading ? (
                    <Loading />
                ) : searched ? (
                    currentVacancies && currentVacancies.length ? (
                        <>
                            <Vacancies vacancies={currentVacancies} />
                            <Paginator
                                totalPages={totalPages}
                                vacanciesPerPage={vacanciesPerPage}
                                paginate={paginate}
                                nextPage={nextPage}
                                prevPage={prevPage}
                                vacancyPage={vacancyPage}
                            />
                        </>
                    ) : (
                        <h3>No vacancies found.</h3>
                    )
                ) : (
                    <h5>hh statistics</h5> //  при первоначальной загрузке
                )}
            </div>
        </>
    );
};

export default Main;
