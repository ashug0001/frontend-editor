import { useState } from "react";
import AceEditor from "react-ace";
import { initialSource } from "./initialSource";
import useMediaQuery from "./useMediaQuery";
import saveFile from "./saveFile";

function App() {
  const [source, setSource] = useState(initialSource);
  const [sourceDoc, setSourceDoc] = useState(initialSource);
  const [isDark, setIsDark] = useState(false);
  const belowMD = useMediaQuery("(max-width: 767px)");

  const handleRun = () => {
    setSourceDoc(source);
  };

  const handleSave = () => {
    saveFile(source);
  };

  const toggleMode = () => {
    const html = document.getElementsByTagName("html")[0];
    setIsDark((ps) => {
      html.setAttribute("theme", !ps ? "dark" : "light");
      return !ps;
    });
  };

  return (
    <>
      <div className="root">
        <ul className="header_list">
          <li className="list_items">
            <button className="list_item" onClick={handleSave}>
              Save
            </button>
          </li>
          <li className="list_items">
            <button className="list_item" onClick={toggleMode}>
              {isDark ? "Light" : "Dark"} Mode
            </button>
          </li>
          <li className="list_items">
            <button className="list_item run" onClick={handleRun}>
              Run
            </button>
          </li>
        </ul>
      </div>
      <div className="editor">
        <AceEditor
          className="editor_input"
          placeholder="Placeholder Text"
          mode="html"
          theme={isDark ? "monokai" : "github"}
          onChange={setSource}
          value={source}
          height="100%"
          width={belowMD ? "100%" : "50%"}
        />
        <iframe
          title="Output Frame"
          srcDoc={sourceDoc}
          className="output_frame"
        />
      </div>
    </>
  );
}

export default App;
