import { useState,useRef } from "react";
import Button from "@mui/material/Button";
import ImageHandle from "./ImageHandle";
export default function Menu(props) {
  const { items, itemsClick, optionSelected } = props;
  const [imageSources, setImageSources] = useState([]);
  function renderMenu(items, itemsClick) {
    return items.map((item) => (
      <button
        style={{
          color:
            (optionSelected && optionSelected.id) === item.id ? "red" : "black",
        }}
        onClick={() => itemsClick(item)}
      >
        {item.shape}
      </button>
    ));
  }
  function handleImageUpload(e) {
      const files = Array.from(e.target.files)
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
          const src = reader.result
          setImageSources(prev => [...prev, src])
      };
      reader.readAsDataURL(file);
    });
  }
  return (
    <div className="canvas-menu">
      {renderMenu(items, itemsClick)}
          <ImageHandle onClickUpload={handleImageUpload} imageSources={imageSources} />
    </div>
  );
}
