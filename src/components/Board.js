import React from 'react'
import './Board.css'

function Board(props) {
    const { flop1, flop2, flop3, turn, river, renderCard, determineSuit } = props
    if (!flop1) return null
    else if (flop1 && !turn) return (
        <div className="board">
            <div className={`card flop1 ${renderCard(flop1)}`}>{<div><p>{flop1.valueFont}</p> <div className="suit"><img src={determineSuit(flop1.suit)} alt="suit" /></div></div>}</div>
            <div className={`card flop2 ${renderCard(flop2)}`}>{<div><p>{flop2.valueFont}</p> <div className="suit"><img src={determineSuit(flop2.suit)} alt="suit" /></div></div>}</div>
            <div className={`card flop3 ${renderCard(flop3)}`}>{<div><p>{flop3.valueFont}</p> <div className="suit"><img src={determineSuit(flop3.suit)} alt="suit" /></div></div>}</div>
        </div>
    ); else if (turn && !river) return (
        <div className="board">
            <div className={`card flop1 ${renderCard(flop1)}`}>{<div><p>{flop1.valueFont}</p> <div className="suit"><img src={determineSuit(flop1.suit)} alt="suit" /></div></div>}</div>
            <div className={`card flop2 ${renderCard(flop2)}`}>{<div><p>{flop2.valueFont}</p> <div className="suit"><img src={determineSuit(flop2.suit)} alt="suit" /></div></div>}</div>
            <div className={`card flop3 ${renderCard(flop3)}`}>{<div><p>{flop3.valueFont}</p> <div className="suit"><img src={determineSuit(flop3.suit)} alt="suit" /></div></div>}</div>
            <div className={`card turn ${renderCard(turn)}`}>{<div><p>{turn.valueFont}</p> <div className="suit"><img src={determineSuit(turn.suit)} alt="suit" /></div></div>}</div>
        </div>
    ); else if (river) return (
        <div className="board">
            <div className={`card flop1 ${renderCard(flop1)}`}>{<div><p>{flop1.valueFont}</p> <div className="suit"><img src={determineSuit(flop1.suit)} alt="suit" /></div></div>}</div>
            <div className={`card flop2 ${renderCard(flop2)}`}>{<div><p>{flop2.valueFont}</p> <div className="suit"><img src={determineSuit(flop2.suit)} alt="suit" /></div></div>}</div>
            <div className={`card flop3 ${renderCard(flop3)}`}>{<div><p>{flop3.valueFont}</p> <div className="suit"><img src={determineSuit(flop3.suit)} alt="suit" /></div></div>}</div>
            <div className={`card turn ${renderCard(turn)}`}>{<div><p>{turn.valueFont}</p> <div className="suit"><img src={determineSuit(turn.suit)} alt="suit" /></div></div>}</div>
            <div className={`card river ${renderCard(river)}`}>{<div><p>{river.valueFont}</p> <div className="suit"><img src={determineSuit(river.suit)} alt="suit" /></div></div>}</div>
        </div>
    )
}

export default Board
