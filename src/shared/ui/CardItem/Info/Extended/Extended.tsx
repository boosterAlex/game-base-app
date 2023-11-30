import './Extended.scss'

interface Props {
    released: string
    genres: []
}

const Extended = ({ released, genres }: Props) => {

    return (
        <div className='about-wrapper'>
            <ul className='about-game'>
                <li className="about-game-list">
                    <div className='about-game-list_term'>Release date:</div>
                    <div className='about-game-list_descr'>{released}</div>
                </li>
                <li className="about-game-list">
                    <div className='about-game-list_term'>Genres:</div>
                    <div className='about-game-list_descr'>
                        {genres && genres.map((genr: any, index: number) =>
                            (index !== genres.length - 1) ?
                                <span><a className='about-game-list_link' href={`/games/${genr.slug}`}>{genr.name}</a>, </span> :
                                <span><a className='about-game-list_link' href={`/games/${genr.slug}`}>{genr.name}</a></span>
                        )}
                    </div>
                </li>
                <li className='about-game-list'>
                    <div className='about-game-list_term'>Chart:</div>
                    <div className='about-game-list_descr'>#1</div>
                </li>
            </ul>
            <a className="show-more-button" href="/home">
                <span className='show-more-button_title'>Show more like this</span>
                <div className='show-more-button_icon'></div>
            </a>
        </div>
    )
}


// (index !== genres.length)? return <span>{genr.name}, </span> : <span>{genr.name}</span>
export default Extended;