import React, { useRef, useEffect } from "react";

const Cropper = (props) => {
  const { aspectRatio, handleCropChange } = props;

  let isDragging = false;
  let startX;
  let startLeft;

  const cropperRef = useRef();

  useEffect(() => {
    createCropObj();
  }, [aspectRatio]);

  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.clientX;
    startLeft = parseInt(window.getComputedStyle(cropperRef.current).left, 10);
    // startLeft = window.getComputedStyle(cropperRef.current).left
    cropperRef.current.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    if (isDragging) {
      isDragging = false;
      cropperRef.current.style.cursor = "grab";
      createCropObj();
    }
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
    // createCropObj();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      isDragging = false;
      cropperRef.current.style.cursor = "grab";
      createCropObj();
    }
  };

  const createCropObj = () => {
    const cropArea = {
      width: cropperRef.current.offsetWidth,
      height: cropperRef.current.offsetHeight,
      left: parseInt(cropperRef.current.style.left, 10) || 0,
      top: parseInt(cropperRef.current.style.top, 10) || 0,
      // left: cropperRef.current.style.left || 0,
      // top: cropperRef.current.style.top || 0,
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
