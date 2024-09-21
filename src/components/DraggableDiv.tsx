import { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface DivData {
  id: string;
  content: string;
}

const initialDivs: DivData[] = [
  { id: '1', content: 'Div 1' },
  { id: '2', content: 'Div 2' },
  { id: '3', content: 'Div 3' },
];

const DraggableDivs = () => {
  const [divs, setDivs] = useState<DivData[]>(initialDivs);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return; // Early return if no valid drop or no movement

    const oldIndex = divs.findIndex((item) => item.id === active.id);
    const newIndex = divs.findIndex((item) => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      setDivs((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={divs.map((div) => div.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 gap-4">
          {divs.map((div) => (
            <SortableDiv key={div.id} id={div.id} content={div.content} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

interface SortableDivProps {
  id: string;
  content: string;
}

const SortableDiv = ({ id, content }: SortableDivProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
    >
      {content}
    </div>
  );
};

export default DraggableDivs;
