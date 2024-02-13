import { forwardRef, useState } from "react";
import { ClickAwayListener, Popper } from "@mui/material";
import { constants } from "./utils";

const popperSx = {
  backgroundColor: constants.POPPER_BG,
};
const Popup = forwardRef((props, ref) => {
  const { children } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };
  return (
    <div>
      <span
        ref={ref}
        onClick={handleClick}
        style={{ pointerEvents: "none" }}
      ></span>
      <Popper
        open={open}
        anchorEl={anchorEl}
        sx={popperSx}
        className="popper-sx"
      >
        <ClickAwayListener onClickAway={handleClose}>
          {children}
        </ClickAwayListener>
      </Popper>
    </div>
  );
});
export default Popup;
