import { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'

import './SearchPanel.scss'
import { SearchResult } from 'shared/ui';
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
    const [displayOn, setDisplayOn] = useState(false);

    const { getGamesSearchList } = API.gameService()

    const displayStyle = { display: displayOn ? 'inherit' : 'none' };

    const hideSearchBox = debounce(() => {
        setDisplayOn(false)
        setInputValue('')
        inputRef.current && (inputRef.current.value = '')
    }, 100)

    const inputRef = useRef<HTMLInputElement>(null);
    const handleInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue((e.target.value).trim())
    }, 400)

    useEffect(() => {
        inputValue && getGamesSearchList(inputValue).then((games: any) => setGamesList(games))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue])

    return (
        <div>
            <form className='search-form'>
                <input
                    onFocus={() => setDisplayOn(true)}
                    onBlur={hideSearchBox}
                    type="text"
                    placeholder="Искать здесь..."
                    className='search-form_input'
                    onChange={handleInput}
                    ref={inputRef} />
                <button
                    type="submit"
                    className='search-form_button'></button>
            </form>
            <div className='search-form-result' style={displayStyle}>
                {inputValue && gamesList.map((game) =>
                    <SearchResult
                        name={game.name}
                        background_image={game.background_image}
                        id={game.id}
                    />)}
            </div>
        </div>

    )
}

export default SearchPanel
