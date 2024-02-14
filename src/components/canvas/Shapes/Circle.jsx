import { Circle as KonvaCircle } from "react-konva";
import { approxEqual } from "../utils";
export default function Circle({ onChange, shapeProps, shapeRef, genericEvents }) {
  const onTransformEnd = (e) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);
    onChange({
      ...shapeProps,
      info: {
        ...shapeProps.info,
        radius: node.radius() * (approxEqual(scaleX, 1, 0.01) ? scaleY : scaleX)
      },
    });
  };

  return (
    <KonvaCircle
      ref={shapeRef}
      radius={25}
      stroke="black"
      {...shapeProps.info}
      draggable
      onTransformEnd={onTransformEnd}
      {...genericEvents}
    />
  );
}
