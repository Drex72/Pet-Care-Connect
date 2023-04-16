import { useEffect, useState } from "react";
import "./drawer.scss";
import { motion } from "framer-motion";

function PopDrawer({
  children,
  onClose,
  drawerToggler,
}: {
  children: JSX.Element;
  onClose: () => void;
  drawerToggler: boolean;
}) {
  const [showModalCard, setShowModalCard] = useState(false);

  useEffect(() => {
    if (drawerToggler) {
      setShowModalCard(true);
    } else {
      setShowModalCard(false);
    }
  }, [drawerToggler]);

  return (
    <div
      onClick={() => {
        setShowModalCard(false);
        setTimeout(() => {
          onClose();
        }, 100);
      }}
      className={`drawer_container drawer_container_${
        showModalCard ? "show" : "hide"
      }`}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={`modal_drawer modal_drawer_${
          showModalCard ? "show" : "hide"
        } `}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default PopDrawer;
