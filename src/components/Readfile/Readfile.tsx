import React, { useRef } from 'react';

interface ReadfileType {

}

const Readfile:React.FC<ReadfileType> = () => {
    const readFileBoxRef = useRef<HTMLDivElement>(null);

    function onDrop() {

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
    return(<>
        <div className="readfile-box" ref={readFileBoxRef} 
            onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}
        >            
            <div className="drag-box">
                <div>
                    Drag and drop or
                </div>
                <label htmlFor='upload-api-spec'>
                    <input id="upload-api-spec" type="file" accept="application/JSON, .yml, .yaml"></input>
                    <span>choose your file</span>
                </label>
            </div>
        </div>
    </>)
}

export default Readfile;