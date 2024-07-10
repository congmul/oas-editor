import React, { useRef } from 'react';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import ReadJSONYAMLfile, { ICONReadJSONYAMLfile } from '../Readfile/Readfile';
import TooltipComponent from '../Tooltip/Tooltip';

interface LeftMenuTypes{
    setContent: React.Dispatch<React.SetStateAction<string | undefined>>
    leftMenuCollapse: boolean
    setLeftMenuCollapse: React.Dispatch<React.SetStateAction<boolean>>
}
const LeftMenu:React.FC<LeftMenuTypes> = ({setContent, leftMenuCollapse, setLeftMenuCollapse}) => {
    const leftMenuRef:React.RefObject<HTMLDivElement> = useRef(null);

    function handleCollapse() {
        if(!leftMenuRef.current) return;
        if(!leftMenuCollapse){
            leftMenuRef.current.style.flex = "0 0 65px";
            leftMenuRef.current.style.width = "65px";
        }else{
            leftMenuRef.current.style.flex = "0 0 349px";
            leftMenuRef.current.style.width = "349px";        
        }
        setLeftMenuCollapse((pre) => !pre);
    }
    return(
        <div className="left-menu" ref={leftMenuRef}>
            {
                leftMenuCollapse
                ?   <ICONReadJSONYAMLfile setContent={setContent} />
                :   <ReadJSONYAMLfile setContent={setContent} />
            }

            <div className="collapse-handle-icon-wrapper">
              <div className="collapse-handle-icon">
                {
                    leftMenuCollapse
                    ?   <TooltipComponent message="Show more information" isButtonStyle={true} onClick={handleCollapse}>
                            <BsChevronDoubleRight className="icon" />
                        </TooltipComponent>
                    :   <TooltipComponent message="Show less information" isButtonStyle={true} onClick={handleCollapse} >
                            <BsChevronDoubleLeft className="icon" />
                        </TooltipComponent>
                }
              </div>
            </div>
        </div>
    )
}

export default LeftMenu;