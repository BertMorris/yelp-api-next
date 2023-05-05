import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import CuisineDndCard from "./CuisineDndCard";

type Props = {
  itemList: string[];
  setItemList: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function CuisineDndList({ itemList, setItemList }: Props) {
  const cuisines = [
    "American",
    "Italian",
    "French",
    "Chinese",
    "Mexican",
    "Thai",
    "Vegetarian",
    "Mediterranean",
    "Indian",
  ];

  // Function to update list on drop
  const handleDrop = (droppedItem: any) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    const updatedList = [...itemList];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setItemList(updatedList);
  };

  return (
    <div className="cuisine__dnd-list">
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list-container">
          {(provided) => (
            <div
              className="list-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {itemList.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided) => (
                    <div
                      className="item-container"
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <CuisineDndCard item={item} />
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
}
