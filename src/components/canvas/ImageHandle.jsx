import { useState, useRef, useMemo } from "react";
import { Button, Menu, Grid } from "@mui/material";

export default function ImageHandle(props) {
  const { onClickUpload, imageSources } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const fileInputRef = useRef();

  function toggleMenu(e) {
    setAnchorEl((prev) => (prev ? null : e.currentTarget));
  }
  const thumbnails = useMemo(() => {
    return imageSources.map((dataURL, index) => {
      return (
        <Grid item xs={3}>
          <img
            key={index}
            src={dataURL}
            alt={`thumbnail ${index}`}
            className="img-handle-thumbnail"
          />
        </Grid>
      );
    });
  }, [imageSources]);
  return (
    <div>
      <Button onClick={toggleMenu}>Image Handle</Button>
      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <div className="img-handle-menu">
          <div className="img-handle-thumbnail-container">
            <Grid container spacing={1}>
              {thumbnails}
            </Grid>
          </div>
          <div>
            <input
              ref={fileInputRef}
              className="img-handle-upload"
              id="img-input"
              type="file"
              accept="image/*"
              multiple
              onChange={onClickUpload}
            />
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={(e) => fileInputRef.current.click()}
            >
              Add
            </Button>
          </div>
        </div>
      </Menu>
    </div>
  );
}
