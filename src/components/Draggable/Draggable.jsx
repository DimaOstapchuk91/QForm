import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const Draggable = props => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
};

export default Draggable;
