import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  font-size: 1.25em;
  margin-bottom: 10px;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &.cancel {
    background: #ccc;
  }
  &.confirm {
    background: #d9534f;
    color: white;
  }
`;

const ConfirmModal = ({ title, children, onClose, onConfirm }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button className="cancel" onClick={onClose}>
            Cancel
          </Button>
          <Button className="confirm" onClick={onConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmModal;
