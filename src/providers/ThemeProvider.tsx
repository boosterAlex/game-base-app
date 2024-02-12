import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";

type TypeSetState<T> = Dispatch<SetStateAction<T>>

interface Context {
    themeColor: string
    setThemeColor: TypeSetState<string>
}

export const ThemeContext = createContext<Context>({ themeColor: 'dark', setThemeColor: () => { } })

const ThemeProvider = ({ children }: { children: JSX.Element }) => {

    const [themeColor, setThemeColor] = useState<string>(localStorage.getItem('themeColor') || 'dark')

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', themeColor)
        localStorage.setItem('themeColor', themeColor)
    }, [themeColor])

    return (
        <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider