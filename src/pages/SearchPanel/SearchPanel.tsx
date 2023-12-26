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

interface GamesResponse {
    count: number;
    games: GamesListInfo[];
}


const SearchPanel = () => {

    const [inputValue, setInputValue] = useState<string>('')
    const [gamesList, setGamesList] = useState<GamesListInfo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isResultVisible, setIsResultVisible] = useState(false);
    const [countGames, setCountGames] = useState(0);

    const { getGamesSearchInfo } = API.gameService()

    const inputRef = useRef<HTMLInputElement>(null);

    const hideSearchBox = () => {
        setInputValue('')
        inputRef.current && (inputRef.current.value = '')
        setGamesList([])
        setIsResultVisible(false);
    };

    const handleInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue((e.target.value).trim())
        e.target.value.trim() &&
            setIsResultVisible(true)
    }, 500)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && hideSearchBox()

        document.addEventListener('click', hideSearchBox)
        document.addEventListener('keydown', handleKeyDown)
        return (() => {
            document.removeEventListener('click', hideSearchBox)
            document.removeEventListener('keydown', handleKeyDown)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (inputValue) {
            setIsLoading(true);
            getGamesSearchInfo(inputValue)
                .then((games: GamesResponse) => {
                    setGamesList(games.games)
                    setCountGames(games.count)
                })
                .finally(() => setIsLoading(false))
        } else hideSearchBox()
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
                        <div style={{ padding: '115px' }}><Spinner /></div> :
                        <>
                            <div>Games {countGames}</div>
                            {(inputValue && gamesList.slice(0, 7).map((game) =>
                                <SearchResult
                                    key={game.id}
                                    name={game.name}
                                    background_image={game.background_image}
                                    id={game.id}
                                />
                            ))}
                        </>
                    }
                </div>}

        </div>

    )
}

export default SearchPanel
