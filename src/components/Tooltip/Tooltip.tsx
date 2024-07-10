import React from 'react';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import { Placement } from "react-bootstrap/esm/types"

interface TooltipComponentType {
    placement?: Placement
    message: string
    children: React.ReactNode
} 
const TooltipComponent:React.FC<TooltipComponentType> = ({ message, children, placement='top' }) => {
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
        <Button variant="secondary">
            {children}
        </Button>
        </OverlayTrigger>
    );
};

export default TooltipComponent;