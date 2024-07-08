import Editor from '@monaco-editor/react';
import Spinner from 'react-bootstrap/Spinner';

interface MonacoEditorTypes {
    content: string | undefined
}
const MonacoEditor:React.FC<MonacoEditorTypes> = ({ content }) => {
    return(<>
        {
            content 
            ? <Editor height="100%" defaultLanguage="json" defaultValue={content} />
            : <div className="d-flex align-items-center justify-content-center h-100">
                <Spinner />
            </div>
        }
    </>)
}

export default MonacoEditor;