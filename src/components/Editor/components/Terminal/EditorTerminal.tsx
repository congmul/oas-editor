import React, { useState, useRef, useEffect } from 'react';
import { BsXCircleFill } from "react-icons/bs";
import { NavigationService } from '../../../../utils';

interface EditorTerminalType {
    editorRef: React.MutableRefObject<undefined>
    lintErrors:any[]
}
const EditorTerminal:React.FC<EditorTerminalType> = ({editorRef, lintErrors}) => {
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
        // If there is no error, but there is warning, then display warning tab first.
        tempErrors.length > 0 && !(tempWarnings.length > 0) && setSelectedMenu('warning');
    }, [lintErrors])
    return(
        <div className="terminal-tabs-wrapper" ref={menuBarRef}>
            <div className="tabs-menu cursor-pointer">
                <ul className="d-flex ms-3 ps-0" style={{ height: "37px"}}>
                    <li className={`terminal-menu d-flex align-items-center 
                        ${selectedMenu === 'error' ? 'active' : ''}`}
                        onClick={() => setSelectedMenu('error')}
                    >
                        <div className="menu-text">
                            <span>ERROR</span>
                            <span className={`error-count d-flex align-items-center ${warnings.length > 0 && "error"}`}>{errors.length}</span>
                        </div>
                    </li>
                    <li className={`terminal-menu d-flex align-items-center 
                        ${selectedMenu === 'error' ? '' : 'active'}`}
                        onClick={() => setSelectedMenu('warning')}
                    >
                        <div className="menu-text">
                            <span>WARNING</span>
                            <span className={`error-count d-flex align-items-center ${warnings.length > 0 && "warning"}`}>{warnings.length}</span>
                        </div>
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
                                            (selectedMenu === 'error' ? errors : warnings).map((err: any, index:number) => {
                                                const { code, message, range, severity } = err;
                                                let renderedLine = range.start.line + 1;
                                                renderedLine = renderedLine && range.start.character ? `[Ln ${renderedLine}, Col ${range.start.character}}]` : `[Ln ${renderedLine}, Col 0]`
                                                return(
                                                    <tr key={`${code}-${index}`}
                                                        onClick={() => {
                                                            NavigationService.scrollToEditorLine(
                                                                editorRef.current,
                                                                range.start.line + 1 || 0,
                                                                range.start.character
                                                            )
                                                        }}
                                                    >
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
                                        {
                                            (selectedMenu === 'error' ? errors : warnings).length <= 0 
                                            && <tr>
                                                <td className="p-2 px-4">
                                                    <span className="me-2">
                                                        No {selectedMenu} has been detected.
                                                    </span>
                                                </td>
                                            </tr>
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