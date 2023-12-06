import { Slider } from './Slider';
import { General, Extended } from './Info';


import './CardItem.scss'

interface Props {
    id: number,
    background_image: string,
    name: string
    short_screenshots: []
    ratings_count: number
    parent_platforms: []
    released: string
    genres: []
}

const CardItem = ({ id, background_image, name, short_screenshots, ratings_count, parent_platforms, released, genres }: Props) => {
    return (
        <div className='wrapper-card'>
            <div className='wrapper-card_img'>
                <Slider
                    background_image={background_image}
                    short_screenshots={short_screenshots} />
            </div>
            <div className='wrapper-card-general-info'>
                <General
                    id={id}
                    name={name}
                    ratings_count={ratings_count}
                    parent_platforms={parent_platforms} />
                <Extended
                    released={released}
                    genres={genres}
                />
            </div>
        </div>
    )
}


export default CardItem;
