import { useLayoutEffect, useRef, useState } from "react";
import { Asterisk, ArrowUpRight } from "lucide-react";

// Measure natural glyph bounds; the viewBox scales without stretching letters.
export default function SvgText({ text, className = "", weight = 800 }) {
  const node = useRef(null);
  const [bounds, setBounds] = useState(null);
  useLayoutEffect(() => {
    let disposed = false;
    const measure = () => {
      if (disposed || typeof node.current?.getBBox !== "function") return;
      const box = node.current.getBBox();
      const context = document.createElement("canvas").getContext("2d");
      let measured = box;
      if (context && "letterSpacing" in context) {
        context.font = `${weight} 100px Arial, Helvetica, sans-serif`;
        context.letterSpacing = "-4px";
        const metrics = context.measureText(text);
        if (metrics.actualBoundingBoxAscent > 0)
          measured = {
            x: -metrics.actualBoundingBoxLeft,
            y: -metrics.actualBoundingBoxAscent,
            width:
              metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight,
            height:
              metrics.actualBoundingBoxAscent +
              metrics.actualBoundingBoxDescent,
          };
      }
      if (measured.width > 0 && measured.height > 0)
        setBounds({
          x: measured.x - 2,
          y: measured.y - 3,
          width: measured.width + 4,
          height: measured.height + 6,
        });
    };
    measure();
    document.fonts?.ready.then(measure);
    return () => {
      disposed = true;
    };
  }, [text, weight]);
  const fallback = {
    x: 0,
    y: -100,
    width: Math.max(text.length * 72, 72),
    height: 125,
  };
  const box = bounds || fallback;
  return (
    <svg
      className={`svg-text ${className}`}
      viewBox={`${box.x} ${box.y} ${box.width} ${box.height}`}
      width={box.width}
      height={box.height}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMinYMid meet"
    >
      <text
        ref={node}
        x="0"
        y="0"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="100"
        fontWeight={weight}
        letterSpacing="-4"
        fill="currentColor"
      >
        {text}
      </text>
    </svg>
  );
}
export function StarMark() {
  return (
    <Asterisk
      size={100}
      strokeWidth={0.8}
      aria-hidden="true"
      focusable="false"
    />
  );
}
export function ArrowMark() {
  return (
    <span aria-hidden="true" className="arrow-mark">
      <ArrowUpRight size={18} strokeWidth={1.7} focusable="false" />
    </span>
  );
}
