import React, { useRef, useEffect, useState } from "react";

const CanvasShape = ({ points, style, width, height }) => {
  const canvasRef = useRef(null);
  const [regionSelected, setRegionSelected] = useState();
  const [insideAreas, setInsideAreas] = useState(
    new Array(points.length).fill(false)
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    points.forEach((groupOfPoints, index) => {
      ctx.beginPath();
      ctx.moveTo(groupOfPoints[0].x, groupOfPoints[0].y);

      for (let i = 1; i < groupOfPoints.length; i++) {
        ctx.lineTo(groupOfPoints[i].x, groupOfPoints[i].y);
      }

      ctx.closePath();

      ctx.fillStyle = insideAreas[index] ? "rgba(255, 255, 255, 0.4)" : "red";
      ctx.fill();
    });
  }, [points, insideAreas]);

  const handleMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const canvasX = e.clientX - rect.left;
    const canvasY = e.clientY - rect.top;

    const updatedInsideAreas = points.map((groupOfPoints) => {
      const minX = Math.min(...groupOfPoints.map((point) => point.x));
      const minY = Math.min(...groupOfPoints.map((point) => point.y));
      const maxX = Math.max(...groupOfPoints.map((point) => point.x));
      const maxY = Math.max(...groupOfPoints.map((point) => point.y));

      return (
        canvasX >= minX && canvasX <= maxX && canvasY >= minY && canvasY <= maxY
      );
    });

    setInsideAreas(updatedInsideAreas);
  };

  const handleClick = (e) => {
    const regionX = e.clientX;
    const regionY = e.clientY;
    points.map((groupOfPoints, index) => {
      const minX = Math.min(...groupOfPoints.map((point) => point.x));
      const minY = Math.min(...groupOfPoints.map((point) => point.y));
      const maxX = Math.max(...groupOfPoints.map((point) => point.x));
      const maxY = Math.max(...groupOfPoints.map((point) => point.y));

      const isInside =
        regionX >= minX &&
        regionX <= maxX &&
        regionY >= minY &&
        regionY <= maxY;
      if (isInside) {
        setRegionSelected(index);
      }
    });
  };
  useEffect(() => {
    // console.log(`${regionSelected} Inside the shape at index`);
  }, [regionSelected]);

  return (
    <canvas
      onMouseMove={(e) => handleMove(e)}
      onClick={(e) => handleClick(e)}
      // className="canvas"
      style={{
        ...style,
        width: "100%",
        height: "100%",
      }}
      ref={canvasRef}
      width={`${width}px`}
      height={`${height}px`}
    >
      {points.map((_, index) => (
        <div
          key={index}
          className={` ${insideAreas[index] ? " canvas " : ""} ${
            insideAreas[index]
          }`}
        />
      ))}
    </canvas>
  );
};

export default CanvasShape;
