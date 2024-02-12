import { useEffect, useRef } from "react";
import { Rect, Circle, Transformer } from "react-konva";

const shapeResolver = (
  type,
  info,
  shapeRef,
  onSelect,
  onDragEnd,
  onTransformEnd,
  onDragMove
) => {
  switch (type) {
    case "rect": {
      return (
        <Rect
          ref={shapeRef}
          width={50}
          height={50}
          stroke="black"
          {...info}
          draggable
          onClick={onSelect}
          onDragEnd={onDragEnd}
          onTransformEnd={onTransformEnd}
          onDragMove={onDragMove}
        />
      );
    }
    case "circle": {
      return (
        <Circle
          ref={shapeRef}
          radius={25}
          stroke="black"
          {...info}
          draggable
          onClick={onSelect}
          onDragEnd={onDragEnd}
          onTransformEnd={onTransformEnd}
        />
      );
    }
    default: {
      return <></>;
    }
  }
};

export default function Shape({ shapeProps, isSelected, onSelect, onChange }) {
  const { type, info } = shapeProps;
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
  const onTransformEnd = (e) => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);
    onChange({
      ...shapeProps,
      info: {
        ...info,
        width: node.width() * scaleX,
        height: node.height() * scaleY,
      },
    });
  };
    const onDragMove = (e) => {
        //snap
        let x = e.target.x()
        let y = e.target.y()
        const closest = {
            x: Math.round(x / 40) * 40,
            y: Math.round(y / 40) * 40,
          };
          const dist = Math.sqrt(
            Math.pow(closest.x - x, 2) + Math.pow(closest.y - y, 2)
          );
        
        if (dist <10) {
            e.target.x(closest.x)
            e.target.y(closest.y)
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
      {shapeResolver(type, info, shapeRef, onSelect, onDragEnd, onTransformEnd,onDragMove)}
      {isSelected && <Transformer ref={trRef} />}
    </>
  );
}
