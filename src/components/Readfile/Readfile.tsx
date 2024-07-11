import React, { useState, useRef } from 'react';
import { useHandleReadFileStatus } from './ReadfileReducer';
import { Card, Button, Modal } from 'react-bootstrap';
import { BsXCircle, BsFileEarmark } from "react-icons/bs";
import TooltipComponent from '../Tooltip/Tooltip';
import IndexedDB from '../../utils/indexedDB';

interface ReadJSONYAMLfileType {
    isMulipleFiles?: boolean
    setContent: React.Dispatch<React.SetStateAction<string | undefined>>
    closeModal?: () => void
}

const ReadJSONYAMLfile:React.FC<ReadJSONYAMLfileType> = ({setContent, isMulipleFiles = false, closeModal}) => {
    const readFileBoxRef = useRef<HTMLDivElement>(null);
    const [ fileName, setFileName ] = useState();
    const [ fileType, setFileType ] = useState('json');
    const [ selectedSpec, setSelectedSpec ] = useState();
    const { isJsonYamlFile, reset, setIsJsonYamlFile } = useHandleReadFileStatus();
    const indexedDBIns = new IndexedDB('editor-db', 'editorContent', 'content');

    function onDrop(event: any) {
        event.preventDefault();
        // use dataTransfer to access dragged and dropped files 
        const fileKind = event.dataTransfer.items[0].kind;
        const fileType = event.dataTransfer.items[0].type;
        // Check if the file extension is json or yaml or not. If not, display error message.
        if(fileKind === "file" && (fileType === "application/json" || fileType === "application/x-yaml")){
            // handle file
            setIsJsonYamlFile(true);
            if(event.dataTransfer.items){
                if(isMulipleFiles){
                    // read all files
                    for(let i = 0; i < event.dataTransfer.items.length; i++){
                        if(event.dataTransfer.items[i].kind === "file"){
                            let file = event.dataTransfer.items[i].getAsFile();
                            console.log(file);
                        }
                    }
                }else{
                    const file = event.dataTransfer.items[0].getAsFile();
                    handleFileChosen(file);
                }
            }
            // Provides a list of the files being dragged and dropped. Each file is an instance of File
            if(isMulipleFiles && event.dataTransfer.files){
                console.log(event.dataTransfer.files.length);

            }
        }else{
            // handle invalid file
            dangerBorderStyle();
            setIsJsonYamlFile(false);
            setFileName(undefined);

            // Reset status and styles
            setTimeout(() => {
                reset();
                resetBorderStyle();
            }, 2000)
        }

        // Pass event to removeDragData for clean up
        removeDragData(event);
    }
    function onDragOver(event:any) {
        event.preventDefault();
        if(readFileBoxRef.current != null) {
            readFileBoxRef.current.style.border = "2px solid var(--color-background-success)";
        }
    }
    function onDragLeave(event:any) {
        event.preventDefault();
        if(readFileBoxRef.current != null) {
            readFileBoxRef.current.style.border = "2px dashed var(--color-background-border)";
        }
    }
    function removeDragData(event: any){ 
        // Removing drag data
        if(event.dataTransfer.items){
            event.dataTransfer.items.clear();
        }else{
            event.dataTransfer.clearData();
        }
    }
    function dangerBorderStyle() {
        if(readFileBoxRef.current != null) {
            readFileBoxRef.current.style.border = "2px solid var(--color-background-danger)";
        }
    }
    function resetBorderStyle() {
        if(readFileBoxRef.current != null) {
            readFileBoxRef.current.style.border = "1px solid var(--color-background-border)";
        }
    }
    function handleFileChosen(file:any) {
        const fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        if(file == null || !(file.type === "application/json" || file.type === "application/x-yaml")) return;
        
        file.type === "application/json" ? setFileType('json') : setFileType('yaml');

        // TODO: need to store file format globally
        console.log(fileType);
        setFileName(file.name);
        fileReader.readAsText(file);
    }
    function handleFileRead(event:any) {
        const content = event.currentTarget.result;
        setSelectedSpec(content);
    }
    function closeFileOnclick() {
        setFileName(undefined);
        reset();        
        resetBorderStyle();
    }
    function importOnClick() {
        setContent(undefined);
        setTimeout(() => {
            setContent(selectedSpec);
            indexedDBIns.saveContentToDB(JSON.parse(selectedSpec!));
            closeFileOnclick();
            closeModal && closeModal();
        }, 500)
    }
    return(<div className="read-file-wrapper">
    <Card>
        <Card.Body>
            <Card.Title><BsFileEarmark /> Import API Specification</Card.Title>
            <div className="readfile-box mt-3" ref={readFileBoxRef} 
                onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}
            >
                {
                    isJsonYamlFile               
                    ?
                        <div className="drag-box">
                            <div>
                                Drag and drop or
                            </div>
                            <label htmlFor='upload-api-spec'>
                                <input id="upload-api-spec" type="file" accept="application/JSON, .yml, .yaml" onChange={(e:any) => handleFileChosen(e.target.files[0])}></input>
                                <span>choose your file</span>
                            </label>
                        </div>
                    : <div>
                        <span style={{height: "21px"}}>
                            Allow Only YAML or JSON
                        </span>
                    </div>
                }
                {
                    fileName !== undefined &&
                    <div className="select-file-wrapper">
                        <div className="select-file">
                            Selected "{fileName}"
                        </div>
                        <BsXCircle className="close-icon" onClick={closeFileOnclick} />
                    </div>
                }
            </div>
            <div className="readfile-import-btn-wrapper">
                <Button disabled={fileName === undefined} onClick={importOnClick}>Import</Button>
            </div>
        </Card.Body>
    </Card>
    </div>)
}

const ICONReadJSONYAMLfile:React.FC<{setContent: React.Dispatch<React.SetStateAction<string | undefined>>}> = ({ setContent }) => {
    const [ show, setShow ] = useState(false);

    return(<>
        <div className="read-file-wrapper collased" onClick={() => setShow(true)}>
            <TooltipComponent message="Import API Specification" placement='auto' isButtonStyle={true}>
                <BsFileEarmark />
            </TooltipComponent>
        </div>
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Body><ReadJSONYAMLfile setContent={setContent} closeModal={() => setShow(false)} /></Modal.Body>
        </Modal>
    </>)
}

export { ICONReadJSONYAMLfile };
export default ReadJSONYAMLfile;