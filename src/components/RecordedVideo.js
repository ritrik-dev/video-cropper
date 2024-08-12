import React, { useRef } from "react";

const RecordedVideo = ({ recordedData }) => {
  const videoRef = useRef();
  const canvasRef = useRef();

  const handleLoaded = () => {
    recordedData.forEach(element => {
      const {
        timeStamp,
        coordinates,
        volume,
        playbackRate,
      } = element
      const left = coordinates[0];
      const top = coordinates[1];
      const width = coordinates[2];
      const height = coordinates[3];
      videoRef.current.currentTime = timeStamp;
      videoRef.current.volume = volume;
      videoRef.current.playbackRate = playbackRate;
      updateCanvas(left, top, width, height);
    });
  }

  const updateCanvas = (l,t,w,h) => {
    canvasRef.current.width = w;
    canvasRef.current.height = h;
    const ctx = canvasRef.current.getContext("2d");
    // ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(
      videoRef.current,
      l,
      t,
      w,
      h,
      0,
      0,
      w,
      h
    );
  };

  return (
    <div className="recorded-video">
      <video ref={videoRef} src="video/video-1.mp4" onLoadedMetadata={handleLoaded} />
      <canvas ref={canvasRef} style={{
        border: "1px solid red",
      }}></canvas>
    </div>
  );
};

export default RecordedVideo;
