import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for the context
interface ModalContextProps {
  openModal: (key: string) => void;
  closeModal: () => void;
  isOpen: (key: string) => boolean;
}

// Create the context with a default value
const ModalContext = createContext<ModalContextProps | undefined>(undefined);

// Custom hook to use the Modal context
export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

// ModalProvider props
interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null); // Tracks the currently open modal

  const openModal = (key: string) => {
    setActiveModal(key); // Set the active modal
  };

  const closeModal = () => {
    setActiveModal(null); // Close the current modal
  };

  const isOpen = (key: string) => activeModal === key; // Check if a specific modal is open

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
