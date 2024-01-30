import { Dispatch, SetStateAction, createContext, useMemo, useState } from "react";

type TypeSetState<T> = Dispatch<SetStateAction<T>>

interface Context {
    isLight: boolean
    setIsLight: TypeSetState<boolean>
}

export const ThemeContext = createContext<Context>({ isLight: false, setIsLight: () => { } })

const ThemeProvider = ({ children }: any) => {

    const [isLight, setIsLight] = useState<boolean>(false)

    const value = useMemo(() => ({ isLight, setIsLight }), [isLight])

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider