import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import RectangleOutlinedIcon from "@mui/icons-material/RectangleOutlined";
import AbcOutlinedIcon from "@mui/icons-material/AbcOutlined";

const constants = {
  POPPER_BG: "#fff8ed", //important
};

function getRelativeCenterPosition(node) {
  const transform = node.getAbsoluteTransform().copy();
  transform.invert();
  const relativePos = { x: node.attrs.width * 0.5, y: node.attrs.height * 0.5 };
  return transform.point(relativePos);
}

const sx = {
  fontSize: 60,
  stroke: constants.POPPER_BG,
};

function getShapeIcon(shape) {
  let icon = null;
  switch (shape) {
    case "rect": {
      icon = <RectangleOutlinedIcon sx={sx} />;
      break;
    }
    case "circle": {
      icon = <CircleOutlinedIcon sx={sx} />;
      break;
    }
    default: {
      return <></>;
    }
  }
  return <div className="shape-icon">{icon}</div>;
}

export { getRelativeCenterPosition, getShapeIcon, constants };
