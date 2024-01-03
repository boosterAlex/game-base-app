import React from 'react';
import { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'


import './SearchPanel.scss'
import { SearchResult, Spinner } from 'shared/ui';
import { API } from 'services'
import { generatePath, Link } from 'react-router-dom';
import { ROUTES } from 'shared/consts';


interface GamesListInfo {
    id: number
    name: string
    background_image: string
    parent_platforms: []
}

interface GamesResponse {
    count: number;
    list: GamesListInfo[];
}

const SearchPanel = React.memo(() => {

    const [inputValue, setInputValue] = useState<string>('')
    const [gamesList, setGamesList] = useState<GamesListInfo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isResultVisible, setIsResultVisible] = useState(false);
    const [countGames, setCountGames] = useState(0);

    const { getGamesSearchInfo } = API.gameService()

    const inputRef = useRef<HTMLInputElement>(null);
    const formResultRef = useRef<HTMLDivElement>(null)

    const hideSearchBox = () => {
        setInputValue('');
        inputRef.current && (inputRef.current.value = '');
        setGamesList([]);
        setIsResultVisible(false);
    };

    const handleInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue((e.target.value).trim())
        e.target.value.trim() &&
            setIsResultVisible(true)
    }, 500)

    useEffect(() => {
        const handleClickOutside = () => {
            if (formResultRef.current) {
                hideSearchBox()
            }
        };
        const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && handleClickOutside()

        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown)
        };
    }, []);

    console.log('render')

    useEffect(() => {
        if (inputValue) {
            setIsLoading(true);
            getGamesSearchInfo(inputValue)
                .then((games: GamesResponse) => {
                    setGamesList(games.list)
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

                    ref={formResultRef}
                    className='search-form-result'
                >
                    {isLoading ?
                        <div style={{ padding: '115px' }}><Spinner /></div> :
                        <>
                            <div className='search-form-result-title'>
                                <span className='search-form-result-title-info'>
                                    Games
                                    <span className='search-form-result-title-info_count'>{countGames}</span>
                                </span>
                            </div>
                            {(inputValue && gamesList.slice(0, 7).map((game) =>
                                <SearchResult
                                    key={game.id}
                                    name={game.name}
                                    background_image={game.background_image}
                                    parent_platforms={game.parent_platforms}
                                    id={game.id}
                                />
                            ))}
                            <Link className="header"
                                to={(generatePath(ROUTES.SEARCHEDGAME, { name: String(inputValue) }))}
                            >
                                All games..
                            </Link>
                        </>
                    }
                </div>}

        </div>

    )
})

export default React.memo(SearchPanel)
