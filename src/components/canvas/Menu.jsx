import ShapeHandle from "./ShapeHandle";
import ImageHandle from "./ImageHandle";
export default function Menu(props) {
  const { data, itemClick, handleImageUpload } = props;
  return (
    <div className="canvas-menu">
      <ShapeHandle items={data.shapes} shapeClick={itemClick} />
      <ImageHandle
        onClickUpload={handleImageUpload}
        images={data.images}
        thumbClick={itemClick}
      />
    </div>
  );
}
