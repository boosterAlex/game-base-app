import { Link, generatePath } from "react-router-dom";
import { ROUTES } from 'shared/consts'

import './SearchResult.scss'
interface Props {
    name: string
    background_image: string
    parent_platforms: []
    id: number
}

const SearchResult = ({ name, background_image, parent_platforms, id }: Props) => {

    return (
        <div className='search-form-result-item'>
            <a
                role="button"
                className='search-form-result-item_media'
                href={(generatePath(ROUTES.GAME, { gameId: String(id) }))}>
                <span
                    role="button"
                    className="search-form-result-item_media-img"
                    style={{ backgroundImage: `url(${background_image})` }}>
                </span>
            </a>
            <div className="search-form-result-item_info">
                <div className="search-form-result-item_info-platform">
                    <div className="about-game-platforms search">
                        {parent_platforms && parent_platforms.slice(0, 4).map((plat: any, index: number) => (
                            <div
                                key={index}
                                className={`about-game-platforms search_icon ${plat.platform.slug}`}
                            ></div>
                        ))}
                        {parent_platforms && parent_platforms.length > 4 && (
                            <div style={{ fontSize: '13px' }}>+{parent_platforms.length - 4}</div>
                        )}
                    </div>
                </div>
                <Link className="search-form-result-item_info-link"
                    to={(generatePath(ROUTES.GAME, { gameId: String(id) }))}
                >
                    {name}
                </Link>
            </div>

        </div>
    )
}

export default SearchResult