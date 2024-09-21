import { useState } from 'react';
import { DragEndEvent, UniqueIdentifier, DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const initialItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

const DraggableList = () => {
  const [items, setItems] = useState<UniqueIdentifier[]>(initialItems);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
  
    if (active && over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
  
      if (oldIndex !== -1 && newIndex !== -1) {
        setItems((items) => arrayMove(items, oldIndex, newIndex));
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul className="space-y-2">
          {items.map((item) => (
            <SortableListItem key={item} id={item.toString()} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

interface SortableListItemProps {
  id: string;
}

const SortableListItem = ({ id }: SortableListItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
    >
      {id}
    </li>
  );
};

export default DraggableList;
