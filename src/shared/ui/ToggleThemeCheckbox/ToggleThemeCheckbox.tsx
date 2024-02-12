import { useTheme } from 'shared/lib/hooks'
import './ToggleThemeCheckbox.scss'


const ToggleThemeCheckbox = () => {

    const { themeColor, setThemeColor } = useTheme()

    return (
        <div className="toggle-container">
            <p className="change-text">{(themeColor === 'dark') ? 'Dark' : 'Light'}</p>
            <input
                type="checkbox"
                id="toggle-btn"
                onChange={() => {
                    setThemeColor(prev => (prev === 'dark' ? 'light' : 'dark'))
                }} />
            <label htmlFor="toggle-btn" className="toggle-label"></label>
        </div>
    )
}

export default ToggleThemeCheckbox