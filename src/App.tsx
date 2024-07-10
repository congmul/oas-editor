import { useEffect, useRef, useState } from 'react';
import './sass/index.scss';
import LeftMenu from './components/LeftMenu/LeftMenu';
import Editor from './components/Editor/Editor';
import ReactSplitPane from './components/SplitPane/SplitPane';
import SwaggerUI from 'swagger-ui-react';
import petStoreAPISpec from './assets/petstore.apispec.json';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


function App() {
  const [ content, setContent ] = useState<string | undefined>();
  const [ leftMenuCollapse, setLeftMenuCollapse] = useState(false);
  const rightMenuRef:React.RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    // Check IndexedDB to grab API Specification
    // if there is no exsiting spec.
    setContent(JSON.stringify(petStoreAPISpec, null, 2));
  }, [])

  useEffect(() => {
    if(!rightMenuRef.current) return;
    if(!leftMenuCollapse){
        rightMenuRef.current.style.width = "calc(100vw - 350px)";
    }else{
      rightMenuRef.current.style.width = "calc(100vw - 65px)";
    }
  }, [leftMenuCollapse])
  return (
    <>
      <Header />
      <div className="app-wrapper">
        <LeftMenu setContent={setContent} leftMenuCollapse={leftMenuCollapse} setLeftMenuCollapse={setLeftMenuCollapse} />
        <div className="editor-page-wrapper" ref={rightMenuRef}>
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
      <Footer />
    </>
  )
}

export default App
