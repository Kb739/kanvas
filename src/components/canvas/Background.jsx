import { useMemo } from "react";
import { Group, Rect } from "react-konva";
export default function Background({
  stageRef,
  stagePos,
  cellSize = 50,
}) {
  const grid = useMemo(() => {
    const WIDTH = cellSize;
      const HEIGHT = cellSize
    if (stageRef) {
      const stageWidth = stageRef.attrs.width;
      const stageHeight = stageRef.attrs.height;
      const startX = Math.floor((-stagePos.x - stageWidth) / WIDTH) * WIDTH;
      const endX = Math.floor((-stagePos.x + stageWidth * 2) / WIDTH) * WIDTH;

      const startY = Math.floor((-stagePos.y - stageHeight) / HEIGHT) * HEIGHT;
      const endY =
        Math.floor((-stagePos.y + stageHeight * 2) / HEIGHT) * HEIGHT;

      const gridComponents = [];
      let i = 0;
      for (let x = startX; x < endX; x += WIDTH) {
        for (let y = startY; y < endY; y += HEIGHT) {
          i += 1;
          gridComponents.push(
            <Rect
              key={i}
              x={x}
              y={y}
              width={WIDTH}
              height={HEIGHT}
              stroke="grey"
              strokeWidth={1}
            />
          );
        }
      }
      return gridComponents;
    }
    return <></>;
  }, [stagePos, stageRef, cellSize]);

  return (
    <Group opacity={0.1} listening={false}>
      {grid}
    </Group>
  );
}
