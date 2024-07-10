import Editor from '@monaco-editor/react';
import Spinner from 'react-bootstrap/Spinner';
import { SpectralLinter, applyErrorMarkers } from '../../../utils';
import { EditorTheme, EditorThemeData } from './monaco-editor.const';

interface MonacoEditorTypes {
    editorRef: any
    monacoRef: any
    content: string | undefined
    setContent: React.Dispatch<React.SetStateAction<string | undefined>>
}
const MonacoEditor:React.FC<MonacoEditorTypes> = ({ editorRef, monacoRef, content, setContent }) => {
    const { lintScan } = SpectralLinter();
    function handleEditorWillMount(monaco:any){
        monaco.editor.defineTheme(EditorTheme.LIGHT, EditorThemeData[EditorTheme.LIGHT]);
        monaco.editor.defineTheme(EditorTheme.DARK, EditorThemeData[EditorTheme.DARK]);
    }
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
            <Editor 
                beforeMount={handleEditorWillMount}
                onMount={handleEditorDidMount}
                // theme={EditorTheme.DARK}
                theme={EditorTheme.LIGHT}
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
        }
    </>)
}

export default MonacoEditor;