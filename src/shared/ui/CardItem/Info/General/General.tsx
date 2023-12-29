import { Link, generatePath } from "react-router-dom";

import { ROUTES } from 'shared/consts'

import './General.scss'

interface Props {
    id: number
    name: string
    ratings_count: number
    parent_platforms: []
}

const General = ({ id, name, ratings_count, parent_platforms }: Props) => {

    return (
        <>
            <div className="about-game-platforms">
                {parent_platforms && parent_platforms.map((plat: any) =>
                    <div className={`about-game-platforms_icon ${plat.platform.slug}`}></div>)}
            </div>
            <div className="header">
                <Link className="header"
                    to={(generatePath(ROUTES.GAME, { gameId: String(id) }))}
                >
                    {name}
                </Link>
            </div>
            <div className="buttons__card">
                <button className="buttons__card-rating">
                    <span className="rating-img"></span>
                    <span className="rating">{ratings_count}</span>
                </button>
                <button className="buttons__card-wishlist">
                    <span className="wishlist-img"></span>
                </button>
                <button className="buttons__card-more">...</button>
            </div>
        </>

    )
}

export default General; 