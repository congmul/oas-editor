import Editor from '@monaco-editor/react';
import Spinner from 'react-bootstrap/Spinner';
import { SpectralLinter, applyErrorMarkers } from '../../../utils';

interface MonacoEditorTypes {
    editorRef: any
    monacoRef: any
    content: string | undefined
    setContent: React.Dispatch<React.SetStateAction<string | undefined>>
}
const MonacoEditor:React.FC<MonacoEditorTypes> = ({ editorRef, monacoRef, content, setContent }) => {
    const { lintScan } = SpectralLinter();
    function handleEditorDidMount(editor:any, monaco:any) {
        editorRef.current = editor;
        monacoRef.current = monaco;
        editorRef.current.setValue(content);
        editorRef.current.onDidChangeModelContent(onChange);
        content && lintScan(content).then((res:any) => {
            applyErrorMarkers(res, editorRef.current, monacoRef.current)
        });
    }
    function onChange() {
        const editorValue = editorRef.current?.getValue();
        setContent(editorValue);
    }
    return(<>
        {
            content 
            ? <Editor 
                onMount={handleEditorDidMount}
                height="100%"
                defaultLanguage="json"
                language='json'
                loading={<Spinner />}
                options={{
                    wordWrap: "on",
                    smoothScrolling: true,
                    foldingStrategy: "indentation"
                }}
            />
            : <div className="d-flex align-items-center justify-content-center h-100">
                <Spinner />
            </div>
        }
    </>)
}

export default MonacoEditor;