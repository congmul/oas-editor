import Editor from '@monaco-editor/react';
import Spinner from 'react-bootstrap/Spinner';
import { SpectralLinter, applyErrorMarkers } from '../../../utils';
import { Theme, EditorThemeData } from '../../../utils/theme.cont';

interface MonacoEditorTypes {
    editorRef: any
    monacoRef: any
    content: string | undefined
    setContent: React.Dispatch<React.SetStateAction<string | undefined>>
    currentTheme: string
}
const MonacoEditor:React.FC<MonacoEditorTypes> = ({ editorRef, monacoRef, content, setContent, currentTheme }) => {
    const { lintScan } = SpectralLinter();
    function handleEditorWillMount(monaco:any){
        monaco.editor.defineTheme(Theme.LIGHT, EditorThemeData[Theme.LIGHT]);
        monaco.editor.defineTheme(Theme.DARK, EditorThemeData[Theme.DARK]);
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
                theme={currentTheme || 'LIGHT'}
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