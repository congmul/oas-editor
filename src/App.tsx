import { useEffect, useState } from 'react';
import './sass/index.scss';
import ReadJSONYAMLfile from './components/Readfile/Readfile'
import Editor from './components/Editor/Editor';
import ReactSplitPane from './components/SplitPane/SplitPane';
import SwaggerUI from 'swagger-ui-react';

function App() {
  const [ content, setContent ] = useState<string | undefined>();

  useEffect(() => {
    // Check IndexedDB to grab API Specification
    // if there is no exsiting spec.
    const initialSpec = {
      "openapi":"3.1.0",
      "info": {
        "title": "my api specification"
      }
    }
    
    setContent(JSON.stringify(initialSpec, null, 2));
  }, [])
  return (
    <>
      <div className="app-wrapper">
        <div className="read-file-wrapper">
            <ReadJSONYAMLfile setContent={setContent} />
        </div>
        <div className="editor-page-wrapper">
          <ReactSplitPane
            size={'50%'}
          >
            <Editor content={content} setContent={setContent} />
            <div className="p-2">
              <SwaggerUI spec={content} />
            </div>
          </ReactSplitPane>
        </div>
      </div>
    </>
  )
}

export default App
