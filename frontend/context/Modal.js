import { createContext, useContext, useState } from "react";
const ModalContext = createContext({});

export const ModalProvider = ({ children }) => {
  const [modal, showModal] = useState(null);

  return (
    <ModalContext.Provider value={{ modal, showModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
