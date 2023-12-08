import { Link, generatePath } from "react-router-dom";
import { ROUTES } from 'shared/consts'


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
            <li>
                <Link className="search-form-result-item_name"
                    to={(generatePath(ROUTES.GAME, { gameId: String(id) }))}
                >
                    {name}
                </Link>
            </li>
        </div>
    )
}

export default SearchResult