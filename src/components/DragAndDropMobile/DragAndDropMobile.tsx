import React from "react";
import { DragCardMobile } from "../DragCardMobile/DragCardMobile";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import classes from "./DragAndDropMobile.module.scss";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

interface Files {
  id: string;
  file: File | null;
}

interface Props {
  sortFiles: (files: Files[]) => Files[];
  addFiles: (photos: File[]) => void;
  largeFile: Files[];
  setLargeFile: (files: Files[]) => void;
  deletePhoto: (id: string) => void;
}

export const DragAndDropMobile: React.FC<Props> = ({
  sortFiles,
  addFiles,
  largeFile,
  setLargeFile,
  deletePhoto,
}) => {
  const dragCard = (dragIndex: number, hoverIndex: number) => {
    const updatedFiles = [...largeFile];
    const draggedItem = updatedFiles[dragIndex];
    updatedFiles.splice(dragIndex, 1);
    updatedFiles.splice(hoverIndex, 0, draggedItem);
    setLargeFile(sortFiles(updatedFiles));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedFiles = [...largeFile];
    const [draggedItem] = updatedFiles.splice(result.source.index, 1);
    updatedFiles.splice(result.destination.index, 0, draggedItem);
    setLargeFile(sortFiles(updatedFiles));
  };

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided) => (
            <div
              className={classes.dragDropContainer}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <input
                type="file"
                id="file"
                multiple
                hidden
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    addFiles(Array.from(e.target.files));
                  }
                }}
              />
              <div className={classes.dragDropContainer}>
                {largeFile.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={classes.draggableItem}
                      >
                        <DragCardMobile
                          key={item.id}
                          index={index}
                          file={item.file}
                          dragCard={dragCard}
                          handleDelete={() => deletePhoto(item.id)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </DndProvider>
  );
};
