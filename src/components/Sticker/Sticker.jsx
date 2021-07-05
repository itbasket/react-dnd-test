import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';

import styles from './Sticker.module.scss';

const Sticker = ({ id, draggable, onDrag, onDragCancel }) => {
  const [{isDragging}, drag] = useDrag(() => ({
    type: 'sticker',
    item: { id },
    canDrag: draggable,
    end: (item, monitor) => !monitor.didDrop() && onDragCancel(id),
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  useEffect(() => {
    isDragging && onDrag(id);
  }, [isDragging])

  return(
    <div
      className={styles.Sticker}
      ref={drag}
    >
      {id}
    </div>
  );
}

export default Sticker;