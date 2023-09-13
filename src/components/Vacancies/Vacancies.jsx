import Vacancy from "./Vacancy/Vacancy";

const Vacancies = (props) => {
    const {vacancies} = props;
    return (
        <div>

            {vacancies.map(vacancy => (
                vacancy.id ? <Vacancy key={vacancy.id} {...vacancy} /> : null
            ))}
        </div>
    );
}

export default Vacancies;

