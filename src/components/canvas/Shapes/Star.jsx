import { Star as KonvaStar } from "react-konva";
import { approxEqual } from "../utils";
export default function Star({ onChange, shapeProps, shapeRef, genericEvents }) {
  const onTransformEnd = (e) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);
    const scale = approxEqual(scaleX, 1, 0.01) ? scaleY : scaleX
    onChange({
      ...shapeProps,
      info: {
        ...shapeProps.info,
        innerRadius: node.innerRadius() * scale,
        outerRadius: node.outerRadius() * scale,
      },
    });
  };

  return (
    <KonvaStar
    ref={shapeRef}
    numPoints={5}
    innerRadius={40}
    outerRadius={20}
    stroke="black"
    {...shapeProps.info}
    draggable
    onTransformEnd={onTransformEnd}
    {...genericEvents}
  />
  );
}
