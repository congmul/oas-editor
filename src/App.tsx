import './sass/index.scss';
import ReadJSONYAMLfile from './components/Readfile/Readfile'
import Editor from './components/Editor/Editor';
import ReactSplitPane from './components/SplitPane/SplitPane';

function App() {

  return (
    <>
      <div className="app-wrapper">
        <div className="read-file-wrapper">
            <ReadJSONYAMLfile />
        </div>
        <div className="editor-page-wrapper">
          <ReactSplitPane
            size={'50%'}
          >
            <Editor />
            <div className="p-2">OAS Specification</div>
          </ReactSplitPane>
        </div>
      </div>
    </>
  )
}

export default App
