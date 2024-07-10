import { BsCodeSquare } from "react-icons/bs";
import { useLocalStorageState } from '../../utils';
import { DarkModeSVG, LightModeSVG } from "../../assets/svg";
import { Theme } from "../../utils/theme.cont";
import TooltipComponent from "../Tooltip/Tooltip";

interface HeaderType {
    setCurrentTheme: React.Dispatch<string>
}
const Header:React.FC<HeaderType> = ({setCurrentTheme}) => {
    const [ themeState, setThemeState ] = useLocalStorageState('theme');
    return(
        <header>
            <div className="header-wrapper">
                <div><BsCodeSquare /> OpenAPI Specification Editor</div>
                <div>
                    {themeState === Theme.LIGHT 
                        ? 
                            <TooltipComponent message="Dark theme" onClick={() => {setThemeState(Theme.DARK); setCurrentTheme(Theme.DARK);}}>
                                <LightModeSVG /> 
                            </TooltipComponent>
                        : 
                            <TooltipComponent message="Light theme" onClick={() => {setThemeState(Theme.LIGHT); setCurrentTheme(Theme.LIGHT);}}>
                                <DarkModeSVG /> 
                            </TooltipComponent>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header;