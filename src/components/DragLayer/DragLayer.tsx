import React from "react";
import { useDragLayer } from "react-dnd";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

interface CustomDragLayerProps {
  largeFile: { id: string; file: File | null }[];
}

export const DragLayer: React.FC<CustomDragLayerProps> = ({ largeFile }) => {
  const { item, isDragging, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  const renderPreview = () => {
    const file = largeFile[item.index]?.file;
    return file ? (
      <img
        src={URL.createObjectURL(file)}
        alt="preview"
        style={{ width: "100%", height: "100%" }}
      />
    ) : (
      <CameraAltIcon sx={{ fontSize: "200px" }} />
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none", // Чтобы элемент не мешал взаимодействию
        left: currentOffset.x,
        top: currentOffset.y,
        transform: `translate(-50%, -50%)`, // Для центрирования картинки под пальцем
        width: "150px",
        height: "150px",
        zIndex: 100,
      }}
    >
      {renderPreview()}
    </div>
  );
};
