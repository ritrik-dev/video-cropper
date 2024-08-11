import { Box, Button } from "@mui/material";
import "./App.scss";
import PreviewVideo from "./components/PreviewVideo";
import SourceVideo from "./components/SourceVideo";
import { useRef, useState } from "react";

const App = (props) => {
  const [cropMode, setCropMode] = useState(false);
  const [recordedData, setRecordedData] = useState([]);
  const videoRef = useRef();
  const previewCanvasRef = useRef();
  const [viewState, setViewState] = useState("generate");

  const handleGeneratePreview = () => {
    const jsonData = JSON.stringify(recordedData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "video_crop_data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Box className="cta-container">
        <Box className="view-state">
          <Button
            color={viewState === "preview" ? "success" : "secondary"}
            variant="contained"
            onClick={() => setViewState("preview")}
          >
            Preview Session
          </Button>
          <Button
            color={viewState === "generate" ? "success" : "secondary"}
            variant="contained"
            onClick={() => setViewState("generate")}
          >
            Generate Session
          </Button>
        </Box>
      </Box>
      {viewState === "generate" ? (
        <>
          <Box className="video-container">
            <Box className="left-container divided-container">
              <SourceVideo
                cropMode={cropMode}
                videoRef={videoRef}
                previewCanvasRef={previewCanvasRef}
                setRecordedData={setRecordedData}
              />
            </Box>
            <Box className="right-container divided-container">
              <PreviewVideo
                cropMode={cropMode}
                previewCanvasRef={previewCanvasRef}
              />
            </Box>
          </Box>
          <Box className="cta-container">
            <Box className="left-container divided-container">
              <Button
                color="primary"
                variant="contained"
                disabled={cropMode}
                onClick={() => setCropMode((prev) => !prev)}
              >
                Start Cropper
              </Button>
              <Button
                color="primary"
                variant="contained"
                disabled={!cropMode}
                onClick={() => setCropMode((prev) => !prev)}
              >
                Remove Cropper
              </Button>
              <Button
                color="primary"
                variant="contained"
                disabled={!cropMode}
                onClick={handleGeneratePreview}
              >
                Generate Preview
              </Button>
            </Box>
            <Box className="right-container divided-container">
              <Button color="secondary" variant="contained">
                Cancel
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <h1>preview</h1>
      )}
    </>
  );
};

export default App;
