import { Link, generatePath } from 'react-router-dom';

import { ROUTES } from 'shared/consts'
import { Slider } from 'shared/ui/CardItem/Slider';

import './CardItem.scss'

interface Props {
    id: number,
    background_image: string,
    name: string
}

const CardItem = ({ id, background_image, name }: Props) => {

    console.log(id, name)
    return (
        <div className='card__item'>
            <Slider id={id} background_image={background_image} />
            <Link
                to={(generatePath(ROUTES.GAME, { gameId: String(id) }))}
            >
                {name}
            </Link>
        </div>
    )
}


export default CardItem;