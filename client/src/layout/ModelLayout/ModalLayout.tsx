import { useEffect, useState } from "react";
import "./modal.scss";
import { motion } from "framer-motion";

function PopModal({
  children,
  onClose,
  modalToggler,
}: {
  children: JSX.Element;
  onClose: () => void;
  modalToggler: boolean;
}) {
  const [showModalCard, setShowModalCard] = useState(false);

  useEffect(() => {
    if (modalToggler) {
      setShowModalCard(true);
    } else {
      setShowModalCard(false);
    }
  }, [modalToggler]);

  return (
    <div
      onClick={() => {
        setShowModalCard(false);
        setTimeout(() => {
          onClose();
        }, 100);
      }}
      className={`modal_container modal_container_${
        showModalCard ? "show" : "hide"
      }`}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={`modal_card modal_card_${showModalCard ? "show" : "hide"} `}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default PopModal;
