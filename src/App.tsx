import { useState, useEffect } from "react";
import CardComp from "./components/CardComp";
import ModalComp from "./components/ModalComp";
import cards from "./data/cards.json";
import type { TCard, TCardList } from "./types/card.types";

const createGameCards = (): TCardList => {
  const pairs = cards.flatMap((card) => [
    { ...card, id: card.id },
    { ...card, id: card.id + 100 },
  ]);
  return shuffleArray(pairs);
};

const shuffleArray = (array: TCardList): TCardList => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export default function App() {
  const [gameCards, setGameCards] = useState<TCardList>(createGameCards());
  const [flippedCards, setFlippedCards] = useState<TCard["name"][]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleCardClick = (clickedCard: TCard) => {
    if (clickedCard.matched || clickedCard.flipped || flippedCards.length === 2)
      return;

    setGameCards((prev) =>
      prev.map((card) =>
        card.id === clickedCard.id ? { ...card, flipped: !card.flipped } : card
      )
    );
    setFlippedCards((prev) => [...prev, clickedCard.name]);
  };

  // Game logic
  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = flippedCards;

      if (first === second) {
        setMatches((prev) => prev + 1);
        setGameCards((prev) =>
          prev.map((card) =>
            card.name === first ? { ...card, matched: true } : card
          )
        );
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setGameCards((prev) =>
            prev.map((card) =>
              flippedCards.includes(card.name)
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards]);

  // End of game condition
  useEffect(() => {
    if (matches === cards.length) {
      setGameOver(true);
    }
  }, [matches]);

  const resetGame = () => {
    setGameCards(createGameCards());
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameOver(false);
  };

  return (
    <div className="main_section">
      <h1>Memory Game</h1>
      <p>Moves: {moves} | Matches: {matches}</p>
      <button onClick={resetGame}>Restart</button>

      <div className="card_container">
        {gameCards.map((card) => (
          <CardComp key={card.id} card={card} clickProp={handleCardClick} />
        ))}
      </div>

      <ModalComp
        showModal={gameOver}
        toggleModal={setGameOver}
        moves={moves}
        resetGame={resetGame}
      />
    </div>
  );
}
