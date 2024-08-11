import { Box } from "@mui/material";
import React from "react";

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
          <h1>NO PREVIEW AVAILABLE</h1>
        </Box>
      )}
    </Box>
  );
};

export default PreviewVideo;
