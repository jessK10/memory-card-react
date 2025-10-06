import { useEffect, useState } from "react"
import CardComp from "./components/CardComp"
import cards from "./data/cards.json"
import type { TCard, TCardList } from "./types/card.types"
import ModalComp from "./components/ModalComp"

const App = () => {
	// Create pairs of cards
	const createGameCards = (): TCardList => {
		const pairs = cards.flatMap((card) => [
			{ ...card, id: card.id },
			{ ...card, id: card.id + 100 },
		])
		return pairs
	}

	// Shuffle cards
	const shuffleCards = (cards: TCardList): TCardList => {
		return cards.sort(() => Math.random() - 0.5)
	}

	// Game cards state
	const [gameCards, setGameCards] = useState<TCardList>(
		createGameCards() // shuffled cards
	)
	// flipped cards with an array of cards names
	const [flippedCards, setFlippedCards] = useState<TCard["name"][]>([])

	// number of moves
	const [moves, setMoves] = useState(0)

	// number of matches
	const [matches, setMatches] = useState(0)

	// game state
	const [gameOver, setGameOver] = useState(true)

	const handleCardClick = (clickedCard: TCard) => {
		// Check if the card is already matched
		if (clickedCard.matched) return
		// Check if we have have 2 cards flipped already
		if (flippedCards.length === 2) return

		// Flip the card
		setGameCards((prev) =>
			prev.map((card) =>
				card.id === clickedCard.id ? { ...card, flipped: !card.flipped } : card
			)
		)
		setFlippedCards((prev) => [...prev, clickedCard["name"]])
	}

	useEffect(() => {
		if (flippedCards.length === 2) {
			setMoves((prev) => prev + 1)
			// Check if the flipped cards match
			const [firstCard, secondCard] = flippedCards
			if (firstCard === secondCard) {
				// Increment the number of matches
				setMatches((prev) => prev + 1)
				setFlippedCards([]) // empty the flipped cards array
				// set the matched cards to true
				setGameCards((prev) =>
					prev.map((card) =>
						card.name === firstCard ? { ...card, matched: true } : card
					)
				)
			} else {
				// Flip the cards back
				setTimeout(() => {
					setGameCards((prev) =>
						prev.map((card) =>
							// find the cards to flip back to avoid flipping all of them
							flippedCards.some((fc) => fc === card.name)
								? { ...card, flipped: false }
								: card
						)
					)
					setFlippedCards([]) // empty the flipped cards array
				}, 1000)
			}
		}
		// end of the game
		if (matches === gameCards.length / 2) {
			setGameOver(true)
		}
	}, [flippedCards])

	return (
		<div className="main_section">
			<h1>Memory Game</h1>
			<p>Number of moves: {moves}</p>
			<div className="card_container">
				{gameCards.map((card: TCard) => {
					return (
						<CardComp card={card} clickProp={handleCardClick} key={card.id} />
					)
				})}
			</div>
			<ModalComp showModal={gameOver} toggleModal={setGameOver} />
		</div>
	)
}

export default App
