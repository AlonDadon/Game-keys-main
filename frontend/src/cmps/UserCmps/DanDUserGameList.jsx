import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom'

// const finalSpaceCharacters = [
//   {
//     id: 'gary',
//     name: 'Gary Goodspeed',
//     thumb: '/images/gary.png'
//   },
//   {
//     id: 'cato',
//     name: 'Little Cato',
//     thumb: '/images/cato.png'
//   },
//   {
//     id: 'kvn',
//     name: 'KVN',
//     thumb: '/images/kvn.png'
//   },
//   {
//     id: 'mooncake',
//     name: 'Mooncake',
//     thumb: '/images/mooncake.png'
//   },
//   {
//     id: 'quinn',
//     name: 'Quinn Ergon',
//     thumb: '/images/quinn.png'
//   }
// ]

export function DanDUserGameList({ orders, onGameClicked }) {
  const [boughtGamess, updateGames] = useState(orders);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(boughtGamess);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateGames(items);
  }
  // if
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="boughtGamess" direction="horizontal">
        {(provided) => (
          <div className="boughtGamess mb-20" {...provided.droppableProps} ref={provided.innerRef}>
            {boughtGamess.map(({ game }, index) => {
              return (
                <Draggable key={game._id} draggableId={game._id} index={index}>
                  {(provided) => (
                    <div onClick={() => onGameClicked(game.serialKey)} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <div className="game-user-preview">
                        <div className="user-game-card">
                          <div className="user-game-card-img">
                            <img src={game.img} alt=""></img>
                          </div>
                          <div className="user-game-title">
                            <h2>{game.title}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                  }
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext >
  );
}
