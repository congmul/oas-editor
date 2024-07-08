import Editor from '@monaco-editor/react';

interface MonacoEditorTypes {

}
const MonacoEditor:React.FC<MonacoEditorTypes> = ({}) => {
    return(<>
        <Editor height="100%" defaultLanguage="json" defaultValue="{test:test}" />
    </>)
}

export default MonacoEditor;