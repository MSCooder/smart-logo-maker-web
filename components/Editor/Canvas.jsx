"use client";
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Stage, Layer, Text, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

const Canvas = forwardRef(({ config = {}, layout = 'vertical', logoStyle = 'standard', isPreview = false }, ref) => {
  const stageRef = useRef(null);
  const [img] = useImage(config.imageUrl || "");



  useImperativeHandle(ref, () => ({
    getStage: () => stageRef.current
  }));

  const canvasWidth = 500;
  const canvasHeight = 320;

  const renderWatermarks = () => {
    const watermarks = [];
    if (isPreview) return null;

    const text = "SMART LOGO MAKER";
    for (let i = -100; i < 600; i += 150) {
      for (let j = -100; j < 400; j += 100) {
        watermarks.push(
          <Text
            key={`${i}-${j}`}
            text={text}
            x={i}
            y={j}
            fontSize={14}
            fill="rgba(0,0,0,0.06)"
            rotation={-45}
            listening={false}
          />
        );
      }
    }
    return watermarks;
  };

  const isHorizontal = layout === 'horizontal';
  return (
    <div className="flex items-center justify-center p-4">
      <div className="shadow-2xl rounded-[2rem] overflow-hidden border border-gray-100">
        <Stage
          ref={stageRef}
          width={canvasWidth}
          height={canvasHeight}
          className="w- h-80"
          style={{ backgroundColor: config.bgColor || "#FFFFFF" }}
        >
          <Layer>


            {renderWatermarks()}
            {img && (
              <KonvaImage
                image={img}
                x={layout === 'horizontal' ? 50 : canvasWidth / 2 - 40}
                y={layout === 'horizontal' ? canvasHeight / 2 - 40 : canvasHeight / 2 - 80}
                width={70}
                height={70}
                draggable={!isPreview}
                onDragEnd={(e) => {
                  console.log("New position:", e.target.x(), e.target.y());
                }}
              />
            )}


            <Text
              text={config.text}
              x={layout === 'horizontal' ? 150 : 0}
              y={layout === 'horizontal' ? canvasHeight / 2 - 20 : canvasHeight / 2 + 20}
              width={layout === 'horizontal' ? 300 : canvasWidth}
              align={layout === 'horizontal' ? "left" : "center"}
              fontSize={40}
              fontFamily={config.fontFamily}
              fontStyle="bold"
              fill="#1F2937"
              draggable={!isPreview}
            />

          </Layer>
        </Stage>
      </div>
    </div>
  );
});

Canvas.displayName = 'Canvas';
export default Canvas;