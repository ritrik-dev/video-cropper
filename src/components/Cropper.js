import React, { useRef, useEffect, useState } from "react";

const Cropper = (props) => {
  const { aspectRatio, handleCropChange } = props;

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [startLeft, setStartLeft] = useState(null);

  const cropperRef = useRef();

  useEffect(() => {
    createCropObj();
  }, [aspectRatio]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartLeft(parseInt(window.getComputedStyle(cropperRef.current).left, 10));
    cropperRef.current.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
      setIsDragging(false);
      cropperRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    let newLeft = startLeft + dx;
    const maxLeft =
      cropperRef.current.parentElement.offsetWidth -
      cropperRef.current.offsetWidth;
    if (newLeft < 0) newLeft = 0;
    if (newLeft > maxLeft) newLeft = maxLeft;
    cropperRef.current.style.left = `${newLeft}px`;
    createCropObj();
  };

  const handleMouseLeave = () => {
      setIsDragging(false);
      cropperRef.current.style.cursor = "grab";
  };

  const createCropObj = () => {
    const cropArea = {
      width: cropperRef.current.offsetWidth,
      height: cropperRef.current.offsetHeight,
      left: parseInt(cropperRef.current.style.left, 10) || 0,
      top: parseInt(cropperRef.current.style.top, 10) || 0,
    };
    handleCropChange(cropArea);
  };

  return (
    <div
      className="crop-overlay"
      ref={cropperRef}
      style={{ aspectRatio: aspectRatio }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default Cropper;
