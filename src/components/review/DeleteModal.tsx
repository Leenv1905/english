import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
Modal.setAppElement("#__next"); // Đảm bảo modal hoạt động đúng với Next.js


interface DeleteModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleDelete: () => void;
}

const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000; /* Đảm bảo modal có thứ tự hiển thị ưu tiên nhất */
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 33, 9, 0.75);
  z-index: 999; /* Đảm bảo overlay có thứ tự hiển thị ưu tiên ngay sau modal */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 3px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
`;

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onRequestClose,
  handleDelete,
}) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Word"
      overlayClassName="ReactModal__Overlay"
// phải có òng này thì overlay mới đen lại khi mở modal
      shouldCloseOnOverlayClick={true} // Đóng modal khi bấm chuột ra ngoài
      overlayElement={(props, contentElement) => (
        <Overlay {...props}>{contentElement}</Overlay>
      )}
    >
      <CloseButton className='text-gray-500' onClick={onRequestClose}>&times;</CloseButton>
      <h2 className="text-3xl text-gray-500 mb-4">Delete Word</h2>
      <p className="text-2xl text-gray-500">Bạn có chắc chắn muốn xóa từ này không?</p>
      <div className="flex justify-end space-x-4 mt-4">
        <button
          onClick={onRequestClose}
          className="bg-gray-500 text-white py-2 px-4 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded-md"
        >
          Delete
        </button>
      </div>
    </StyledModal>
  );
};

export default DeleteModal;