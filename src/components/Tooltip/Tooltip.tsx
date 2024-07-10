import React from 'react';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import { Placement } from "react-bootstrap/esm/types"

interface TooltipComponentType {
    placement?: Placement
    message: string
    children: React.ReactNode
    isButtonStyle?: boolean
    onClick?: () => void
} 
const TooltipComponent:React.FC<TooltipComponentType> = ({ message, children, placement='auto', isButtonStyle=false, onClick }) => {
    const renderTooltip = (props:any) => (
        <Tooltip {...props}>
        {message}
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement={placement}
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
            {
                isButtonStyle
                ?
                    <Button variant="secondary" onClick={onClick}>
                        {children}
                    </Button>
                : 
                    <span className={`${onClick != null && "hover"}`} onClick={onClick}>
                        {children}
                    </span>
            }
        </OverlayTrigger>
    );
};

export default TooltipComponent;