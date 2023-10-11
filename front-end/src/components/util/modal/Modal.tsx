import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalClasses = isOpen ? "fixed inset-0 flex items-center justify-center z-50" : "hidden";

  return (
    <div className={modalClasses}>
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

        <div className="modal-container bg-white w-12/13 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              {children}
            </div>
            <div className="modal-footer p-2 flex justify-center items-center">
            </div>
        </div>
    </div>
  );
}

export default Modal;
