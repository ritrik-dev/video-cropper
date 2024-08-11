import React, { useRef } from "react";

const Cropper = (props) => {
  const { aspectRatio } = props;
  let isDragging = false;
  let startX;
  let startLeft;

  const cropperRef = useRef();

  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.clientX;
    startLeft = parseInt(window.getComputedStyle(cropperRef.current).left, 10);
    cropperRef.current.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    if (isDragging) {
      isDragging = false;
      cropperRef.current.style.cursor = "grab";
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
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      isDragging = false;
      cropperRef.current.style.cursor = "grab";
    }
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
