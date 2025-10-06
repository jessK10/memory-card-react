// src/components/CardComp.tsx
import styles from "./CardComp.module.css";
import type { TCard, TCardProps } from "../types/card.types";

export default function CardComp({ clickProp, card }: TCardProps) {
  const handleClick = () => clickProp(card);
  const flipped = card.flipped || card.matched;

  return (
    <article
      onClick={handleClick}
      className={`${styles.card} ${flipped ? styles.animate__rotate : ""}`}
    >
      {(flipped) && (
        <img src={`/imgs/${card.image}`} alt={card.name} />
      )}
    </article>
  );
}
