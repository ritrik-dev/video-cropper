import { Box, Typography } from "@mui/material";
import React from "react";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

const PreviewVideo = (props) => {
  const { previewCanvasRef, cropMode } = props;
  return (
    <Box className="preview-video">
      {cropMode ? (
        <Box className="canvas-container">
          <canvas ref={previewCanvasRef} className="video-preview"></canvas>
        </Box>
      ) : (
        <Box className="no-preview-container">
          <OndemandVideoIcon sx={{color: "white"}} fontSize="large"/>
          <Typography variant="body1" sx={{color: "white"}}>Preview not available</Typography>
          <Typography variant="body1" sx={{color: "#9BA6AB"}}>Please click on “Start Cropper”<br />and then play video</Typography>
        </Box>
      )}
    </Box>
  );
};

export default PreviewVideo;
