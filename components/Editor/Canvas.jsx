// "use client";
// import React, { useEffect, useState, useRef } from 'react';
// import { Stage, Layer, Rect, Text, Group, Image as KonvaImage } from 'react-konva';
// import useImage from 'use-image';

// export default function Canvas({ config = {} }) {
//   const containerRef = useRef(null);
//   const [img] = useImage(config.imageUrl || "");
//   const [dimensions, setDimensions] = useState({ width: 700, height: 500, scale: 1 });

//   useEffect(() => {
//     const updateSize = () => {
//       if (containerRef.current) {
//         const { clientWidth, clientHeight } = containerRef.current;
//         const padding = 40;
//         const availableW = clientWidth - padding;
//         const availableH = clientHeight - padding;
        
//         // Base design is 700x500
//         const scale = Math.min(availableW / 700, availableH / 500);
//         setDimensions({
//           width: 700 * scale,
//           height: 500 * scale,
//           scale: scale
//         });
//       }
//     };

//     updateSize();
//     window.addEventListener('resize', updateSize);
//     return () => window.removeEventListener('resize', updateSize);
//   }, []);

//   return (
//     <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden">
//       <div className="bg-white shadow-2xl rounded-[2.5rem] p-2 border border-gray-50 overflow-hidden">
//         <Stage 
//           width={dimensions.width} 
//           height={dimensions.height} 
//           scaleX={dimensions.scale} 
//           scaleY={dimensions.scale}
//         >
//           <Layer>
//             <Rect
//               x={350 - 250}
//               y={250 - 160}
//               width={500}
//               height={320}
//               fill={config.bgColor || "#E0F2FE"}
//               cornerRadius={40}
//             />
//             {img && (
//               <KonvaImage
//                 image={img}
//                 x={350 - (img.width * 0.2) / 2}
//                 y={250 - (img.height * 0.2) / 2 - 50}
//                 width={img.width * 0.2}
//                 height={img.height * 0.2}
//               />
//             )}
//             <Text
//               text={config.text}
//               x={0}
//               y={250 + 20}
//               width={700}
//               fontSize={80}
//               fontFamily={config.fontFamily}
//               fontStyle="bold"
//               fill="#1F2937"
//               align="center"
//             />
//           </Layer>
//         </Stage>
//       </div>
//     </div>
//   );
// }


"use client";
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Stage, Layer, Text, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

const Canvas = forwardRef(({ config = {}, isPreview = false }, ref) => {
  const stageRef = useRef(null);
  const [img] = useImage(config.imageUrl || "");

  // اس ریف کو ہم ڈاؤن لوڈ کے لیے استعمال کریں گے
  useImperativeHandle(ref, () => ({
    getStage: () => stageRef.current
  }));

  const canvasWidth = 500;
  const canvasHeight = 320;

  const renderWatermarks = () => {
    const watermarks = [];
    if (isPreview) return null; // اگر پریویو ہے تو واٹر مارک مت دکھائیں

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

  return (
    <div className="flex items-center justify-center p-4">
      <div className="shadow-2xl rounded-[2rem] overflow-hidden border border-gray-100">
        <Stage 
          ref={stageRef}
          width={canvasWidth} 
          height={canvasHeight} 
          style={{ backgroundColor: config.bgColor }}
        >
          <Layer>
            {renderWatermarks()}

            {img && (
              <KonvaImage
                image={img}
                x={canvasWidth / 2 - 40}
                y={canvasHeight / 2 - 80}
                width={80}
                height={80}
                draggable={!isPreview} // پریویو میں ڈریگنگ بند
              />
            )}

            <Text
              text={config.text}
              x={0}
              y={canvasHeight / 2 + 20}
              width={canvasWidth}
              fontSize={40}
              fontFamily={config.fontFamily}
              fontStyle="bold"
              fill="#1F2937"
              align="center"
              draggable={!isPreview} // پریویو میں ڈریگنگ بند
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
});

Canvas.displayName = 'Canvas';
export default Canvas;