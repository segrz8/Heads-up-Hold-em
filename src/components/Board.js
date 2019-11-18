import React from 'react'
import './Board.scss'

function Board(props) {
    const { flop1, flop2, flop3, turn, river, renderCard, determineSuit } = props

    const flopOnTheBoard =
        <>
            <div className={`card ${renderCard(flop1)}`}>{<div><p>{flop1 && flop1.valueFont}</p> <div className="suit"><img src={determineSuit(flop1 && flop1.suit)} alt="suit" /></div></div>}</div>
            <div className={`card ${renderCard(flop2)}`}>{<div><p>{flop2 && flop2.valueFont}</p> <div className="suit"><img src={determineSuit(flop2 && flop2.suit)} alt="suit" /></div></div>}</div>
            <div className={`card ${renderCard(flop3)}`}>{<div><p>{flop3 && flop3.valueFont}</p> <div className="suit"><img src={determineSuit(flop3 && flop3.suit)} alt="suit" /></div></div>}</div>
        </>

    const turnOnTheBoard = <div className={`card ${renderCard(turn)}`}>{<div><p>{turn && turn.valueFont}</p> <div className="suit"><img src={determineSuit(turn && turn.suit)} alt="suit" /></div></div>}</div>

    const riverOnTheBoard = <div className={`card ${renderCard(river)}`}>{<div><p>{river && river.valueFont}</p> <div className="suit"><img src={determineSuit(river && river.suit)} alt="suit" /></div></div>}</div>

    if (!flop1) return null
    else if (flop1 && !turn) return (
        <div className="board">
            {flopOnTheBoard}
        </div>
    ); else if (turn && !river) return (
        <div className="board">
            {flopOnTheBoard}
            {turnOnTheBoard}
        </div>
    ); else if (river) return (
        <div className="board">
            {flopOnTheBoard}
            {turnOnTheBoard}
            {riverOnTheBoard}
        </div>
    )
}

export default Board
