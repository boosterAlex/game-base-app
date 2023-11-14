import { Description, ScreenshotList } from "pages/AboutGame"

const AboutGame = () => {

    return (

        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Description />
            <ScreenshotList />
        </div>
    )
}

export default AboutGame