import { Image as KonvaImage } from "react-konva";
import { useEffect, useState } from "react";
import { approxEqual } from "../utils";
export default function Image({
  onChange,
  shapeProps,
  shapeRef,
  genericEvents,
}) {
  const [image, setImage] = useState(null);

  const onTransformEnd = (e) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);
    const scale = approxEqual(scaleX, 1, 0.01) ? scaleY : scaleX;
    onChange({
      ...shapeProps,
      info: {
        ...shapeProps.info,
        width: node.width() * scale,
        height: node.height() * scale,
      },
    });
  };
  useEffect(() => {
    const img = new window.Image();
    img.src = shapeProps.info.dataURL;
    img.onload = () => {
      setImage(img);
    };
  }, [shapeProps]);

  return (
    <KonvaImage
      ref={shapeRef}
      image={image}
      //   width={100}
      //   height={100}
      stroke="black"
      {...shapeProps.info}
      draggable
      onTransformEnd={onTransformEnd}
      {...genericEvents}
    />
  );
}
