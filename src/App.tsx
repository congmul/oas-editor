import { useEffect, useState } from 'react';
import './sass/index.scss';
import LeftMenu from './components/LeftMenu/LeftMenu';
import Editor from './components/Editor/Editor';
import ReactSplitPane from './components/SplitPane/SplitPane';
import SwaggerUI from 'swagger-ui-react';
import petStoreAPISpec from './assets/petstore.apispec.json';


function App() {
  const [ content, setContent ] = useState<string | undefined>();
  const [ leftMenuCollapse, setLeftMenuCollapse] = useState(false);

  useEffect(() => {
    // Check IndexedDB to grab API Specification
    // if there is no exsiting spec.
    setContent(JSON.stringify(petStoreAPISpec, null, 2));
  }, [])
  return (
    <>
      <div className="app-wrapper">
        <LeftMenu setContent={setContent} leftMenuCollapse={leftMenuCollapse} setLeftMenuCollapse={setLeftMenuCollapse} />
        <div className="editor-page-wrapper">
          <ReactSplitPane
            size={'50%'}
          >
            <Editor content={content} setContent={setContent} />
            <div className="p-2 vh-100" style={{overflowY: "auto"}}>
              <SwaggerUI spec={content} />
            </div>
          </ReactSplitPane>
        </div>
      </div>
    </>
  )
}

export default App
