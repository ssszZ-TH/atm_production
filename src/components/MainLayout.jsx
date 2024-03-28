import { useContext } from "react";
import {ThemeContext} from "../context/ThemeContext"

function MainLayout(params) {
    const {theme,setTheme} = useContext(ThemeContext);
    return(
        <><p>{theme}</p></>
    );
}
export {MainLayout}