import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import classes from "./DragCardMobile.module.scss";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ClearIcon from "@mui/icons-material/Clear";

interface DragCardMobileProps {
  index: number;
  file: File | null;
  dragCard: (dragIndex: number, hoverIndex: number) => void;
  handleDelete: () => void;
}

export const DragCardMobile: React.FC<DragCardMobileProps> = ({
  index,
  file,
  dragCard,
  handleDelete,
}) => {
  const [isOver, setIsOver] = useState(false);

  const [{ isDragging }, dragRef] = useDrag({
    type: "card",
    item: { index, file },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "card",
    hover: (item: { index: number }) => {
      setIsOver(true);
      if (item.index !== index) {
        dragCard(item.index, index);
        item.index = index;
      }
    },
    drop: (item: { index: number }) => {
      setIsOver(false);
      dragCard(item.index, index);
    },
  });

  return (
    <div
      ref={(node) => dragRef(drop(node))}
      className={`${classes.dragCardMobile} ${
        isDragging ? classes.dragging : ""
      }`}
    >
      {isDragging && (
        <div className={`${classes.draggingPreview}`}>
          {file ? (
            <img src={URL.createObjectURL(file)} alt="photo" />
          ) : (
            <CameraAltIcon
              className={classes.icon}
              sx={{ fontSize: "200px" }}
            />
          )}
        </div>
      )}
      {file ? (
        <div className={classes.image}>
          <img src={URL.createObjectURL(file)} alt="photo" />
          <ClearIcon onClick={handleDelete} className={classes.clearIcon} />
        </div>
      ) : (
        <label htmlFor="file" className={classes.cameraIcon} draggable="false">
          <CameraAltIcon className={classes.icon} sx={{ fontSize: "200px" }} />
        </label>
      )}
    </div>
  );
};
