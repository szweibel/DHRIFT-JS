import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-r";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools"
import { useEffect, useRef } from "react";

export default function CodeEditorComponent({ code, onChange, maxLines = null, minLines = 4, debounce = null, width = '100%', ...props }) {


  const uniqueid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const height = props.height || '250px';


  return (
    <AceEditor
      className="editor"
      mode={props.language.toLowerCase()}
      theme="monokai"
      onChange={onChange}
      name={uniqueid}
      editorProps={{ $blockScrolling: true }}
      value={code}
      fontSize={22}
      width="auto"
      minLines={15}
      maxLines={'infinity'}
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={true}
      debounceChangePeriod={debounce}
      setOptions={{
        behavioursEnabled: true,
        wrapBehavioursEnabled: true,
        autoScrollEditorIntoView: true,
        wrap: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}
      onLoad={editorInstance => {
        setTimeout(() => {
          editorInstance.resize();
        }, 20);
        document.addEventListener("mouseup", e => (
          editorInstance.resize()
        ));
      }}
    />
  )
}