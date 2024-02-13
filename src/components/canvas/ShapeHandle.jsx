import { useRef } from "react";
import Popup from "./Popup";
import { Grid, Button } from "@mui/material";
import { getShapeIcon } from "./utils"
import ShapeIcon from "@mui/icons-material/ShapeLineOutlined";


export default function ShapeHandle(props) {
    const { items, shapeClick } = props;
    const popupRef = useRef(null);
  function handleClick(e) {
    popupRef.current.click(e);
  }
  function renderShapes() {
    return items.map((item, index) => (
        <Grid item xs={3} key={index} onClick={() => shapeClick(item)}
            style={{}}
            textAlign={'center'}>
        {getShapeIcon(item.shape)}
      </Grid>
    ));
  }
  return (
    <div>
      <ShapeIcon onClick={handleClick} className="menu-icon"/>
      <Popup ref={popupRef}>
          <div className="shape-handle-icon-container">
            <Grid container>
              {renderShapes()}
            </Grid>
          </div>
      </Popup>
    </div>
  );
}
