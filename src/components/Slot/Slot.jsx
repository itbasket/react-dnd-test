import React from 'react';
import { useDrop } from 'react-dnd';
import Sticker from '../Sticker/Sticker';

import styles from './Slot.module.scss';

const Slot = ({ id, completed, onComplete }) => {

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'sticker',
      drop: () => onComplete(id),
      canDrop: item => item.id === id,
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    })
  )

  return(
    <div
      className={styles.Slot}
      ref={drop}
    >
      {completed
        ? <Sticker id={id} draggable={false} />
        : id
      }
    </div>
  );
}

export default Slot;