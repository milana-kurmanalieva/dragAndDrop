import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const Drag = () => {
  const initialItems = ["avcsjdvnskdnvsjdn", "bdcjsdkncsjdn", "cdcjksdncsjn"];
  const [arr, setArr] = useState<string[]>(initialItems);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(arr);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setArr(items);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="droppable"
            >
              {arr.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="item"
                    >
                      {item}уоытывтауыватсуытт
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
