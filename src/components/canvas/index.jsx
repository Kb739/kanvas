import { Layer, Stage } from "react-konva";
import "./style.css";
import Menu from "./Menu";
import { useCallback, useMemo, useState } from "react";
import Shape from "./Shape";
import { getRelativePointerPosition } from "./utils";
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
const getDefaultAttrs = (stageRef) => {
  const params = {};
  if (stageRef) {
    const { attrs } = stageRef;
    params.x = attrs.width * 0.5;
    params.y = attrs.height * 0.5;
  }
  return params;
};

function Canvas({ items, addItem, updateCanvasItem, resetOptionSelected }) {
  const [stageRef, setStageRef] = useState(null);
  const callbackRef = useCallback((node) => {
    setStageRef(node);
  }, []);
  const [selectedId, selectShape] = useState(null);
  const clickedOnStage = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
      addItem(getRelativePointerPosition(e.target.getStage()));
    }
    resetOptionSelected();
  };
  const layer = useMemo(() => {
    return (
      <Layer>
        {items.map((item, index) => {
          item.info = { ...getDefaultAttrs(stageRef), ...item.info };
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
  }, [stageRef, selectedId, items, updateCanvasItem]);
  return (
    <Stage
      ref={callbackRef}
      onMouseDown={clickedOnStage}
      width={window.innerWidth}
      height={700}
      style={styles.canvasStageStyle}
      draggable
    >
      {layer}
    </Stage>
  );
}

export default function CanvasContainer({ data }) {
  const [menuItems] = useState(data.menu);
  const [canvasItems, setCanvasItems] = useState(data.shapes);
  const [optionSelected, setOptionSelected] = useState(null);
  const addItem = useCallback(
    (attrs) => {
      if (optionSelected) {
        const params = {
          type: optionSelected.shape,
          id: `${optionSelected.shape}${canvasItems.length + 1}`,
          info: {
            x: attrs.x,
            y: attrs.y,
          },
        };
        setCanvasItems((prev) => {
          return [...prev, params];
        });
      }
    },
    [canvasItems, optionSelected]
  );

  const updateCanvasItem = useCallback(
    (newAttrs, itemIndex) => {
      const items = canvasItems.slice();
      items[itemIndex] = newAttrs;
      setCanvasItems(items);
    },
    [canvasItems]
  );

  const menu = useMemo(() => {
    return (
      <Menu
        items={menuItems}
        itemsClick={(details) => {
          setOptionSelected(details);
        }}
        optionSelected={optionSelected}
      />
    );
  }, [menuItems, optionSelected]);

  const canvas = useMemo(() => {
    return (
      <Canvas
        items={canvasItems}
        addItem={addItem}
        updateCanvasItem={updateCanvasItem}
        resetOptionSelected={() => setOptionSelected(null)}
      />
    );
  }, [canvasItems, updateCanvasItem, addItem]);

  return (
    <div className="canvas-container">
      {menu}
      {canvas}
    </div>
  );
}
