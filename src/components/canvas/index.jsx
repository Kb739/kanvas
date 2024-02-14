import { Layer, Stage} from "react-konva";
import "./style.css";
import Menu from "./Menu";
import {
  useCallback,
  useMemo,
  useState,
} from "react";
import Shape from "./Shape";
import { getRelativeCenterPosition} from "./utils";
import Background from "./Background";
const styles = {
  canvasStageStyle: {
    // backgroundColor: "#d3d3d3",
    // backgroundSize: "40px 40px",
    // backgroundImage:
    //   "linear-gradient(to right,rgb(128, 128, 128,0.1) 1px,transparent 1px),linear-gradient(to bottom,rgb(128, 128, 128,0.1) 1px,transparent 1px)",
    border: "1px solid #d3d3d3",
    // backgroundAttachment:"local",
    borderRadius: "3px",
    overflow:'hidden'
    // opacity:0.25
    // width: "500px"
  },
};

const Canvas = ({ items, updateCanvasItem, stageRef, callbackRef,gridConfig }) => {
  const [selectedId, selectShape] = useState(null);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 })
  const clickedOnStage = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };
  return (
    <Stage
      // x={stagePos.x}
      // y={stagePos.y}
      ref={callbackRef}
      onMouseDown={clickedOnStage}
      width={window.innerWidth}
      height={700}
      style={styles.canvasStageStyle}
      draggable
      onDragEnd={(e) => {
        setStagePos(e.currentTarget.position())
      }}
    >
      <Layer>
      <Background stageRef={stageRef} stagePos={stagePos} cellSize={gridConfig.cellSize} />
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
              gridConfig={gridConfig}
            />
          );
        })}
      </Layer>
      </Stage>
    );
}

export default function CanvasContainer({ data }) {
  const [menuData, setMenuData] = useState(data.menu);
  const [canvasItems, setCanvasItems] = useState(data.stage.shapes);
  const [gridConfig, setGridConfig] = useState(data.stage.gridConfig)
  const [stageRef, setStageRef] = useState(null)
  const callbackRef = useCallback((ref) => {
    setStageRef(ref)
  },[])

  const spawnItem = useCallback(
    (details) => {
      const spawnPos = getRelativeCenterPosition(stageRef);
      const params = {
        type: details.shape,
        id: `${details.shape}${canvasItems.length + 1}`,
        info: {
          x: spawnPos.x,
          y: spawnPos.y,
          ...details.info
        },
      };
      setCanvasItems((prev) => {
        return [...prev, params];
      });
    },
    [canvasItems,stageRef]
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
              { id: `thumb${prev.length + 1}`, shape: "image", info: { dataURL: src }},
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
        items={canvasItems}
        updateCanvasItem={updateCanvasItem}
        stageRef={stageRef}
        callbackRef={callbackRef}
        gridConfig={gridConfig}
      />
    );
  }, [canvasItems, updateCanvasItem, stageRef, callbackRef]);

  return (
    <div className="canvas-container">
      {menu}
      {canvas}
    </div>
  );
}
