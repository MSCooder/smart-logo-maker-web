"use client";
import React, { useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

export default function Canvas({ config = {} }) {
  const [img] = useImage(config.imageUrl || "");
  const [imagePos, setImagePos] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const stageWidth = 700;
  const stageHeight = 500;
  const boxWidth = 500; 
  const boxHeight = 320;

  useEffect(() => {
    if (img) {
      const scale = Math.min((boxHeight * 0.4) / img.height, (boxWidth * 0.4) / img.width);
      const w = img.width * scale;
      const h = img.height * scale;
      
      setImagePos({
        x: (stageWidth / 2) - (w / 2),
        y: (stageHeight / 2) - (h / 2) - 50,
        width: w,
        height: h
      });
    }
  }, [img]);

  return (
    <div className="bg-white shadow-2xl rounded-[3rem] p-4 border border-gray-50">
      <Stage width={stageWidth} height={stageHeight} className="bg-transparent overflow-hidden">
        <Layer>
          {/* Background Box */}
          <Rect
            x={stageWidth / 2 - boxWidth / 2}
            y={stageHeight / 2 - boxHeight / 2}
            width={boxWidth}
            height={boxHeight}
            fill={config.bgColor || "#E0F2FE"}
            cornerRadius={40}
            shadowBlur={30}
            shadowColor="rgba(0,0,0,0.08)"
            shadowOffset={{ x: 0, y: 15 }}
            draggable
          />

          {/* Logo Image */}
          {img && (
            <KonvaImage
              image={img}
              x={imagePos.x}
              y={imagePos.y}
              width={imagePos.width}
              height={imagePos.height}
              draggable
            />
          )}

          {/* Main Logo Text - Changed to Dark for Light BG */}
          <Text
            text={config.text || "Smart"}
            x={0}
            y={stageHeight / 2 + 20}
            width={stageWidth}
            fontSize={85}
            fontFamily={config.fontFamily || "Arial"}
            fontStyle="bold"
            fill="#1F2937" 
            align="center"
            draggable
          />

          {/* Branding Line */}
          <Text
            text="PREMIUM SMART BRAND"
            x={0}
            y={stageHeight / 2 + 110}
            width={stageWidth}
            fontSize={12}
            letterSpacing={6}
            fill="#6B7280"
            opacity={0.8}
            align="center"
            fontFamily="Arial"
          />
        </Layer>
      </Stage>
    </div>
  );
}