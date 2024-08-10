import React, { useEffect, useRef } from "react";

const Cropper = (props) => {
  const { aspectRatio } = props;
  let isDragging = false;
  let startX;
  let startLeft;

  const cropperRef = useRef();

  useEffect(() => {
    const cropperRefCurrent = cropperRef.current;

    cropperRefCurrent.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX;
      startLeft = parseInt(window.getComputedStyle(cropperRefCurrent).left, 10);
      cropperRefCurrent.style.cursor = "grabbing";
    });

    cropperRefCurrent.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      let newLeft = startLeft + dx;
      const maxLeft =
        cropperRefCurrent.parentElement.offsetWidth -
        cropperRefCurrent.offsetWidth;
      if (newLeft < 0) newLeft = 0;
      if (newLeft > maxLeft) newLeft = maxLeft;

      cropperRefCurrent.style.left = `${newLeft}px`;
    });

    cropperRefCurrent.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
        cropperRefCurrent.style.cursor = "grab";
      }
    });
  }, []);

  return (
    <div
      className="crop-overlay"
      ref={cropperRef}
      style={{ aspectRatio: aspectRatio }}
    />
  );
};

export default Cropper;
