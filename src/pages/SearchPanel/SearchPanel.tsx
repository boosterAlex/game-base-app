import { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'


import './SearchPanel.scss'
import { SearchResult, Spinner } from 'shared/ui';
import { API } from 'services'

interface GamesListInfo {
    id: number
    name: string
    background_image: string
    parent_platforms: []
}


const SearchPanel = () => {

    const [inputValue, setInputValue] = useState<string>('')
    const [gamesList, setGamesList] = useState<GamesListInfo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isResultVisible, setIsResultVisible] = useState(false);

    const { getGamesSearchList } = API.gameService()

    const inputRef = useRef<HTMLInputElement>(null);

    const hideSearchBox = () => {
        setInputValue('')
        inputRef.current && (inputRef.current.value = '')
        setGamesList([])
        setIsResultVisible(false);
    };

    const handleInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue((e.target.value).trim())
        setIsResultVisible(true)
        if (inputValue) {
            setGamesList([]);
            setIsResultVisible(false)
        }
    }, 500)

    useEffect(() => {
        document.addEventListener('click', hideSearchBox)
        return (() => {
            document.removeEventListener('click', hideSearchBox)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (inputValue) {
            setIsLoading(true);
            getGamesSearchList(inputValue)
                .then((games: any) => setGamesList(games))
                .finally(() => setIsLoading(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue])

    return (
        <div>
            <form className='search-form'>
                <input
                    type="text"
                    placeholder="Искать здесь..."
                    className='search-form_input'
                    onChange={handleInput}
                    ref={inputRef} />
                <button
                    type="submit"
                    className='search-form_button'>
                </button>
            </form>
            {isResultVisible &&
                <div
                    className='search-form-result'
                >
                    {isLoading ?
                        <Spinner /> :
                        (inputValue && gamesList.map((game) =>
                            <SearchResult
                                key={game.id}
                                name={game.name}
                                background_image={game.background_image}
                                id={game.id}
                            />
                        ))}
                </div>}

        </div>

    )
}

export default SearchPanel
