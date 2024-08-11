import { Box, Button } from "@mui/material";
import "./App.scss";
import PreviewVideo from "./components/PreviewVideo";
import SourceVideo from "./components/SourceVideo";
import { useState } from "react";

const App = (props) => {
  const [cropMode, setCropMode] = useState(false);
  return (
    <>
    <Box className="video-container">
      <Box className="left-container divided-container">
        <SourceVideo cropMode={cropMode} />
      </Box>
      <Box className="right-container divided-container">
        <PreviewVideo />
      </Box>
    </Box>
    <Box className="cta-container">
    <Box className="left-container divided-container">
        <Button color="primary" variant="contained" disabled={cropMode} onClick={() => setCropMode(prev => !prev)}>
            Start Cropper
        </Button>
        <Button color="primary" variant="contained" disabled={!cropMode} onClick={() => setCropMode(prev => !prev)}>
            Remove Cropper
        </Button>
        <Button color="primary" variant="contained" disabled={!cropMode}>
            Generate Preview
        </Button>
      </Box>
      <Box className="right-container divided-container">
      <Button color="secondary" variant="contained" >
            Cancel
        </Button>
      </Box>
    </Box>
    </>
  );
};

export default App;
