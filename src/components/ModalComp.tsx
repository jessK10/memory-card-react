import styles from "./ModalComp.module.css";

type ModalProps = {
  showModal: boolean;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  moves: number;
  resetGame: () => void;
};

const ModalComp = ({ showModal, toggleModal, moves, resetGame }: ModalProps) => {
  if (!showModal) return null; // ✅ Only render when true

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1 className={styles.title}>🎉 You Won!</h1>
        <p className={styles.message}>Number of moves: {moves}</p>

        <button
          className={styles.restartBtn}
          onClick={() => {
            resetGame();
            toggleModal(false);
          }}
        >
          🔁 Restart Game
        </button>
      </div>
    </div>
  );
};

export default ModalComp;
