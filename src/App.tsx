import ReadJSONYAMLfile from './components/Readfile/Readfile'
import './sass/index.scss';

function App() {


  return (
    <>
      <div className="app-wrapper">
        <div className="read-file-wrapper">
            <ReadJSONYAMLfile />
        </div>
        <div>
          Editor
        </div>
      </div>
    </>
  )
}

export default App
