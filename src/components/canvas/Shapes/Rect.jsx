import { Rect as KonvaRect } from "react-konva";
export default function Rect({
  onChange,
  shapeProps,
  shapeRef,
  genericEvents,
}) {
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
        width: node.width() * scaleX,
        height: node.height() * scaleY,
      },
    });
  };

  return (
    <KonvaRect
      ref={shapeRef}
      width={50}
      height={50}
      stroke="black"
      {...shapeProps.info}
      draggable
      onTransformEnd={onTransformEnd}
      {...genericEvents}
    />
  );
}
