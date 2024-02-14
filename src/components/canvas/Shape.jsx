import { useEffect, useRef } from "react";
import { Transformer } from "react-konva";
import Rect from "./Shapes/Rect";
import Circle from "./Shapes/Circle";
import Star from "./Shapes/Star";
import Image from "./Shapes/Image";
const shapeResolver = (shapeProps, shapeRef, onChange, genericEvents) => {
  switch (shapeProps.type) {
    case "rect": {
      return (
        <Rect
          shapeProps={shapeProps}
          onChange={onChange}
          shapeRef={shapeRef}
          genericEvents={genericEvents}
        />
      );
    }
    case "circle": {
      return (
        <Circle
          shapeProps={shapeProps}
          onChange={onChange}
          shapeRef={shapeRef}
          genericEvents={genericEvents}
        />
      );
    }
    case "star": {
      return (
        <Star
          shapeProps={shapeProps}
          onChange={onChange}
          shapeRef={shapeRef}
          genericEvents={genericEvents}
        />
      );
    }
    case "image": {
      return (
        <Image
          shapeProps={shapeProps}
          onChange={onChange}
          shapeRef={shapeRef}
          genericEvents={genericEvents}
        />
      );
    }
    default: {
      return <></>;
    }
  }
};

export default function Shape({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  gridConfig,
}) {
  const { info } = shapeProps;
  const shapeRef = useRef();
  const trRef = useRef();
  const onDragEnd = (e) => {
    onChange({
      ...shapeProps,
      info: {
        ...info,
        x: e.target.x(),
        y: e.target.y(),
      },
    });
  };
  const onDragMove = (e) => {
    //snap
    if (gridConfig.snap) {
      const { cellSize } = gridConfig;
      let x = e.target.x();
      let y = e.target.y();
      const closest = {
        x: Math.round(x / cellSize) * cellSize,
        y: Math.round(y / cellSize) * cellSize,
      };
      const dist = Math.sqrt(
        Math.pow(closest.x - x, 2) + Math.pow(closest.y - y, 2)
      );

      if (dist < 15) {
        e.target.x(closest.x);
        e.target.y(closest.y);
      }
    }
  };
  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  return (
    <>
      {shapeResolver(shapeProps, shapeRef, onChange, {
        onClick: onSelect,
        onDragEnd,
        onDragMove,
      })}
      {isSelected && <Transformer ref={trRef} />}
    </>
  );
}
