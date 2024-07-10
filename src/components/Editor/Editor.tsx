import { useState, useRef } from 'react';
import MonacoEditor from './components/MonacoEditor';
import ReactSplitPane from '../SplitPane/SplitPane';
import EditorTerminal from "../Editor/components/Terminal/EditorTerminal";
import { SpectralLinter, applyErrorMarkers } from '../../utils';
import { useEffect } from 'react';

interface EditorTypes {
    content: string | undefined
    setContent: React.Dispatch<React.SetStateAction<string | undefined>>
    currentTheme: string
}
const Editor:React.FC<EditorTypes> = ({ content, setContent, currentTheme }) => {
    const editorRef = useRef();
    const monacoRef = useRef();
    const { lintScan } = SpectralLinter();
    const [ lintErrors, setLintErrors ] = useState<any[]>([]);

    useEffect(() => {
        content != null && lintScan(content).then((res:any) => {
            setLintErrors(res);
            applyErrorMarkers(res, editorRef.current, monacoRef.current)
        });
    }, [content])

    return(<>
        <ReactSplitPane
            split="horizontal"
            minSize={30}
            size={'80%'}
        >
            <div className="monaco-editor-wrapper">
            {content != null && <MonacoEditor editorRef={editorRef} monacoRef={monacoRef} content={content} setContent={setContent} currentTheme={currentTheme} />}
            </div>
            <EditorTerminal editorRef={editorRef} lintErrors={lintErrors} />
        </ReactSplitPane>
    </>)
}

export default Editor;