import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import RestaurantCard from "./RestaurantCard";

type Restaurant = {
  id: string;
  name: string;
  image_url: string;
  url: string;
  rating: number;
  review_count: number;
};

type Props = {
  itemList: Restaurant[];
  setItemList: React.Dispatch<React.SetStateAction<Restaurant[]>>;
};

export default function App({ itemList, setItemList }: Props) {
  // update list on drop
  const handleDrop = (droppedItem: any) => {
    // ignore drop outside droppable container
    if (!droppedItem.destination) return;
    const updatedList = [...itemList];
    // remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // update list
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
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      className="item-container"
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <RestaurantCard restaurant={item} />
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
