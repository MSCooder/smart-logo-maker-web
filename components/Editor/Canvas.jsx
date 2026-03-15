"use client";
import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Rect, Text, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

export default function Canvas({ config = {} }) {
  const containerRef = useRef(null);
  const [img] = useImage(config.imageUrl || "");
  const [dimensions, setDimensions] = useState({ width: 700, height: 500, scale: 1 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const padding = 40;
        const availableW = clientWidth - padding;
        const availableH = clientHeight - padding;
        
        // Base design is 700x500
        const scale = Math.min(availableW / 700, availableH / 500);
        setDimensions({
          width: 700 * scale,
          height: 500 * scale,
          scale: scale
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const brandText = (config.text || 'BRAND').toUpperCase();
  const textLength = brandText.length;
  const fontSize = textLength > 14 ? 40 : textLength > 10 ? 50 : textLength > 7 ? 60 : 70;

  const iconBox = {
    width: 180,
    height: 180,
    x: 350 - 90,
    y: 120,
  };

  const hasImage = Boolean(img);
  const sourceW = hasImage ? Math.max(1, img.width) : 1;
  const sourceH = hasImage ? Math.max(1, img.height) : 1;
  const iconScale = Math.min(iconBox.width / sourceW, iconBox.height / sourceH);
  const iconRenderW = sourceW * iconScale;
  const iconRenderH = sourceH * iconScale;
  const iconX = iconBox.x + (iconBox.width - iconRenderW) / 2;
  const iconY = iconBox.y + (iconBox.height - iconRenderH) / 2;

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden">
      <div className="bg-white shadow-2xl rounded-[2.5rem] p-2 border border-gray-50 overflow-hidden">
        <Stage 
          width={dimensions.width} 
          height={dimensions.height} 
          scaleX={dimensions.scale} 
          scaleY={dimensions.scale}
        >
          <Layer>
            <Rect
              x={350 - 250}
              y={250 - 160}
              width={500}
              height={320}
              fill={config.bgColor || "#E0F2FE"}
              cornerRadius={40}
            />
            {img && (
              <KonvaImage
                image={img}
                x={iconX}
                y={iconY}
                width={iconRenderW}
                height={iconRenderH}
              />
            )}
            <Rect
              x={280}
              y={320}
              width={140}
              height={2}
              fill={config.textColor || "#1F2937"}
              opacity={0.25}
              cornerRadius={1}
            />
            <Text
              text={brandText}
              x={0}
              y={338}
              width={700}
              fontSize={fontSize}
              fontFamily={config.fontFamily}
              fontStyle="bold"
              fill={config.textColor || "#1F2937"}
              align="center"
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

