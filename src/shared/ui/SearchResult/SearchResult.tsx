import { Link, generatePath } from "react-router-dom";
import { ROUTES } from 'shared/consts'

import './SearchResult.scss'
interface Props {
    name: string
    background_image: string
    id: number
}

const SearchResult = ({ name, background_image, id }: Props) => {

    return (
        <div className='search-form-result-item'>
            <img
                style={{ width: '45px', margin: '5px' }}
                src={background_image}
                alt="" />
            <li className="search-form-result-item-name">
                <Link className="search-form-result-item-name_link"
                    to={(generatePath(ROUTES.GAME, { gameId: String(id) }))}
                >
                    {name}
                </Link>
            </li>
        </div>
    )
}

export default SearchResult