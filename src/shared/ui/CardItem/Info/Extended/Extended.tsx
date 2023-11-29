interface Props {
    released: string
    genres: []
}

const Extended = ({ released, genres }: Props) => {

    return (
        <div>
            <ul>
                <li style={{ display: 'flex' }}>
                    <div>Release date:</div>
                    <div>{released}</div>
                </li>
                <li style={{ display: 'flex' }}>
                    <div>Genres:</div>
                    <div>
                        {genres && genres.map((genr: any) => <span>{genr.name}</span>)}
                    </div>
                </li>
                <li>
                    <div>Chart:</div>
                    <div></div>
                </li>
            </ul>
            <button>Show more like this</button>
        </div>
    )
}

export default Extended;