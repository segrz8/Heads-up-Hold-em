import React from 'react'
import './Board.css'

function Board(props) {
    const { flop1, flop2, flop3, turn, river, renderCard } = props
    if (!flop1) return null
    else if (flop1 && !turn) return (
        <div className="board">
            <div className={`card flop1 ${renderCard(flop1)}`}>{<div><p>{flop1.valueFont}</p> <p className="suitFont">{flop1.suitFont}</p></div>}</div>
            <div className={`card flop2 ${renderCard(flop2)}`}>{<div><p>{flop2.valueFont}</p> <p className="suitFont">{flop2.suitFont}</p></div>}</div>
            <div className={`card flop3 ${renderCard(flop3)}`}>{<div><p>{flop3.valueFont}</p> <p className="suitFont">{flop3.suitFont}</p></div>}</div>
        </div>
    ); else if (turn && !river) return (
        <div className="board">
            <div className={`card flop1 ${renderCard(flop1)}`}>{<div><p>{flop1.valueFont}</p> <p className="suitFont">{flop1.suitFont}</p></div>}</div>
            <div className={`card flop2 ${renderCard(flop2)}`}>{<div><p>{flop2.valueFont}</p> <p className="suitFont">{flop2.suitFont}</p></div>}</div>
            <div className={`card flop3 ${renderCard(flop3)}`}>{<div><p>{flop3.valueFont}</p> <p className="suitFont">{flop3.suitFont}</p></div>}</div>
            <div className={`card turn ${renderCard(turn)}`}>{<div><p>{turn.valueFont}</p> <p className="suitFont">{turn.suitFont}</p></div>}</div>
        </div>
    ); else if (river) return (
        <div className="board">
            <div className={`card flop1 ${renderCard(flop1)}`}>{<div><p>{flop1.valueFont}</p> <p className="suitFont">{flop1.suitFont}</p></div>}</div>
            <div className={`card flop2 ${renderCard(flop2)}`}>{<div><p>{flop2.valueFont}</p> <p className="suitFont">{flop2.suitFont}</p></div>}</div>
            <div className={`card flop3 ${renderCard(flop3)}`}>{<div><p>{flop3.valueFont}</p> <p className="suitFont">{flop3.suitFont}</p></div>}</div>
            <div className={`card turn ${renderCard(turn)}`}>{<div><p>{turn.valueFont}</p> <p className="suitFont">{turn.suitFont}</p></div>}</div>
            <div className={`card river ${renderCard(river)}`}>{<div><p>{river.valueFont}</p> <p className="suitFont">{river.suitFont}</p></div>}</div>
        </div>
    )
}

export default Board
