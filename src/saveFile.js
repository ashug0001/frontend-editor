import { saveAs } from "file-saver";

const saveFile = (string) => {
  const blob = new Blob([string], { type: "text/plan;charset=utf-8" });
  saveAs(blob, "dowload.txt");
};

export default saveFile;
