import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Slot from './components/Slot/Slot';
import Sticker from './components/Sticker/Sticker';

import styles from './App.module.scss';

const stickerbook = {
  1: 'available',
  2: 'available',
  3: 'available'
}

const App = () => {
  const [stickerbookStatus, setStickerbookStatus] = useState(stickerbook);

  const onComplete = id => {
    setStickerbookStatus(stickerbookStatus => {
      const newStatus = { ...stickerbookStatus };
      newStatus[id] = 'completed';

      return newStatus
    });
  }

  const onDrag = id => {
    setStickerbookStatus(stickerbookStatus => {
      const newStatus = { ...stickerbookStatus };
      newStatus[id] = 'dragging';

      return newStatus
    });
  }

  const onDragCancel = id => {
    setStickerbookStatus(stickerbookStatus => {
      const newStatus = { ...stickerbookStatus };
      newStatus[id] = 'available';

      return newStatus
    });
  }

  return (
    <div className={styles.App}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.stickerbook}>
          <div>
            {Object.keys(stickerbookStatus).map(slot => {
              return <Slot id={slot} completed={stickerbookStatus[slot] === 'completed'} onComplete={onComplete} key={slot} />
            })}
          </div>
          <div>
            {Object.keys(stickerbookStatus).map(slot => {
              switch (stickerbookStatus[slot]) {
                case 'available':
                  return <Sticker id={slot} key={slot} draggable={true} onDrag={onDrag} onDragCancel={onDragCancel} />
                case 'dragging':
                  return <div className={styles.placeholder} key={slot} />
                default:
                  return null
              }
            })}
          </div>
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
