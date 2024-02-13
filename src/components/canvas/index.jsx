import { Layer, Stage } from "react-konva";
import "./style.css";
import Menu from "./Menu";
import {
  forwardRef,
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import Shape from "./Shape";
import { getRelativeCenterPosition, getRelativePointerPosition } from "./utils";
const styles = {
  canvasStageStyle: {
    // backgroundColor: "#d3d3d3",
    backgroundSize: "40px 40px",
    backgroundImage:
      "linear-gradient(to right,rgb(128, 128, 128,0.1) 1px,transparent 1px),linear-gradient(to bottom,rgb(128, 128, 128,0.1) 1px,transparent 1px)",
    border: "1px solid #d3d3d3",
    borderRadius: "3px",
    // width: "500px"
  },
};

const Canvas = forwardRef(({ items, updateCanvasItem }, ref) => {
  const [selectedId, selectShape] = useState(null);
  const clickedOnStage = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };
  const layer = useMemo(() => {
    return (
      <Layer>
        {items.map((item, index) => {
          return (
            <Shape
              key={index}
              shapeProps={item}
              isSelected={selectedId === item.id}
              onSelect={() => {
                selectShape(item.id);
              }}
              onChange={(newAttrs) => {
                updateCanvasItem(newAttrs, index);
              }}
            />
          );
        })}
      </Layer>
    );
  }, [selectedId, items, updateCanvasItem]);
  return (
    <Stage
      ref={ref}
      onMouseDown={clickedOnStage}
      width={window.innerWidth}
      height={700}
      style={styles.canvasStageStyle}
      draggable
    >
      {layer}
    </Stage>
  );
});

export default function CanvasContainer({ data }) {
  const [menuData, setMenuData] = useState(data.menu);
  const [canvasItems, setCanvasItems] = useState(data.stage.shapes);
  const stageRef = useRef(null);

  const spawnItem = useCallback(
    (details) => {
      const spawnPos = getRelativeCenterPosition(stageRef.current);
      const params = {
        type: details.shape,
        id: `${details.shape}${canvasItems.length + 1}`,
        info: {
          x: spawnPos.x,
          y: spawnPos.y,
        },
      };
      setCanvasItems((prev) => {
        return [...prev, params];
      });
    },
    [canvasItems]
  );

  const updateCanvasItem = useCallback(
    (newAttrs, itemIndex) => {
      const items = canvasItems.slice();
      items[itemIndex] = newAttrs;
      setCanvasItems(items);
    },
    [canvasItems]
  );
  const handleImageUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const src = reader.result;
        setMenuData((prev) => {
          return {
            ...prev,
            images: [
              ...prev.images,
              { id: `thumb${prev.length + 1}`, shape: "image", dataURL: src },
            ],
          };
        });
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const menu = useMemo(() => {
    return (
      <Menu
        data={menuData}
        itemClick={spawnItem}
        handleImageUpload={handleImageUpload}
      />
    );
  }, [menuData,handleImageUpload, spawnItem]);

  const canvas = useMemo(() => {
    return (
      <Canvas
        ref={stageRef}
        items={canvasItems}
        updateCanvasItem={updateCanvasItem}
      />
    );
  }, [canvasItems, updateCanvasItem]);

  return (
    <div className="canvas-container">
      {menu}
      {canvas}
    </div>
  );
}
