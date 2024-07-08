import MonacoEditor from './components/MonacoEditor';
import ReactSplitPane from '../SplitPane/SplitPane';

interface EditorTypes {

}
const Editor:React.FC<EditorTypes> = ({}) => {
    return(<>
        <ReactSplitPane
            split="horizontal"
            minSize={30}
            size={'80%'}
        >
            <div className="monaco-editor-wrapper">
                <MonacoEditor />
            </div>
            <div>Terminal</div>
        </ReactSplitPane>
    </>)
}

export default Editor;