import { BsCodeSquare } from "react-icons/bs";

const Header:React.FC = ({}) => {
    return(
        <header>
            <div className="header-wrapper">
                <div><BsCodeSquare /> OpenAPI Specification Editor</div>
            </div>
        </header>
    )
}

export default Header;