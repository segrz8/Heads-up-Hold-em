import React from 'react'
import BetInput from './BetInput';
import BetSlider from './BetSlider';
import './BettingOptions.css'

function BettingOptions(props) {
    const { player1money, player1bet, player2bet, disabled, smallBlindAmount, bet, bigBlindAmount, betAmountChange, allIn, betIncreaseDecrease } = props
    return (
        <div className="bet">
            <div className="inputAndAllIn">
                <BetInput
                    bet={bet}
                    player1bet={player1bet}
                    player2bet={player2bet}
                    bigBlindAmount={bigBlindAmount}
                    smallBlindAmount={smallBlindAmount}
                    disabled={disabled}
                    betAmountChange={betAmountChange}
                />
                <button
                    className="allIn"
                    disabled={disabled}
                    onClick={allIn}
                >All-In</button>
            </div>
            <div className="sliderAndPlusMinus">
                <button
                    className="betMinus"
                    disabled={disabled}
                    onClick={() => betIncreaseDecrease('-')}
                >-</button>
                <BetSlider
                    player1money={player1money}
                    player1bet={player1bet}
                    smallBlindAmount={smallBlindAmount}
                    disabled={disabled}
                    betAmountChange={betAmountChange}
                    bet={bet}
                />
                <button
                    className="betPlus"
                    disabled={disabled}
                    onClick={() => betIncreaseDecrease('+')}
                >+</button>
            </div>
        </div>
    )
}

export default BettingOptions
