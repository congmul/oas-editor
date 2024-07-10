import React from 'react';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import ReadJSONYAMLfile from '../Readfile/Readfile';
import TooltipComponent from '../Tooltip/Tooltip';

interface LeftMenuTypes{
    setContent: React.Dispatch<React.SetStateAction<string | undefined>>
    leftMenuCollapse: boolean
    setLeftMenuCollapse: React.Dispatch<React.SetStateAction<boolean>>
}
const LeftMenu:React.FC<LeftMenuTypes> = ({setContent, leftMenuCollapse, setLeftMenuCollapse}) => {
    return(
        <div className="left-menu">
            <ReadJSONYAMLfile setContent={setContent} />

            <div className="collapse-handle-icon-wrapper">
              <div className="collapse-handle-icon">
                {
                    leftMenuCollapse
                    ?   <TooltipComponent message="Show more information" isButtonStyle={true} onClick={() => setLeftMenuCollapse(false) }>
                            <BsChevronDoubleRight className="icon" />
                        </TooltipComponent>
                    :   <TooltipComponent message="Show less information" isButtonStyle={true} onClick={() => setLeftMenuCollapse(true) } >
                            <BsChevronDoubleLeft className="icon" />
                        </TooltipComponent>
                }
              </div>
            </div>
        </div>
    )
}

export default LeftMenu;