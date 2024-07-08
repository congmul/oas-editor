import './sass/index.scss';
import ReadJSONYAMLfile from './components/Readfile/Readfile'
import MonacoEditor from './components/MonacoEditor/MonacoEditor';
import ReactSplitPane from './components/SplitPane/SplitPane';

function App() {


  return (
    <>
      <div className="app-wrapper">
        <div className="read-file-wrapper">
            <ReadJSONYAMLfile />
        </div>
        <div className="editor-wrapper">
          <ReactSplitPane
            size={200}
          >
            <MonacoEditor />
            <div>TEST</div>
          </ReactSplitPane>
        </div>
      </div>
    </>
  )
}

export default App
