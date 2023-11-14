import { Link, generatePath } from 'react-router-dom';

import { ROUTES } from 'shared/consts'
import { Slider } from 'shared/ui/CardItem/Slider';

import './CardItem.scss'

interface Props {
    id: number,
    background_image: string,
    name: string
    short_screenshots: []
}

const CardItem = ({ id, background_image, name, short_screenshots }: Props) => {
    return (
        <div className='card__item'>
            <Slider background_image={background_image} short_screenshots={short_screenshots} />
            <Link
                to={(generatePath(ROUTES.GAME, { gameId: String(id) }))}
            >
                {name}
            </Link>
        </div>
    )
}


export default CardItem;