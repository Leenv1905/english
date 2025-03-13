import React, { useState, useEffect, useRef } from 'react';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

interface ReviewTableProps {
  words: { english: string; translation: string; date: string }[];
}

const ReviewTable: React.FC<ReviewTableProps> = ({ words }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const wordsPerPage = 5;
  const [inputs, setInputs] = useState<string[]>(Array(words.length).fill(''));
  const [colors, setColors] = useState<string[]>(Array(words.length).fill(''));
  const [showEnglish, setShowEnglish] = useState<boolean[]>(Array(words.length).fill(false));
  //   Mảng showEnglish lưu trạng thái của từng từ (hiển thị hay không).
  // Mỗi phần tử trong mảng tương ứng với một từ trong danh sách.

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null);
  const [editEnglish, setEditEnglish] = useState('');
  const [editTranslation, setEditTranslation] = useState('');
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);

  const indexOfLastWord = currentPage * wordsPerPage;
  // Tính toán các từ cần hiển thị trên trang hiện tại

  const indexOfFirstWord = indexOfLastWord - wordsPerPage;
  const currentWords = words.slice(indexOfFirstWord, indexOfLastWord);

  // Chuyển đến trang trước
  const paginatePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Chuyển đến trang sau
  const paginateNext = () => {
    if (currentPage < Math.ceil(words.length / wordsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Chuyển đến trang cụ thể
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(words.length / wordsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Tính toán các trang cần hiển thị
  const maxPageNumbersToShow = 3;
  const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
  const endPage = Math.min(pageNumbers.length, startPage + maxPageNumbersToShow - 1);
  const visiblePageNumbers = pageNumbers.slice(startPage - 1, endPage);

  const handleChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    const newColors = [...colors];
    const newShowEnglish = [...showEnglish];
    if (value.toLowerCase() === words[index].english.toLowerCase()) {
      newColors[index] = 'bg-green-200';
      newShowEnglish[index] = true;
    } else {
      newColors[index] = 'bg-red-200';
      newShowEnglish[index] = false;
    }
    setColors(newColors);
    setShowEnglish(newShowEnglish);
  };
  //   Nếu nhập đúng từ, ô nhập đổi màu xanh (bg-green-200) và hiển thị từ tiếng Anh.
  // Nếu nhập sai, ô nhập đổi màu đỏ (bg-red-200) và vẫn hiển thị nội dung nhập vào.

  const openModal = (index: number) => {
    setCurrentWordIndex(index);
    setEditEnglish(words[index].english);
    setEditTranslation(words[index].translation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentWordIndex(null);
  };

  const handleSaveEdit = () => {
    if (currentWordIndex !== null) {
      const newWords = [...words];
      newWords[currentWordIndex] = { ...newWords[currentWordIndex], english: editEnglish, translation: editTranslation };
      // CẬP NHẬT LẠI CÁC GIÁ TRỊ MỚI
      // ĐANG LÀM TEST
    }
    closeModal();
  };

  const toggleMenu = (index: number) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };

  const openDeleteModal = (index: number) => {
    setCurrentWordIndex(index);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentWordIndex(null);
  };

  const handleDelete = () => {
    if (currentWordIndex !== null) {
      const newWords = [...words];
      newWords.splice(currentWordIndex, 1);
      // CẬP NHẬT LẠI CÁC GIÁ TRỊ MỚI
      // ĐANG LÀM TEST
    }
    closeDeleteModal();
  };
  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Xử lý khi click ra ngoài menu
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRefs.current &&
        !menuRefs.current.some(ref => ref && ref.contains(event.target as Node))
      ) {
        setMenuOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="container mx-auto pl-30 pr-30 md:mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentWords.map((word, index) => (
          <React.Fragment key={index}>
            <div className="relative w-full">
              <input
                type="text"
                className={`w-full h-[80px] p-2 border text-gray-500 text-2xl border-gray-300 rounded-md resize-none ${colors[indexOfFirstWord + index]}`}
                value={showEnglish[indexOfFirstWord + index] ? word.english : inputs[indexOfFirstWord + index]}
                onChange={(e) => handleChange(indexOfFirstWord + index, e.target.value)}
                placeholder="Enter the word"
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onMouseDown={() => {
                  const newShowEnglish = [...showEnglish];
                  newShowEnglish[indexOfFirstWord + index] = true;
                  setShowEnglish(newShowEnglish);
                }}
                onMouseUp={() => {
                  const newShowEnglish = [...showEnglish];
                  newShowEnglish[indexOfFirstWord + index] = false;
                  setShowEnglish(newShowEnglish);
                }}
                onMouseLeave={() => {
                  const newShowEnglish = [...showEnglish];
                  newShowEnglish[indexOfFirstWord + index] = false;
                  setShowEnglish(newShowEnglish);
                }}
              >
                ↺
                {/* DÙNG HTML SYMBOLS */}
              </button>
            </div>
            {/* <div className="relative w-full"> */}
            {/* NÚT EDIT Ở TRONG HAY NGOÀI TEXTAREA */}
            <div className="relative w-full flex items-center">
              <textarea
                className="w-full h-[80px] p-2 border text-gray-500 text-2xl border-gray-300 rounded-md resize-none"
                value={word.translation}
                readOnly
              />
              {/* <div className="relative" ref={(el) => (menuRefs.current[index] = el)}> */}
              <div className="relative" ref={(el) => { menuRefs.current[index] = el; }}>
                <button
                  className="ml-2 text-gray-500 cursor-pointer relative z-40"
                  onClick={() => toggleMenu(index)}
                >
                  ☰
                </button>
                {menuOpenIndex === index && (
                  <div className="absolute left-0 mt-0 w-25 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => openModal(index)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => openDeleteModal(index)}
                    >
                      ❌ Del
                    </button>
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-center mt-10 space-x-2">
        <button
          onClick={paginatePrev}
          className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
          disabled={currentPage === 1}
        >
          Trước
        </button>
        <div className="flex space-x-2">
          {visiblePageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`py-2 px-4 rounded-md cursor-pointer ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
            >
              {number}
            </button>
          ))}
        </div>
        <button
          onClick={paginateNext}
          className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
          disabled={currentPage === Math.ceil(words.length / wordsPerPage)}
        >
          Tiếp
        </button>
      </div>
      <EditModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        editEnglish={editEnglish}
        setEditEnglish={setEditEnglish}
        editTranslation={editTranslation}
        setEditTranslation={setEditTranslation}
        handleSaveEdit={handleSaveEdit}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ReviewTable;
