import classNames from "classnames";
import classes from "./DragCard.module.scss";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect } from "react";

interface Props {
  classCard?: string;
  onChangeFiles?: (files: File[]) => void;
  image?: File | null;
  draggable?: boolean;
  isDragging?: boolean;
  onDragStart?: () => void;
  onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: () => void;
  disabled?: boolean;
  onDelete?: () => void;
}

export const DragCard: React.FC<Props> = (props) => {
  const {
    classCard,
    onChangeFiles,
    image,
    isDragging,
    onDragStart,
    onDragOver,
    onDrop,
    disabled,
    onDelete,
  } = props;

  const [isDraggable, setIsDraggable] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (onChangeFiles) {
      onChangeFiles(files);
    }
  };

  useEffect(() => {
    setIsDraggable(!!image);
  }, [image]);

  return (
    <>
      {image ? (
        <div
          className={classNames(classes.dragCard, classCard, {
            [classes.dragging]: isDragging,
          })}
          draggable={isDraggable}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <img src={URL.createObjectURL(image)} alt="preview" />
          <ClearIcon className={classes.delete} onClick={onDelete} />
        </div>
      ) : (
        <label
          htmlFor="file"
          className={classNames(classes.dragCard, classCard, {
            [classes.dragging]: isDragging,
          })}
        >
          <input
            type="file"
            id="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
            disabled={disabled}
            multiple
          />
          <CameraAltIcon />
        </label>
      )}
    </>
  );
};
