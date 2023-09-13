import React from "react";
import style from "./Pagination.module.css";

const Paginator = ({ totalPages, paginate, nextPage, prevPage, vacancyPage }) => {

    // Генерация списка номеров страниц для пагинатора
    const generatePageNumbers = () => {
        const pageCount = totalPages;
        const pageNumbers = [];

        if (pageCount <= 5) {
            for (let i = 1; i <= pageCount; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (vacancyPage <= 3) {
                for (let i = 1; i <= 5; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push("...");
                pageNumbers.push(pageCount);
            } else if (vacancyPage >= pageCount - 2) {
                pageNumbers.push(1);
                pageNumbers.push("...");
                for (let i = pageCount - 4; i <= pageCount; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push("...");
                for (let i = vacancyPage - 1; i <= vacancyPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push("...");
                pageNumbers.push(pageCount);
            }
        }
        return pageNumbers;
    };


    return (
        <div className={style.pagination}>
            <button className={style.btn} onClick={prevPage}>
                Prev page
            </button>
            {generatePageNumbers().map((pageNumber) => (
                <button
                    className={style.btn}
                    onClick={() => paginate(pageNumber)}
                    disabled={pageNumber === "..." || pageNumber === vacancyPage}
                >
                    {pageNumber}
                </button>
            ))}

            <button className={style.btn} onClick={nextPage}>
                Next page
            </button>
        </div>
    );
};

export default Paginator;
