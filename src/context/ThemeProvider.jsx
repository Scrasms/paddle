import { useState } from "react"
import { ThemeContext } from "./ThemeContext.jsx"

function ThemeProvider({children}) {
    const themeList = ["default", "candy", "cookie", "hacker", "royal", "panda"]
    const [themeNo, setThemeNo] = useState(0)

    return (
        <ThemeContext.Provider value={{ themeList, themeNo, setThemeNo }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider