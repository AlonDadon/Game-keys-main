import React, { useState } from 'react';
import { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import './App.css';


const finalSpaceGames = [
  {
    id: 'gary',
    like: 'like',
    thumb: '/images/gary.png'
  },
  // {
  //   id: 'cato',
  //   like: 'unLike',
  //   thumb: '/images/cato.png'
  // },
  // {
  //   id: 'kvn',
  //   name: 'KVN',
  //   thumb: '/images/kvn.png'
  // },
  // {
  //   id: 'mooncake',
  //   name: 'Mooncake',
  //   thumb: '/images/mooncake.png'
  // },
  // {
  //   id: 'quinn',
  //   name: 'Quinn Ergon',
  //   thumb: '/images/quinn.png'
  // }
]

export class GameSwipe extends Component {
  state = {
    games: []
  }
  componentDidMount() {
    this.setState({ games: finalSpaceGames })
  }

  // const [characters, updateCharacters] = useState(finalSpaceCharacters);
  // const [characters, updateCharacters] = useState(finalSpaceCharacters);
  // const { characters } = this.state
  handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const { games } = this.state
    const items = Array.from(games);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);


  }
  moveTo(ev) {
    console.log(ev.clientX);
  }
  render() {
    const { games } = this.state
    return (
      <div className="App" >
        <header className="App-header">
          <h1>Final Space games</h1>
          <DragDropContext onDragEnd={this.handleOnDragEnd}>
            <Droppable droppableId="games">
              {(provided) => (
                // <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                <div className="swipe-game games flex justify-center align-center" {...provided.droppableProps} ref={provided.innerRef}>
                  {games.map(({ id }, idx) => {
                    return (
                      <Draggable key={id} draggableId={id} index={idx}>
                        {(provided) => (
                          <div className="card-swipe"
                            onMouseDown={this.moveTo}
                            onMouseMove={this.moveTo}
                           
                            onClick={this.moveTo}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps} ></div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
                // </ul>

              )}
            </Droppable>
          </DragDropContext>
        </header>
        <p>
          Images from <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">Final Space Wiki</a>
        </p>
      </div>
    );
  }
}

