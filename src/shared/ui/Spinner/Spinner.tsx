import './Spinner.scss'

const Spinner = () => {
    return (
        <div className="spinner">
            <span className="spinner__animation"></span>
            <span className="spinner__info">Загрузка...</span>
        </div>
    )
}

export default Spinner