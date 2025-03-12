import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement("#__next"); // Đảm bảo modal hoạt động đúng với Next.js

interface EditModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  editEnglish: string;
  setEditEnglish: (value: string) => void;
  editTranslation: string;
  setEditTranslation: (value: string) => void;
  handleSaveEdit: () => void;
}

const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000; /* Đảm bảo overlay có thứ tự hiển thị ưu tiên ngay sau modal */
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 999; /* Đảm bảo overlay có thứ tự hiển thị ưu tiên ngay sau modal */
`;
// Tạo màng đen khi mở modal
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onRequestClose,
  editEnglish,
  setEditEnglish,
  editTranslation,
  setEditTranslation,
  handleSaveEdit,
}) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
// phải có cả dùng này thì dòng đóng phía dưới mới có tác dụng
      contentLabel="Edit Word"
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
      shouldCloseOnOverlayClick={true} // Không đóng modal khi bấm ra ngoài
      overlayElement={(props, contentElement) => (
        <Overlay {...props}>{contentElement}</Overlay>
      )}
    >
      <CloseButton onClick={onRequestClose}>&times;</CloseButton>
      <h2 className="text-2xl mb-4">Edit Word</h2>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md"
          value={editEnglish}
          onChange={(e) => setEditEnglish(e.target.value)}
          placeholder="Edit English word"
        />
        <textarea
          className="p-2 border border-gray-300 rounded-md"
          value={editTranslation}
          onChange={(e) => setEditTranslation(e.target.value)}
          placeholder="Edit Translation"
        />
        <button
          onClick={handleSaveEdit}
          className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
        >
          Save
        </button>
      </div>
    </StyledModal>
  );
};

export default EditModal;
