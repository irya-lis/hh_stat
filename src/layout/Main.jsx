import React, {useEffect, useState} from "react";
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
    const [isLoading, setIsLoading] = useState(true);
    const [vacanciesStat, setVacanciesStat] = useState("");
    const [vacancyPage, setVacancyPage] = useState(0);
    const [vacanciesPerPage] = useState(20);
    const [totalPages, setTotalPages] = useState(0);


    const [noExperienceStatistics, setNoExperienceStatistics] = useState([0]);
    const [between1And3, setBetween1And3] = useState([0]);
    const [between3And6, setBetween3And6] = useState([0]);
    const [moreThan6, setMoreThan6] = useState([0]);


    useEffect(() => {
        // Функция для выполнения запроса и обновления вакансий
        const fetchVacancies = () => {
            debugger;
            fetch(`https://api.hh.ru/vacancies?text=${vacanciesStat}&page=${vacancyPage}&per_page=${vacanciesPerPage}`)
                .then((response) => response.json())
                .then((data) => {
                    setVacancies(data.items);
                    setIsLoading(false);
                    setTotalPages(data.pages);
                });
        };

        // Выполняем запрос к API с пустой строкой в vacanciesStat для получения всех вакансий
        setVacanciesStat("");

        // Выполняем запрос к API при загрузке страницы
        fetchVacancies();

        fetch("https://api.hh.ru/dictionaries")
            .then((response) => response.json())
            .then((data) => {
                setStatistics(data.experience);
            });

         // опыт
        fetch("https://api.hh.ru/vacancies?text=noExperience")
            .then((response) => response.json())
            .then((data) => {
                setNoExperienceStatistics(data.found)
            });

        fetch("https://api.hh.ru/vacancies?text=between1And3")
            .then((response) => response.json())
            .then((data) => {
                setBetween1And3(data.found)
            });

        fetch("https://api.hh.ru/vacancies?text=between3And6")
            .then((response) => response.json())
            .then((data) => {
                setBetween3And6(data.found)
            });

        fetch("https://api.hh.ru/vacancies?text=moreThan6")
            .then((response) => response.json())
            .then((data) => {
                setMoreThan6(data.found)
            });


    }, [vacancyPage, vacanciesPerPage]);

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
        // Функция для выполнения поиска по заданной строке

        fetch(`https://api.hh.ru/vacancies?text=${str}&page=1&per_page=${vacanciesPerPage}`)
            .then((response) => response.json())
            .then((data) => {
                setVacancies(data.items);
                setIsLoading(false);
                setTotalPages(data.pages);
                setVacancyPage(1);
            });
    };



    return (
        <>
            <Search searchVacancies={searchVacancies}/>
            <Filters/>
            <Statistics statistics={statistics}
                        vacancies={currentVacancies}
                        noExperienceStatistics={noExperienceStatistics}
                        between1And3={between1And3}
                        between3And6={between3And6}
                        moreThan6={moreThan6}
            />
            <div className={style.main}>
                {isLoading ? (
                    <Loading/>
                ) : currentVacancies && currentVacancies.length ? (
                    <Vacancies vacancies={currentVacancies}/>
                ) : (
                    <h3>No vacancies found.</h3>
                )}
            </div>
            <Paginator
                totalPages={totalPages}
                vacanciesPerPage={vacanciesPerPage}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
                vacancyPage={vacancyPage}
            />
        </>
    );
};

export default Main;
