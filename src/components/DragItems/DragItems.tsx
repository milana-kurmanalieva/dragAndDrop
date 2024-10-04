import { DragCard } from "../DragCard/DragCard";
import classes from "./DragItems.module.scss";
import { Files } from "../Advertisements/Advertisements";
import { Props } from "../Advertisements/Advertisements";

export const DragItems: React.FC<Props> = ({
  largeFile,
  setLargeFile,
  draggedIndex,
  setDraggedIndex,
  sortFiles,
  addFiles,
  deletePhoto,
}) => {
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      const items = [...largeFile];
      const draggedItem = items[draggedIndex];

      if (items[index].file !== null) {
        items.splice(draggedIndex, 1);
        items.splice(index, 0, draggedItem);
        setLargeFile(sortFiles(items));
      } else {
        setDraggedIndex(draggedIndex);
      }
    }
    setDraggedIndex(null);
  };

  const renderDragCard = (item: Files, index: number, className: string) => (
    <DragCard
      key={item.id}
      classCard={className}
      image={item.file}
      onChangeFiles={(photos: File[]) => addFiles(photos)}
      isDragging={draggedIndex === index}
      onDragStart={() => handleDragStart(index)}
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(index)}
      disabled={item.file !== null}
      onDelete={() => deletePhoto(item.id)}
    />
  );

  return (
    <div className={classes.dragItems}>
      <div className={classes.firstPhoto}>
        {largeFile
          .slice(0, 1)
          .map((item, index) =>
            renderDragCard(item, index, classes.firstPhoto)
          )}
        <p>Главное фото</p>
      </div>
      <div className={classes.dragSmallPhotos}>
        {largeFile
          .slice(1)
          .map((item, index) =>
            renderDragCard(item, index + 1, classes.smallCard)
          )}
      </div>
    </div>
  );
};
