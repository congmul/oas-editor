import React, { useState, useRef, useEffect } from 'react';
import { BsXCircleFill } from "react-icons/bs";

interface EditorTerminalType {
    lintErrors:any[]
}
const EditorTerminal:React.FC<EditorTerminalType> = ({lintErrors}) => {
    const menuBarRef:any = useRef();
    const [ selectedMenu, setSelectedMenu ] = useState('error');
    const [ errors, setErrors ] = useState<any[]>([]);
    const [ warnings, setWarnings ] = useState<any[]>([]);

    useEffect(() => {
        const tempErrors:any[] = [];
        const tempWarnings:any[] = []; 
        lintErrors.forEach((error:any) => {
            if(error.severity === 0) {
                tempErrors.push(error);
            }else{
                tempWarnings.push(error);
            }
        })
        setErrors(tempErrors);
        setWarnings(tempWarnings);
    }, [lintErrors])
    return(
        <div className="terminal-tabs-wrapper" ref={menuBarRef}>
            <div className="tabs-menu cursor-pointer">
                <ul className="d-flex ms-3 ps-0" style={{ height: "37px"}}>
                    <li className={`terminal-menu d-flex align-items-center 
                        ${selectedMenu === 'error' ? 'active' : ''}`}
                        onClick={() => setSelectedMenu('error')}
                    >
                        <div className="menu-text">Error</div>
                    </li>
                    <li className={`terminal-menu d-flex align-items-center 
                        ${selectedMenu === 'error' ? '' : 'active'}`}
                        onClick={() => setSelectedMenu('warning')}
                    >
                        <div className="menu-text">Warning</div>
                    </li>
                </ul>
            </div>
            <div className="message-box">
                <ul>
                    <li>
                        <div className="terminal-error-table">
                            <div className="mt-1">
                                <table className="border-collapse w-100">
                                    <tbody>
                                        {
                                            (selectedMenu === 'error' ? errors : warnings).map((err: any) => {
                                                const { code, message, path, range, severity } = err;
                                                console.log(path);
                                                let renderedLine = range.start.line + 1;
                                                renderedLine = renderedLine && range.start.character ? `[Ln ${renderedLine}, Col ${range.start.character}}]` : `[Ln ${renderedLine}, Col 0]`
                                                return(
                                                    <tr>
                                                        <td className="p-2 px-4">
                                                            <span className="me-2">
                                                                {
                                                                    severity === 0
                                                                    ? <BsXCircleFill className="error" />
                                                                    : <BsXCircleFill className="warning" />
                                                                }
                                                            </span>
                                                            <span className="me-2">{message || '-'}</span>
                                                            <span className="me-2">{[code]}</span>
                                                            <span className="me-2">{renderedLine || '-'}</span>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default EditorTerminal;