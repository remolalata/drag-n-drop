import { useState, useEffect } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface RowData {
  id: string;
  name: string;
  age: number;
}

const initialData: RowData[] = [
  { id: '1', name: 'John', age: 25 },
  { id: '2', name: 'Jane', age: 28 },
  { id: '3', name: 'Bob', age: 22 },
];

const DraggableTable = () => {
  const [data, setData] = useState<RowData[]>(initialData);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;

    const oldIndex = data.findIndex(item => item.id === active.id);
    const newIndex = data.findIndex(item => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      setData((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={data.map(item => item.id)} strategy={verticalListSortingStrategy}>
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="p-4 border">Name</th>
              <th className="p-4 border">Age</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <SortableRow key={row.id} id={row.id} name={row.name} age={row.age} />
            ))}
          </tbody>
        </table>
      </SortableContext>
    </DndContext>
  );
};

interface SortableRowProps {
  id: string;
  name: string;
  age: number;
}

const SortableRow = ({ id, name, age }: SortableRowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners} className="hover:bg-gray-100">
      <td className="p-4 border">{name}</td>
      <td className="p-4 border">{age}</td>
    </tr>
  );
};

export default DraggableTable;
