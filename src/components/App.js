import React from 'react';
import './App.scss';
import OperatingButtons from './OperatingButtons';
import PlayersHUDs from './PlayersHUDs';
import Board from './Board';
import MoneyInTheMiddle from './MoneyInTheMiddle';
import GameButtons from './GameButtons';
import DealerButton from './DealerButton';
import BettingOptions from './BettingOptions';
import ActionInfo from './ActionInfo';
import Timer from './Timer';

import hearts from '../suitsImg/hearts.png'
import spades from '../suitsImg/spades.png'
import diamonds from '../suitsImg/diamonds.png'
import clubs from '../suitsImg/clubs.png'

const startMoney = 3000
const timeBeforePlayer2acts = 1500

let startCountdown
// Optional time for player to analize after showdown
// let finalizeShowdown

class App extends React.Component {
	state = {
		deck: [
			{ valueFont: 'A', value: 14, suit: 'hearts' },
			{ valueFont: 'K', value: 13, suit: 'hearts' },
			{ valueFont: 'Q', value: 12, suit: 'hearts' },
			{ valueFont: 'J', value: 11, suit: 'hearts' },
			{ valueFont: '10', value: 10, suit: 'hearts' },
			{ valueFont: '9', value: 9, suit: 'hearts' },
			{ valueFont: '8', value: 8, suit: 'hearts' },
			{ valueFont: '7', value: 7, suit: 'hearts' },
			{ valueFont: '6', value: 6, suit: 'hearts' },
			{ valueFont: '5', value: 5, suit: 'hearts' },
			{ valueFont: '4', value: 4, suit: 'hearts' },
			{ valueFont: '3', value: 3, suit: 'hearts' },
			{ valueFont: '2', value: 2, suit: 'hearts' },
			{ valueFont: 'A', value: 14, suit: 'spades' },
			{ valueFont: 'K', value: 13, suit: 'spades' },
			{ valueFont: 'Q', value: 12, suit: 'spades' },
			{ valueFont: 'J', value: 11, suit: 'spades' },
			{ valueFont: '10', value: 10, suit: 'spades' },
			{ valueFont: '9', value: 9, suit: 'spades' },
			{ valueFont: '8', value: 8, suit: 'spades' },
			{ valueFont: '7', value: 7, suit: 'spades' },
			{ valueFont: '6', value: 6, suit: 'spades' },
			{ valueFont: '5', value: 5, suit: 'spades' },
			{ valueFont: '4', value: 4, suit: 'spades' },
			{ valueFont: '3', value: 3, suit: 'spades' },
			{ valueFont: '2', value: 2, suit: 'spades' },
			{ valueFont: 'A', value: 14, suit: 'diamonds' },
			{ valueFont: 'K', value: 13, suit: 'diamonds' },
			{ valueFont: 'Q', value: 12, suit: 'diamonds' },
			{ valueFont: 'J', value: 11, suit: 'diamonds' },
			{ valueFont: '10', value: 10, suit: 'diamonds' },
			{ valueFont: '9', value: 9, suit: 'diamonds' },
			{ valueFont: '8', value: 8, suit: 'diamonds' },
			{ valueFont: '7', value: 7, suit: 'diamonds' },
			{ valueFont: '6', value: 6, suit: 'diamonds' },
			{ valueFont: '5', value: 5, suit: 'diamonds' },
			{ valueFont: '4', value: 4, suit: 'diamonds' },
			{ valueFont: '3', value: 3, suit: 'diamonds' },
			{ valueFont: '2', value: 2, suit: 'diamonds' },
			{ valueFont: 'A', value: 14, suit: 'clubs' },
			{ valueFont: 'K', value: 13, suit: 'clubs' },
			{ valueFont: 'Q', value: 12, suit: 'clubs' },
			{ valueFont: 'J', value: 11, suit: 'clubs' },
			{ valueFont: '10', value: 10, suit: 'clubs' },
			{ valueFont: '9', value: 9, suit: 'clubs' },
			{ valueFont: '8', value: 8, suit: 'clubs' },
			{ valueFont: '7', value: 7, suit: 'clubs' },
			{ valueFont: '6', value: 6, suit: 'clubs' },
			{ valueFont: '5', value: 5, suit: 'clubs' },
			{ valueFont: '4', value: 4, suit: 'clubs' },
			{ valueFont: '3', value: 3, suit: 'clubs' },
			{ valueFont: '2', value: 2, suit: 'clubs' },
		],
		shuffledDeck: null,
		player1card1: null,
		player1card2: null,
		player2card1: null,
		player2card2: null,
		stage: 'preFlop',
		flop1: null,
		flop2: null,
		flop3: null,
		turn: null,
		river: null,
		player1money: startMoney,
		player2money: startMoney,
		smallBlindAmount: startMoney / 600,
		bigBlindAmount: startMoney / 300,
		pot: 0,
		bet: 0,
		player1bet: 0,
		player2bet: 0,
		dealerButtonPosition: Boolean(Math.round(Math.random())),
		disabled: true,
		disabledDeal: false,
		disabledShowdown: true,
		timerActive: false,
		timeToAct: 60000,
		dealCount: 1,
		showPlayer2cards: false,
		actionInfo: '',
		p2timerFix: false,
		blockP2afterShowdown: false,
	}

	dealCards = () => {
		const { dealerButtonPosition, player1money, player2money, smallBlindAmount, bigBlindAmount, deck } = this.state

		// Game over
		if (player1money === 0 || player2money === 0) {
			this.setState({
				player1money: startMoney,
				player2money: startMoney,
				dealCount: 1,
				disabledDeal: false,
				smallBlindAmount: startMoney / 600,
				bigBlindAmount: startMoney / 300,
			});
		}

		// Game on
		else {
			if (!dealerButtonPosition) {
				setTimeout(() => {
					this.player2turn()
				}, timeBeforePlayer2acts);
			} else {
				this.startCountdown()
			}

			// Shuffle deck
			let shuffledDeck = [...deck]

			for (let i = shuffledDeck.length - 1; i > 0; i--) {
				let j = Math.floor(Math.random() * (i + 1));
				let temp = shuffledDeck[i];
				shuffledDeck[i] = shuffledDeck[j];
				shuffledDeck[j] = temp;
			}

			this.setState({
				player1money: dealerButtonPosition ? player1money - smallBlindAmount : player1money - bigBlindAmount,
				player2money: !dealerButtonPosition ? player2money - smallBlindAmount : player2money - bigBlindAmount,
				bet: bigBlindAmount * 2,
				player1bet: dealerButtonPosition ? smallBlindAmount : bigBlindAmount,
				player2bet: !dealerButtonPosition ? smallBlindAmount : bigBlindAmount,
				shuffledDeck,
				player1card1: shuffledDeck[0],
				player1card2: shuffledDeck[1],
				player2card1: shuffledDeck[2],
				player2card2: shuffledDeck[3],
				disabled: dealerButtonPosition ? false : true,
				disabledDeal: true,
				showPlayer2cards: false,
				blockP2afterShowdown: false,
			})

			this.animateBetRaiseChips('p1')
			this.animateBetRaiseChips('p2')
		}
	}

	startCountdown = () => {
		this.setState({ timerActive: true, });
		startCountdown = setTimeout(() => {
			this.fold()
			this.setState({ timerActive: false });
		}, this.state.timeToAct);
	}

	player2turn = () => {
		const { player1money, player2money, player1bet, player2bet, stage, dealerButtonPosition, player2card1, player2card2, flop1, flop2, flop3, turn, river, bigBlindAmount, blockP2afterShowdown } = this.state

		const handOf7player2 = [player2card1, player2card2, flop1, flop2, flop3, turn, river]

		if (stage === 'preFlop') {
			// const currentHand = this.evaluateHand(handOf7player2.slice(0, 2))
			// console.log(currentHand)
			if (player1money === 0 || player2money + player2bet === player1bet) {
				if ((player2card1.value + player2card2.value > 20) || (player2card1.value === player2card2.value)) this.call()
				else this.fold()
			} else if (player1bet <= bigBlindAmount && (((player2card1.value + player2card2.value) > 12) || (player2card1.suit === player2card2.suit) || (player2card1.value === player2card2.value))) {
				this.raisePlayer2()
			} else if (player1bet > bigBlindAmount) {
				if ((player2card1.value + player2card2.value) >= 20) this.raisePlayer2()
				else if (20 > (player2card1.value + player2card2.value) > 14) this.call()
				else this.fold()
			} else this.fold()
		} else if (stage === 'flop') {
			const currentHand = this.evaluateHand(handOf7player2.slice(0, 5))
			// console.log(currentHand)
			// Facing allin
			if (player1money === 0 || player2money + player2bet === player1bet) {
				if (currentHand[0] > 1) this.call()
				else if (currentHand[0] === 1) {
					const index = Math.floor(Math.random() * 10)
					if (index > 3) this.call()
					else this.fold()
				} else this.fold()
				// Continuation bet
			} else if (!dealerButtonPosition && player1bet === 0) {
				const index = Math.floor(Math.random() * 10)
				if (index > 2) this.betPlayer2()
				else this.fold()
				// Donk bet
			} else if (dealerButtonPosition && player1bet === 0) {
				const index = Math.floor(Math.random() * 10)
				if (index > 2) this.betPlayer2()
				else this.fold()
				// Monster and bet
			} else if (currentHand[0] > 1 && player1bet === 0) {
				const index = Math.floor(Math.random() * 10)
				if (index > 2) this.betPlayer2()
				else this.fold()
				// Monster and raise
			} else if (currentHand[0] > 1 && player1bet !== 0) {
				const index = Math.floor(Math.random() * 10)
				if (index > 2) this.raisePlayer2()
				else this.fold()
				// One pair
			} else if (currentHand[0] === 1) {
				const index = Math.floor(Math.random() * 10)
				if (index > 3) this.call()
				else this.fold()
				// Other
			} else {
				const index = Math.floor(Math.random() * 3)
				if (index === 0) this.raisePlayer2()
				else if (index === 1) this.call()
				else this.fold()
			}
		} else if (stage === 'turn') {
			const currentHand = this.evaluateHand(handOf7player2.slice(0, 6))
			// console.log(currentHand)
			if (player1money === 0 || player2money + player2bet === player1bet) {
				if (currentHand[0] > 1) this.call()
				else if (currentHand[0] === 1) {
					const index = Math.floor(Math.random() * 10)
					if (index > 3) this.call()
					else this.fold()
				} else this.fold()
			} else if (!dealerButtonPosition && player1bet === 0) {
				const index = Math.floor(Math.random() * 10)
				if (index > 2) this.betPlayer2()
				else this.fold()
			} else if (dealerButtonPosition && player1bet === 0) {
				const index = Math.floor(Math.random() * 10)
				if (index > 2) this.betPlayer2()
				else this.fold()
			} else if (currentHand[0] > 1 && player1bet === 0) {
				const index = Math.floor(Math.random() * 10)
				if (index > 2) this.betPlayer2()
				else this.fold()
			} else if (currentHand[0] > 1 && player1bet !== 0) {
				const index = Math.floor(Math.random() * 10)
				if (index > 2) this.raisePlayer2()
				else this.fold()
			} else if (currentHand[0] === 1) {
				const index = Math.floor(Math.random() * 10)
				if (index > 3) this.call()
				else this.fold()
			} else {
				const index = Math.floor(Math.random() * 3)
				if (index === 0) this.raisePlayer2()
				else if (index === 1) this.call()
				else this.fold()
			}
		} else if (stage === 'river') {
			const currentHand = this.evaluateHand(handOf7player2)
			// console.log(currentHand)
			if (player1money === 0 || player2money + player2bet === player1bet) {
				if (currentHand[0] > 1) this.call()
				else if (currentHand[0] === 1) {
					const index = Math.floor(Math.random() * 10)
					if (index > 3) this.call()
					else this.fold()
				} else this.fold()
			} else if (!dealerButtonPosition && player1bet === 0) {
				const index = Math.floor(Math.random() * 10)
				if (index > 2) this.betPlayer2()
				else this.fold()
			} else if (dealerButtonPosition && player1bet === 0) {
				const index = Math.floor(Math.random() * 10)
				if (index > 2) this.betPlayer2()
				else this.fold()
			} else if (currentHand[0] > 1 && player1bet === 0) {
				const index = Math.floor(Math.random() * 10)
				if (index > 2) this.betPlayer2()
				else this.fold()
			} else if (currentHand[0] > 1 && player1bet !== 0) {
				const index = Math.floor(Math.random() * 10)
				if (index > 2) this.raisePlayer2()
				else this.fold()
			} else if (currentHand[0] === 1) {
				const index = Math.floor(Math.random() * 10)
				if (index > 3) this.call()
				else this.fold()
			} else {
				const index = Math.floor(Math.random() * 3)
				if (index === 0) this.raisePlayer2()
				else if (index === 1) this.call()
				else this.fold()
			}
		}

		this.setSlider()

		// Countdown starts only after p2 actually starts his turn
		if (this.state.p2timerFix) this.setState({ p2timerFix: false });
		// Start countdown always but after showdown
		else if (!blockP2afterShowdown) this.startCountdown()
	}

	setSlider = () => {
		const { stage, player1bet, player2bet, smallBlindAmount, bigBlindAmount } = this.state

		if (stage === 'preFlop' && (player1bet === smallBlindAmount || player2bet === smallBlindAmount)) this.setState({ bet: bigBlindAmount * 2 });
		else if (player2bet === 0) this.setState({ bet: bigBlindAmount });
		else this.setState({ bet: player2bet * 2 - player1bet });
	}

	// Auto show cards and compare hands after last action in a hand
	showCards = () => {
		const { player1card1, player1card2, player2card1, player2card2, flop1, flop2, flop3, turn, river, stage } = this.state

		this.setState({
			timerActive: false,
		});

		const handOf7player1 = [player1card1, player1card2, flop1, flop2, flop3, turn, river]
		const handOf7player2 = [player2card1, player2card2, flop1, flop2, flop3, turn, river]

		// Specific hands for tests:

		// const handOf7player1 = [
		// 	{ valueFont: '9', value: 12, suit: 'c' },
		// 	{ valueFont: '8', value: 12, suit: 'c' },
		// 	{ valueFont: '7', value: 6, suit: 'c' },
		// 	{ valueFont: '6', value: 12, suit: 'clubs' },
		// 	{ valueFont: '5', value: 9, suit: 'clubs' },
		// 	{ valueFont: '4', value: 13, suit: 'clubs' },
		// 	{ valueFont: '3', value: 3, suit: 'clubs' },
		// ]
		// const handOf7player2 = [
		// 	{ valueFont: '9', value: 12, suit: 'c' },
		// 	{ valueFont: '8', value: 12, suit: 'c' },
		// 	{ valueFont: '7', value: 6, suit: 'c' },
		// 	{ valueFont: '6', value: 12, suit: 'clubs' },
		// 	{ valueFont: '5', value: 9, suit: 'clubs' },
		// 	{ valueFont: '4', value: 13, suit: 'clubs' },
		// 	{ valueFont: '3', value: 3, suit: 'clubs' },
		// ]

		const result = this.compareHands(handOf7player1, handOf7player2)
		// console.log(result)

		this.showdown(result)
		this.animateCallChips('fold')

		// Optional time for the player to analize the result

		// finalizeShowdown = setTimeout(() => {
		// 	this.setState({
		// 		player1bet: 0,
		// 		player2bet: 0,
		// 		disabledShowdown: !disabledShowdown,
		// 		dealerButtonPosition: !dealerButtonPosition,
		// 		player1card1: null,
		// 		player1card2: null,
		// 		player2card1: null,
		// 		player2card2: null,
		// 		stage: 'preflop',
		// 		flop1: null,
		// 		flop2: null,
		// 		flop3: null,
		// 		turn: null,
		// 		river: null,
		// 		actionInfo: '',
		// 	});
		// 	this.dealCards()
		// }, 300000);

		if (stage === 'river') {
			this.setState({
				pot: 0,
			});
		}
	}

	blindsGoUp = () => {
		const { dealCount, smallBlindAmount, bigBlindAmount } = this.state

		if (dealCount % 5 === 0) {
			this.setState({
				smallBlindAmount: smallBlindAmount * 2,
				bigBlindAmount: bigBlindAmount * 2,
			});
		}
		this.setState({ dealCount: dealCount + 1 });
	}

	// On New Hand click
	newHand = () => {
		const { disabledShowdown, dealerButtonPosition } = this.state

		// Optional time for the player to analize the result
		// clearTimeout(finalizeShowdown)

		this.setState({
			player1bet: 0,
			player2bet: 0,
			disabledShowdown: !disabledShowdown,
			dealerButtonPosition: !dealerButtonPosition,
			player1card1: null,
			player1card2: null,
			player2card1: null,
			player2card2: null,
			stage: 'preFlop',
			flop1: null,
			flop2: null,
			flop3: null,
			turn: null,
			river: null,
			actionInfo: '',
		});
		setTimeout(() => {
			this.dealCards()
		}, 0);
	}

	showdown = (result) => {
		const { player1money, player2money, player1bet, player2bet, pot } = this.state

		if (result === 'player1won') {
			// Not allin or p2 is covered
			if (player1bet >= player2bet) {
				this.setState({
					player1money: player1money + pot + player1bet + player2bet,
				});
			}
			// Allin and p1 is covered
			else {
				this.setState({
					player1money: pot / 2 + player1bet * 2,
					player2money: pot / 2 + player2bet - player1bet,
				});
			}
			this.setState({
				actionInfo: 'You win',
			});
		} else if (result === 'player2won') {
			// Not allin or p1 is covered
			if (player2bet >= player1bet) {
				this.setState({
					player2money: player2money + pot + player2bet + player1bet,
				});
			}
			// Allin and p2 is covered
			else {
				this.setState({
					player2money: pot / 2 + player2bet * 2,
					player1money: pot / 2 + player1bet - player2bet,
				});
			}
			this.setState({
				actionInfo: 'You lose',
			});
		} else if (result === 'chop') {
			// const choppedPot = player1bet > player2bet ? (pot + player1bet * 2) / 2 : (pot + player2bet * 2) / 2

			// let choppedPot = 0

			// let choppedPotP1 = 0
			// let choppedPotP2 = 0

			if (player1bet === player2bet) {
				this.setState({
					player1money: player1money + pot / 2 + player1bet,
					player2money: player2money + pot / 2 + player1bet,
				});
			}
			else if (player1bet < player2bet) {
				this.setState({
					player1money: pot / 2 + player1bet,
					player2money: player2money + pot / 2 + player2bet,
				});
			}
			else if (player1bet > player2bet) {
				this.setState({
					player1money: player1money + pot / 2 + player1bet,
					player2money: pot / 2 + player2bet,
				});
			}

			// else if (player1bet > player2bet) choppedPot = (pot + player2bet * 2 / 2)

			// let forBB = 0
			// let forSB = 0

			// if (!Number.isInteger(choppedPot)) {
			// 	forBB = choppedPot + .5
			// 	forSB = choppedPot - .5
			// 	this.setState({
			// 		player1money: dealerButtonPosition ? player1money + forSB - player2bet : player1money + forBB - player2bet,
			// 		player2money: !dealerButtonPosition ? player2money + forSB - player1bet : player2money + forBB - player1bet,
			// 	});
			// } else {
			// 	this.setState({
			// 		player1money: player1money + choppedPot + player1bet,
			// 		player2money: player2money + choppedPot + player2bet,
			// 	});
			// }
			this.setState({ actionInfo: 'Chop', });
		}
		this.setState({
			player1bet: 0,
			player2bet: 0,
			pot: 0,
		});
	}

	evaluateHand = (hand) => {

		let result = []
		let score = []
		let tripsValue = 0
		let allButTrips = 0

		// Check for straight flush

		const filteredForSuits = []
		const suits = ['hearts', 'spades', 'diamonds', 'clubs']

		// Make 4 arrays for every suit and push them into filteredForSuits
		for (let i = 0; i < suits.length; i++) {
			filteredForSuits.push(hand.filter(card => card.suit === suits[i]))
		}

		let filteredForSuit = []

		// Check if any of those 4 arrays have 5 or more of the same suit
		for (let i = 0; i < filteredForSuits.length; i++) {
			const checkIfFlush = filteredForSuits[i].length >= 5
			if (checkIfFlush) {
				result.push('flush')
				// flush = true
				filteredForSuit = filteredForSuits[i]
			}
		}

		// Check for straight
		const filteredForValues = filteredForSuit.map(card => card.value)
		const filteredForValuesSorted = filteredForValues.sort(function (a, b) { return b - a })
		const straights = [
			[14, 13, 12, 11, 10],
			[13, 12, 11, 10, 9],
			[12, 11, 10, 9, 8],
			[11, 10, 9, 8, 7],
			[10, 9, 8, 7, 6],
			[9, 8, 7, 6, 5],
			[8, 7, 6, 5, 4],
			[7, 6, 5, 4, 3],
			[6, 5, 4, 3, 2],
			[14, 5, 4, 3, 2],
		]

		for (let i = 0; i < straights.length; i++) {
			const checkIfStraight = JSON.stringify(straights[i]) === JSON.stringify(filteredForValuesSorted)
			if (checkIfStraight) {
				result.push('straight')
				// Score for Ace low straight
				if (filteredForValuesSorted[0] === 14 && filteredForValuesSorted[1] === 5) score.push(5)
				else score.push(straights[i][0])
			}
		}

		if (result.includes('flush') && result.includes('straight')) {
			score.unshift(8)
			return score
			// Check for quads
		} else {
			let allButQuads
			const values = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2]

			for (let i = 0; i < values.length; i++) {
				const checkIfQuads = hand.filter(card => card.value === values[i]).length === 4
				if (checkIfQuads) {
					allButQuads = hand.filter(card => card.value !== values[i])
					result.unshift(values[i], 'quads')
				}
			}

			// Determine kicker
			if (result.includes('quads')) {
				const allButQuadsValues = allButQuads.map(card => card.value)
				const kickerQuads = allButQuadsValues.sort(function (a, b) { return b - a })
				score.push(7, result[0], kickerQuads[0])
				return score
				// Check for full house
			} else {
				let checkIfTrips
				for (let i = 0; i < values.length; i++) {
					checkIfTrips = hand.filter(card => card.value === values[i]).length === 3
					if (checkIfTrips) {
						result.push(values[i], 'trips')
						tripsValue = values[i]
						// For determinig kickers for trips later
						allButTrips = hand.filter(card => card.value !== values[i])
					}
				}
				for (let i = 0; i < values.length; i++) {
					const checkIfPair = hand.filter(card => card.value === values[i]).length >= 2
					if (checkIfPair && result[0] !== values[i]) {
						result.push(values[i], 'pair')
					}
				}

				if (result.includes('trips') && result.includes('pair')) {
					score.push(6, result[0], result[2])
					return score
					// Check for flush
				} else {
					if (result.includes('flush')) {
						const flush5best = filteredForValuesSorted.slice(0, 5)
						score.push(5, ...flush5best)
						return score
						// Check for straight
					} else {
						const hand7valuesSorted = hand.map(card => card.value).sort(function (a, b) { return b - a })
						const possibleHandsOf5 = [hand7valuesSorted.slice(0, 5), hand7valuesSorted.slice(1, 6), hand7valuesSorted.slice(2)]

						for (let i = 0; i < straights.length; i++) {
							for (let j = 0; j < possibleHandsOf5.length; j++) {
								const checkIfStraight = JSON.stringify(straights[i]) === JSON.stringify(possibleHandsOf5[j])
								if (checkIfStraight) {
									result.push('straight')
									score.push(4, straights[i][0])
									score.slice(0, 2)
									return score
									// Score for Ace low straight
								} else if (
									hand7valuesSorted.includes(14) &&
									hand7valuesSorted.includes(5) &&
									hand7valuesSorted.includes(4) &&
									hand7valuesSorted.includes(3) &&
									hand7valuesSorted.includes(2)) {
									score = [4, 5]
									return score
								}
							}
						}
						if (result.includes('straight')) {
							return score
						}
						// Check for trips and determine kickers
						else {
							if (result.includes('trips')) {
								const allButTripsValues = allButTrips.map(card => card.value)
								const kickersTrips = allButTripsValues.sort(function (a, b) { return b - a })
								score.push(3, tripsValue, ...kickersTrips.slice(0, 2))
								return score
								// Check for two pairs
							} else {
								for (let i = 0; i < values.length; i++) {
									const checkIfPair = hand.filter(card => card.value === values[i]).length === 2
									if (checkIfPair && score.length < 2) {
										score.push(values[i])
									}
								}
								if (score.length === 2) {
									const firstPair = score[0]
									const secondPair = score[1]
									const removeFirstPair = hand7valuesSorted.filter(card => card !== firstPair)
									const removeSecondPair = removeFirstPair.filter(card => card !== secondPair)
									score.push(removeSecondPair[0])
									score.unshift(2)
									return score
									// Check for only one pair
								} else if (score.length === 1) {
									const firstPair = score[0]
									const removeFirstPair = hand7valuesSorted.filter(card => card !== firstPair)
									score.push(...removeFirstPair.slice(0, 3))
									score.unshift(1)
									return score
									// Check for high card
								} else {
									const kickers = hand7valuesSorted.slice(0, 5)
									score.push(0, ...kickers)
									return score
								}
							}
						}
					}
				}
			}
		}
	}

	compareHands = (hand1, hand2) => {
		const player1score = this.evaluateHand(hand1)
		const player2score = this.evaluateHand(hand2)

		let player1win = false
		let player2win = false
		let result = ''

		if (player1score[0] > player2score[0]) player1win = true
		else if (player1score[0] < player2score[0]) player2win = true
		else {
			if (player1score[1] > player2score[1]) player1win = true
			else if (player1score[1] < player2score[1]) player2win = true
			else if (player1score.length === 2 && player2score.length === 2) result = 'chop'
			else {
				if (player1score[2] > player2score[2]) player1win = true
				else if (player1score[2] < player2score[2]) player2win = true
				else if (player1score.length === 3 && player2score.length === 3) result = 'chop'
				else {
					if (player1score[3] > player2score[3]) player1win = true
					else if (player1score[3] < player2score[3]) player2win = true
					else if (player1score.length === 4 && player2score.length === 4) result = 'chop'
					else {
						if (player1score[4] > player2score[4]) player1win = true
						else if (player1score[4] < player2score[4]) player2win = true
						else if (player1score.length === 5 && player2score.length === 5) result = 'chop'
						else {
							if (player1score[5] > player2score[5]) player1win = true
							else if (player1score[5] < player2score[5]) player2win = true
							else result = 'chop'
						}
					}
				}
			}
		}

		if (player1win) result = 'player1won'
		else if (player2win) result = 'player2won'
		return result
	}

	betAmountChange = (e) => {
		this.setState({
			bet: e.target.value,
		})
	}

	fold = () => {
		const { player1money, player2money, player1bet, player2bet, dealerButtonPosition, pot, disabled, stage, shuffledDeck, disabledShowdown } = this.state

		this.setState({ timerActive: false });
		clearTimeout(startCountdown)

		// Fold
		if (player1bet !== player2bet) {
			this.setState({
				player1bet: 0,
				player2bet: 0,
				dealerButtonPosition: !dealerButtonPosition,
				player1card1: null,
				player1card2: null,
				player2card1: null,
				player2card2: null,
				stage: 'preFlop',
				flop1: null,
				flop2: null,
				flop3: null,
				turn: null,
				river: null,
				pot: 0,
			})

			setTimeout(() => {
				this.dealCards()
			}, timeBeforePlayer2acts);

			this.blindsGoUp()

			// Player 1 fold
			if (player1bet < player2bet) {
				this.setState({
					player2money: pot + player2money + player1bet + player2bet,
					disabled: !disabled,
				});

				console.log('Player 1 fold')

				//  Player 2 fold
			} else {
				this.setState({
					player1money: pot + player1money + player1bet + player2bet,
					actionInfo: 'Opponent Folds',
					// Fix the timer at p2fold
					p2timerFix: true,
				});
				setTimeout(() => {
					this.setState({ actionInfo: '' });
				}, 3000);

				console.log('Player 2 fold')
			}

			this.animateCallChips('fold')

			// Check
		} else {
			// Check behind
			if ((dealerButtonPosition && !disabled) || (!dealerButtonPosition && disabled)) {
				if (stage === 'preFlop') {
					this.setState({
						flop1: shuffledDeck[4],
						flop2: shuffledDeck[5],
						flop3: shuffledDeck[6],
						stage: 'flop',
					})
				} else if (stage === 'flop') {
					this.setState({
						turn: shuffledDeck[7],
						stage: 'turn',
					})
				} else if (this.state.stage === 'turn') {
					this.setState({
						river: shuffledDeck[8],
						stage: 'river',
					})
				}
				this.setState({
					disabled: !disabled,
				});

				// Showdown
				if (stage === 'river') {
					this.setState({
						disabledShowdown: !disabledShowdown,
						disabled: true,
						showPlayer2cards: true,
						blockP2afterShowdown: true,
					});

					setTimeout(() => {
						this.showCards()
					}, 0);
				}

				console.log('Check behind')
				this.animateCallChips()

				if (dealerButtonPosition && !disabled && stage !== 'river') {
					setTimeout(() => {
						this.player2turn()
					}, timeBeforePlayer2acts);
				}

				// Check after limp and go to next street
			} else if (stage === 'preFlop' && ((dealerButtonPosition && disabled) || (!dealerButtonPosition && !disabled))) {
				this.setState({
					flop1: shuffledDeck[4],
					flop2: shuffledDeck[5],
					flop3: shuffledDeck[6],
					stage: 'flop',
					pot: pot + player1bet + player2bet,
					player1bet: 0,
					player2bet: 0,
				})
				if (!dealerButtonPosition && !disabled) {
					console.log('Check p1 after limp and go to next street')

					setTimeout(() => {
						this.player2turn()
					}, timeBeforePlayer2acts);

				} else {
					console.log('Check p2 after limp and go to next street')
				}
				this.animateCallChips()

				setTimeout(() => {
					this.player2turn()
				}, timeBeforePlayer2acts);

				// Check and don't go to next street
			} else {
				this.setState({
					disabled: !disabled,
				});
				console.log('Check')

				if (!disabled) {
					setTimeout(() => {
						this.player2turn()
					}, timeBeforePlayer2acts);
				}
			}
		}
	}

	call = () => {
		const { player1money, player2money, player1bet, player2bet, dealerButtonPosition, pot, disabled, stage, shuffledDeck, smallBlindAmount, bigBlindAmount, disabledShowdown } = this.state

		this.setState({ timerActive: false });
		clearTimeout(startCountdown)

		// AllIn call
		if (player1bet === player2money + player2bet || player2bet === player1money + player1bet || player1money === 0 || player2money === 0) {
			if (stage === 'preFlop') {
				this.setState({
					flop1: shuffledDeck[4],
					flop2: shuffledDeck[5],
					flop3: shuffledDeck[6],
					turn: shuffledDeck[7],
					river: shuffledDeck[8],
				});
			} else if (stage === 'flop') {
				this.setState({
					turn: shuffledDeck[7],
					river: shuffledDeck[8],
				});
			} else if (stage === 'turn') {
				this.setState({
					river: shuffledDeck[8],
				});
			}
			this.setState({
				disabledShowdown: !disabledShowdown,
				showPlayer2cards: true,
				blockP2afterShowdown: true,
			});
			setTimeout(() => {
				this.showCards()
			}, 0);

			console.log('allin call')
			this.animateCallChips()

			// p2 call when p1 is allin
			if (player1money === 0) {
				// p1 is covered
				if (player1bet <= player2money + player2bet) {
					this.setState({
						player2money: player2money - player1bet + player2bet,
						player2bet: player1bet,
					});
				}
				// p2 is covered
				else {
					this.setState({
						player2money: 0,
						player2bet: player2money + player2bet,
					});
				}
			}
			// p1 call when p2 is allin
			else if (player2money === 0) {
				// p2 is covered
				if (player2bet <= player1money + player1bet) {
					this.setState({
						player1money: player1money - player2bet + player1bet,
						player1bet: player2bet,
					});
				}
				// p1 is covered
				else {
					this.setState({
						player1money: 0,
						player1bet: player1money + player1bet,
					});
				}
			}
			this.setState({
				disabled: true,
			});
		}

		// Limp
		else if (player1bet === smallBlindAmount) {
			this.setState({
				player1money: player1money - smallBlindAmount,
				player1bet: player2bet,
				disabled: !disabled,
			});

			setTimeout(() => {
				this.player2turn()
			}, timeBeforePlayer2acts);

			console.log('limp p1')
		}
		else if (player2bet === smallBlindAmount) {
			this.setState({
				player2money: player2money - smallBlindAmount,
				player2bet: player1bet,
				disabled: !disabled,
			});
			console.log('limp p2')
		}

		// Call and go to next street
		else {
			// Call by player 1 ip
			if ((player1bet < player2bet) && dealerButtonPosition) {
				this.setState({
					player1money: player1money - player2bet + player1bet,
					player1bet: player2bet,
					disabled: !disabled,
				});
				console.log('Call by player 1 ip')
				this.animateCallChips()

				if (stage !== 'river') {
					setTimeout(() => {
						this.player2turn()
					}, timeBeforePlayer2acts);
				}
			}
			// Call by player 1 oop
			else if ((player1bet < player2bet) && !dealerButtonPosition) {
				this.setState({
					player1money: player1money - player2bet + player1bet,
					player1bet: player2bet,
					// Set slider
					bet: bigBlindAmount,
				});
				console.log('Call by player 1 oop')
				this.animateCallChips()

				// Counter starts every time besides showdown
				if (stage !== 'river') {
					setTimeout(() => {
						this.startCountdown()
					}, 0);
				}
			}
			// Call by player 2 ip
			else if ((player1bet > player2bet) && !dealerButtonPosition) {
				this.setState({
					player2money: player2money - player1bet + player2bet,
					player2bet: player1bet,
					disabled: !disabled,
				});
				console.log('Call by player 2 ip')
				this.animateCallChips()
			}
			// Call by player 2 oop
			else if ((player1bet > player2bet) && dealerButtonPosition) {
				this.setState({
					player2money: player2money - player1bet + player2bet,
					player2bet: player1bet,
				});
				console.log('Call by player 2 oop')
				this.animateCallChips()

				setTimeout(() => {
					this.player2turn()
				}, timeBeforePlayer2acts);
			}

			// Player2 is allIn (don't call more than stack)
			if (player2money === 0) {
				this.setState({
					player1bet: player1money + player1bet,
					player1money: 0
				});
			}
			// Player1 is allIn (don't call more than stack)
			else if (player1money === 0) {
				this.setState({
					player1bet: player2money + player2bet,
					player2money: 0
				});
			}

			// Go to flop
			if ((stage === 'preFlop') && (player1bet !== smallBlindAmount) && (player2bet !== smallBlindAmount)) {
				this.setState({
					flop1: shuffledDeck[4],
					flop2: shuffledDeck[5],
					flop3: shuffledDeck[6],
					stage: 'flop',
				});
			}
			// Go to turn
			else if (stage === 'flop') {
				this.setState({
					turn: shuffledDeck[7],
					stage: 'turn',
				});
			}
			//  Go to river
			else if (stage === 'turn') {
				this.setState({
					river: shuffledDeck[8],
					stage: 'river',
				});
			}
			// Showdown
			else if (stage === 'river') {
				this.setState({
					disabledShowdown: !disabledShowdown,
					disabled: true,
					showPlayer2cards: true,
				});
				setTimeout(() => {
					this.showCards()
				}, 0);
			}

			// Not allin call
			if (player1money !== 0 && player2money !== 0) {
				const addToPot = player1bet > player2bet ? player1bet * 2 : player2bet * 2
				this.setState({
					pot: pot + addToPot,
					player1bet: 0,
					player2bet: 0,
				});
				console.log('not allin call')
			}
		}
	}

	bet = () => {
		const { player1money, player1bet, disabled, bet, bigBlindAmount } = this.state

		this.setState({ timerActive: false });
		clearTimeout(startCountdown)

		if (bet < bigBlindAmount) {
			alert(`The minimum bet is ${bigBlindAmount}`)
		}
		// No more than stack
		else if (bet > player1money + player1bet) {
			alert(`The maximum bet is to ${player1money + player1bet}`)
		}
		else {
			this.setState({
				player1money: player1money - bet,
				player1bet: player1bet + Number(bet),
				disabled: !disabled,
			})
			this.animateBetRaiseChips('p1')

			setTimeout(() => {
				this.player2turn()
			}, timeBeforePlayer2acts);
		}
	}

	betPlayer2 = () => {
		const { player2money, player1bet, player2bet, pot, disabled, stage, bigBlindAmount } = this.state

		// Raise after limp
		if (stage === 'preFlop' && player1bet === bigBlindAmount) {
			const caseAllInForPlayer2moneyAfterLimp = Math.floor((pot + player1bet + player2bet) * 2 / 3) <= player2money / 2 ? player2money - bigBlindAmount * 2.5 : 0

			const caseAllInForPlayer2betAfterLimp = Math.floor((pot + player1bet + player2bet) * 2 / 3) <= player2money / 2 ? bigBlindAmount * 3.5 : player2money + player2bet

			this.setState({
				player2money: caseAllInForPlayer2moneyAfterLimp,
				player2bet: caseAllInForPlayer2betAfterLimp,
				disabled: !disabled,
			})
			// Standard bet
		} else {
			const caseAllInForPlayer2money = Math.floor((pot + player1bet + player2bet) * 2 / 3) <= player2money / 2 ? player2money - Math.floor((pot + player1bet + player2bet) * 2 / 3) : 0

			const caseAllInForPlayer2bet = Math.floor((pot + player1bet + player2bet) * 2 / 3) <= player2money / 2 ? Math.floor((pot + player1bet + player2bet) * 2 / 3) : player2money + player2bet

			this.setState({
				player2money: caseAllInForPlayer2money,
				player2bet: caseAllInForPlayer2bet,
				disabled: !disabled,
			})
		}
		console.log('betPlayer2')
		this.animateBetRaiseChips('p2')
	}

	raise = () => {
		const { player1money, player1bet, player2bet, disabled, smallBlindAmount, bet, bigBlindAmount } = this.state

		this.setState({ timerActive: false });
		clearTimeout(startCountdown)

		// Less than required but has to go allIn
		if (bet === player1money + player1bet) {
			this.setState({
				player1money: 0,
				player1bet: Number(bet),
				disabled: !disabled,
			})
			this.animateBetRaiseChips('p1')

			setTimeout(() => {
				this.player2turn()
			}, timeBeforePlayer2acts);
		}

		// No more than own stack
		else if (bet > player1money + player1bet) {
			alert(`The maximum raise is to ${player1money + player1bet}`)
		}

		// Alert preflop: raise not big enough
		else if ((player1bet + player2bet === smallBlindAmount + bigBlindAmount) && bet < bigBlindAmount * 2) {
			alert(`The minimum raise is to ${bigBlindAmount * 2}`)
		}

		// Alert postflop: raise not big enough
		else if (bet < (player2bet * 2 - player1bet)) {
			alert(`The minimum raise is to ${player2bet * 2 - player1bet}`)
		}

		// Raise
		else {
			this.setState({
				player1money: player1money - bet + player1bet,
				player1bet: Number(bet),
				disabled: !disabled,
			})
			this.animateBetRaiseChips('p1')

			setTimeout(() => {
				this.player2turn()
			}, timeBeforePlayer2acts);
		}
	}

	raisePlayer2 = () => {
		const { player2money, player1bet, player2bet, disabled, player1money } = this.state

		const caseAllInForPlayer2money = (player1bet * 3 > player2money / 2) || (player1bet * 3 > player1money / 2) ? 0 : player2money - player1bet * 3 + player2bet
		const caseAllInForPlayer2bet = (player1bet * 3 > player2money / 2) || (player1bet * 3 > player1money / 2) ? player2money + player2bet : player1bet * 3

		this.setState({
			player2money: caseAllInForPlayer2money,
			player2bet: caseAllInForPlayer2bet,
			disabled: !disabled,
		});
		console.log('raise p2')
		this.animateBetRaiseChips('p2')
	}

	allIn = () => {
		const { player1money, player1bet } = this.state

		this.setState({
			bet: player1money + player1bet,
		});
	}

	betIncreaseDecrease = (type) => {
		const { bet, bigBlindAmount, player1money, player1bet } = this.state

		if (type === '+') {
			// Prevent from going above max
			if (bet >= player1money + player1bet) return
			// Standard
			else this.setState({ bet: Number(bet) + bigBlindAmount });
		}
		else if (type === '-') {
			// Prevent from going below 0
			if (bet <= bigBlindAmount) return
			// Standard
			else this.setState({ bet: Number(bet) - bigBlindAmount });
		}
	}

	betRaiseAllIn = () => {
		const { player2money, player1bet, player2bet, disabled, bet, player1money } = this.state

		if (Number(bet) === player2money + player2bet) {
			return <p>All-In!</p>
		} else if (player1bet === 0 && player2bet === 0) {
			return <p>Bet {disabled ? null : bet}</p>
			// Don't show amount when facing allin
		} else return <p>Raise {disabled || !player2money || (player2bet > player1money + player1bet) ? null : `to ${bet}`}</p>
	}

	renderCard = (card) => {
		if (card) {
			if (card.suit === "hearts" || card.suit === "diamonds") return "card red"
			else return "card"
		}
	}

	animateBetRaiseChips = (whichPlayer) => {
		if (whichPlayer === 'p1') {
			const bet = document.querySelector('.money__player1chips');
			bet.classList.add('money__player1chips--player1chipsInTheMiddle');
		} else if (whichPlayer === 'p2') {
			const bet = document.querySelector('.money__player2chips');
			bet.classList.add('money__player2chips--player2chipsInTheMiddle');
		}
	}

	animateCallChips = (action) => {
		const bet1 = document.querySelector('.money__player1chips');
		const bet2 = document.querySelector('.money__player2chips');
		bet1.classList.remove('money__player1chips--player1chipsInTheMiddle');
		bet2.classList.remove('money__player2chips--player2chipsInTheMiddle');

		const pot = document.querySelector('.money__potChips');
		if (action === 'fold') {
			pot.classList.remove('money__potChips--potChipsOnTheTable');
		} else pot.classList.add('money__potChips--potChipsOnTheTable');
	}

	determineSuit = (card) => {
		if (card === 'hearts') return hearts
		else if (card === 'spades') return spades
		else if (card === 'diamonds') return diamonds
		else if (card === 'clubs') return clubs
	}

	render() {
		const { player1money, player2money, player1bet, player2bet, dealerButtonPosition, pot, disabled, disabledShowdown, smallBlindAmount, bet, bigBlindAmount, disabledDeal, player1card1, player1card2, player2card1, player2card2, flop1, flop2, flop3, turn, river, showPlayer2cards, actionInfo, timerActive } = this.state

		return (
			<div className="wrapAndRotateInfo" >
				<div className='wrap'>
					<ActionInfo
						actionInfo={actionInfo}
					/>
					<OperatingButtons
						disabledShowdown={disabledShowdown}

						dealCards={this.dealCards}
						player2turn={this.player2turn}
						showCards={this.showCards}
						disabledDeal={disabledDeal}
						newHand={this.newHand}
					/>
					{timerActive && <Timer />}
					<div className="table">
						<PlayersHUDs
							player1money={player1money}
							player1card1={player1card1}
							player1card2={player1card2}
							player2money={player2money}
							player2card1={player2card1}
							player2card2={player2card2}
							showPlayer2cards={showPlayer2cards}

							renderCard={this.renderCard}
							determineSuit={this.determineSuit}
						/>
						<MoneyInTheMiddle
							player1bet={player1bet}
							player2bet={player2bet}
							pot={pot}
						/>
						<Board
							flop1={flop1}
							flop2={flop2}
							flop3={flop3}
							turn={turn}
							river={river}

							renderCard={this.renderCard}
							determineSuit={this.determineSuit}
						/>
						<DealerButton
							dealerButtonPosition={dealerButtonPosition}
						/>
					</div>
					<GameButtons
						disabled={disabled}
						player1bet={player1bet}
						player2bet={player2bet}
						player2money={player2money}

						fold={this.fold}
						call={this.call}
						bet={this.bet}
						raise={this.raise}

						betRaiseAllIn={this.betRaiseAllIn()}
					/>
					<BettingOptions
						bet={bet}
						player1bet={player1bet}
						player2bet={player2bet}
						bigBlindAmount={bigBlindAmount}
						smallBlindAmount={smallBlindAmount}
						disabled={disabled}
						player1money={player1money}

						betAmountChange={this.betAmountChange}
						allIn={this.allIn}
						betIncreaseDecrease={this.betIncreaseDecrease}
					/>
				</div>
				{/* When orientation: portrait */}
				<h1 className="rotateInfo" > Please rotate <br />the device</h1>
			</div >
		);
	}
}

export default App;
