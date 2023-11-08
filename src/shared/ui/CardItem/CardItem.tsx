import { Link, generatePath } from 'react-router-dom';

import { ROUTES } from 'shared/consts'

interface Props {
    id: number,
    background_image: string,
    name: string
}


const CardItem = ({ id, background_image, name }: Props) => {
    return (
        <div className='game__item'>
            <li key={id}>
                <img src={background_image} alt={name} />
            </li >
            <Link
                to={(generatePath(ROUTES.GAME, { gameId: String(id) }))}
            >
                {name}
            </Link>

        </div>
    )
}


export default CardItem;