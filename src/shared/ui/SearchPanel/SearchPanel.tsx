import './SearchPanel.scss'

const SearchPanel = () => {
    return (
        <>
            <form className='search__form'>
                <input type="text" placeholder="Искать здесь..." className='search__form-input' />
                <button type="submit" className='search__form-button'></button>
            </form>
        </>
    )
}

export default SearchPanel