import { useRef } from 'react';
import MonacoEditor from './components/MonacoEditor';
import ReactSplitPane from '../SplitPane/SplitPane';
import { SpectralLinter, applyErrorMarkers } from '../../utils';
import { useEffect } from 'react';

interface EditorTypes {
    content: string | undefined
    setContent: React.Dispatch<React.SetStateAction<string | undefined>>
}
const Editor:React.FC<EditorTypes> = ({ content, setContent }) => {
    const editorRef = useRef();
    const monacoRef = useRef();
    const { lintScan } = SpectralLinter();

    useEffect(() => {
        content && lintScan(content).then((res:any) => {
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
                <MonacoEditor editorRef={editorRef} monacoRef={monacoRef} content={content} setContent={setContent} />
            </div>
            <div>Terminal</div>
        </ReactSplitPane>
    </>)
}

export default Editor;