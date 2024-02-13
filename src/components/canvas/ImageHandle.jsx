import { useRef, useMemo } from "react";
import { Button, Grid } from "@mui/material";
import ImageIcon from '@mui/icons-material/PermMediaOutlined';
import UploadIcon from '@mui/icons-material/FileUpload';
import Popup from "./Popup";

export default function ImageHandle(props) {
  const { onClickUpload, images,thumbClick } = props;
  const fileInputRef = useRef();
  const popupRef = useRef(null)
  function handleClick(e) {
    popupRef.current.click(e)
  }

  const thumbnails = useMemo(() => {
    return images.map((info, index) => {
      return (
        <Grid item xs={3}>
          <img
            key={index}
            src={info.dataURL}
            alt={`thumbnail ${index}`}
            className="img-handle-thumbnail"
            onClick={() => thumbClick(info)}
          />
        </Grid>
      );
    });
  }, [images, thumbClick])
  return (
    <div>
      <ImageIcon onClick={ handleClick} className="menu-icon" />
      <Popup ref={popupRef}>
        <div className="img-handle-menu">
          <div className="img-handle-thumbnail-container">
            <Grid container spacing={1}>
              {thumbnails}
            </Grid>
          </div>
          <div style={{display:'flex',justifyContent:'right'}}>
            <input
              ref={fileInputRef}
              className="img-handle-upload"
              id="img-input"
              type="file"
              accept="image/*"
              multiple
              onChange={onClickUpload}
            />
            <UploadIcon
              fontSize="large"
              onClick={(e) => fileInputRef.current.click()}
            />
          </div>
        </div>
      </Popup>
    </div>
  );
}
