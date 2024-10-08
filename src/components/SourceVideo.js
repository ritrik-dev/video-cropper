import { useMemo, useState } from "react";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import VolumeDownOutlinedIcon from "@mui/icons-material/VolumeDownOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import Cropper from "./Cropper";

const aspectRatioList = [
  "9 / 18",
  "9 / 16",
  "4 / 3",
  "3 / 4",
  "1 / 1",
  "4 / 5",
];
const playbackRateList = ["0.25", "0.5", "1", "1.5", "2"];

const SourceVideo = (props) => {
  const { cropMode, videoRef, previewCanvasRef, setRecordedData } = props;
  const [totalVideoDuration, setTotalVideoDuration] = useState(null);
  const [playbackRate, setPlayBackRate] = useState(null);
  const [volume, setVolume] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currVideoDuration, setCurrVideoDuration] = useState(0);
  const [aspectRatio, setAspectRatio] = useState("9 / 18");
  const [cropArea, setCropArea] = useState(null);

  const handleLoadedMetadata = () => {
    setTotalVideoDuration(videoRef.current.duration);
    setPlayBackRate(videoRef.current.playbackRate);
    setVolume(videoRef.current.volume * 10);
  };
  const handleTimeUpdate = (e) => {
    setCurrVideoDuration(videoRef.current.currentTime);
    drawPreview(cropArea);
  };

  const handleCropChange = (newCropArea) => {
    setCropArea(newCropArea);
    drawPreview(newCropArea);
  };

  const recordData = () => {
    const currTime = videoRef.current.currentTime;
    const currCoordinates = previewCanvasRef.current.getBoundingClientRect();
    const cropperDimensions = [currCoordinates.left, currCoordinates.top, currCoordinates.width, currCoordinates.height];

    const newRecord = {
      timeStamp: currTime,
      coordinates: cropperDimensions,
      volume: videoRef.current.volume,
      playbackRate: videoRef.current.playbackRate,
    };

    setRecordedData((prevData) => [...prevData, newRecord]);
  };

  const drawPreview = (currCropArea) => {
    if (videoRef.current && previewCanvasRef.current && currCropArea) {
      const video = videoRef.current;
      const canvas = previewCanvasRef.current;
      const ctx = canvas.getContext("2d");
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      const scaleX = videoWidth / video.clientWidth;
      const scaleY = videoHeight / video.clientHeight;
      const scaledCropArea = {
        left: currCropArea.left * scaleX,
        top: currCropArea.top * scaleY,
        width: currCropArea.width * scaleX,
        height: currCropArea.height * scaleY,
      };
      canvas.width = scaledCropArea.width;
      canvas.height = scaledCropArea.height;
      ctx.drawImage(
        video,
        scaledCropArea.left,
        scaledCropArea.top,
        scaledCropArea.width,
        scaledCropArea.height,
        0,
        0,
        scaledCropArea.width,
        scaledCropArea.height
      );

      recordData();
    }
  };
  

  const handleVideoPlay = () => {
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying((prev) => !prev);
  };

  const handleSeek = (_, value) => {
    videoRef.current.currentTime = value;
  };

  const handlePlaybackRate = (e) => {
    videoRef.current.playbackRate = e.target.value;
    setPlayBackRate(e.target.value);
  };

  const handleAspectRatio = (e) => {
    setAspectRatio(e.target.value);
  };

  const handleVolume = () => {
    const volumeValue = volume === 0 ? 1 : 0;
    setVolume(volumeValue * 10);
    videoRef.current.volume = volumeValue;
  };

  const formatDuration = (seconds) => {
    const totalSeconds = Math.round(seconds);
    const h = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");

    return `${h}:${m}:${s}`;
  };

  const handleVolumeChange = (e, value) => {
    setVolume(value);
    videoRef.current.volume = value / 10;
  };

  return (
    <>
      <Box className="source-video">
        <Box className="video-container container">
          <Box className="video">
            <video
              ref={videoRef}
              autoPlay={isPlaying}
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={handleTimeUpdate}
            >
              <source src="/video/video-1.mp4" />
            </video>
            {cropMode ? (
              <Cropper
                aspectRatio={aspectRatio}
                cropMode={cropMode}
                handleCropChange={handleCropChange}
              />
            ) : null}
          </Box>
        </Box>
        <Box className="seek-container container">
          <IconButton
            className="play-pause-btn"
            color="primary"
            onClick={handleVideoPlay}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <Slider
            className="volume-slider"
            size="small"
            value={currVideoDuration}
            min={0}
            step={0.01}
            max={totalVideoDuration}
            onChange={handleSeek}
          />
        </Box>
        <Box className="volume-container container">
          <Typography variant="body2" className="time-stamp">
            {useMemo(
              () => formatDuration(currVideoDuration),
              [currVideoDuration]
            )}{" "}
            |{" "}
            <span>
              {useMemo(
                () => formatDuration(totalVideoDuration),
                [totalVideoDuration]
              )}
            </span>
          </Typography>
          <Box className="volume-sub-container">
            <IconButton
              className="mute-unmute-btn"
              color="primary"
              onClick={handleVolume}
            >
              {volume > 5 ? (
                <VolumeUpOutlinedIcon />
              ) : volume === 0 ? (
                <VolumeOffOutlinedIcon />
              ) : (
                <VolumeDownOutlinedIcon />
              )}
            </IconButton>
            <Slider
              className="volume-slider"
              size="small"
              value={volume}
              min={0}
              step={1}
              max={10}
              valueLabelDisplay="auto"
              onChange={handleVolumeChange}
            />
          </Box>
        </Box>
        <Box className="dropdown-container container">
          <Select
            className="playback"
            value={playbackRate}
            onChange={(e) => handlePlaybackRate(e)}
            renderValue={(value) => (
              <Typography variant="body2">
                Playback Speed <span>{value}x</span>
              </Typography>
            )}
          >
            {playbackRateList.map((val) => (
              <MenuItem value={Number(val)}>{val}</MenuItem>
            ))}
          </Select>
          <Select
            className="aspectRatio"
            value={aspectRatio}
            onChange={(e) => handleAspectRatio(e)}
            size="4"
            renderValue={(value) => (
              <Typography variant="body2">
                Cropper aspect Ratio <span>{value}</span>
              </Typography>
            )}
          >
            {aspectRatioList.map((val) => (
              <MenuItem value={val}>{val}</MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </>
  );
};

export default SourceVideo;
