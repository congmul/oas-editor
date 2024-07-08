import MonacoEditor from './components/MonacoEditor';
import ReactSplitPane from '../SplitPane/SplitPane';

interface EditorTypes {
    content: string | undefined
}
const Editor:React.FC<EditorTypes> = ({ content }) => {
    return(<>
        <ReactSplitPane
            split="horizontal"
            minSize={30}
            size={'80%'}
        >
            <div className="monaco-editor-wrapper">
                <MonacoEditor content={content} />
            </div>
            <div>Terminal</div>
        </ReactSplitPane>
    </>)
}

export default Editor;