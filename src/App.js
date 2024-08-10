import { useCallback, useEffect, useRef, useState } from "react";
import "./App.scss";
import { FormControl, InputLabel, MenuItem, Select, Slider } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

function App() {
  const [totalVideoDuration, setTotalVideoDuration] = useState(0.1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currVideoDuration, setCurrVideoDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [playbackRate, setPlayBackRate] = useState(1);
  const [aspectRatio, setAspectRatio] = useState("9 / 18");

  const videoRef = useRef();
  useEffect(() => {
    const video = videoRef.current;
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);
  const handleLoadedMetadata = () => {
    console.log('videoRef :', videoRef);
    setTotalVideoDuration(videoRef.current.duration);
    setPlayBackRate(videoRef.current.playbackRate)
  };
  const handleTimeUpdate = () => {
    !isSeeking && setCurrVideoDuration(videoRef.current.currentTime);
  };
  const handleVideoPlay = () => {
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying((prev) => !prev);
  };

  const seekTo = useCallback((value) => {
    setIsSeeking(true);
    videoRef.current.currentTime = value;
  });

  const handlePlaybackRate = (e) => {
    videoRef.current.playbackRate = e.target.value;
    setPlayBackRate(e.target.value);
  }

  const handleAspectRatio = (e) => {
    setAspectRatio(e.target.value);
  }

  const aspectRatioList = [ "9 / 18", "9 / 16", "4 / 3", "3 / 4", "1 / 1", "4 / 5"]
  const playbackRateList = [ "0.5", "1", "1.5", "2"]
  return (
    <>
    <div className="App">
      <video
        ref={videoRef}
        autoPlay={false}
        onClick={handleVideoPlay}
      >
        <source src="/video/video-1.mp4" />
      </video>
      <div className="crop-overlay" style={{aspectRatio: aspectRatio}}></div>
    </div>
    <br />
    {
      <span style={{ margin: "50px" }} onClick={handleVideoPlay}>
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </span>
    }
    <br />

    <Slider
      sx={{ width: "20%", margin: "50px" }}
      size="small"
      value={currVideoDuration}
      aria-label="Small"
      min={0}
      step={0.01}
      max={totalVideoDuration}
      valueLabelDisplay="auto"
      onChange={(_, value) => seekTo(value)}
      onChangeCommitted={() => setIsSeeking(false)}
    />
    <FormControl  sx={{ width: "20%", margin: "50px" }}>
      <InputLabel>Playback Rate</InputLabel>
      <Select
        value={playbackRate}
        label="Playback Rate"
        onChange={(e) => handlePlaybackRate(e)}
      >
        {
          playbackRateList.map((val) => <MenuItem value={Number(val)}>{val}</MenuItem>)
        }
      </Select>
    </FormControl>
    <FormControl  sx={{ width: "20%", margin: "50px" }}>
      <InputLabel>Aspect Ratio</InputLabel>
      <Select
        value={aspectRatio}
        label="Aspect Ratio"
        onChange={(e) => handleAspectRatio(e)}
      >
         {
          aspectRatioList.map((val) => <MenuItem value={val}>{val}</MenuItem>)
        }
      </Select>
    </FormControl>
    <p>currTime : {currVideoDuration.toFixed(2)}</p>
    <p>totalTime : {totalVideoDuration.toFixed(2)}</p>
    </>
  );
}

export default App;
