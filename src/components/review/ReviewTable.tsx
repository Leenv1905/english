import React, { useState } from 'react';

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
  
return (
    <div className="container mx-auto p-4 mt-0 md:mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentWords.map((word, index) => (
          <React.Fragment key={index}>
            <div className="relative w-full">
              <input
                type="text"
                className={`w-full h-[50px] p-2 border border-gray-300 rounded-md resize-none ${colors[indexOfFirstWord + index]}`}
                value={showEnglish[indexOfFirstWord + index] ? word.english : inputs[indexOfFirstWord + index]}
              // Nếu showEnglish của từ đó là true, thì hiển thị từ tiếng Anh (word.english).
                // Nếu false, thì hiển thị giá trị mà người dùng đã nhập (inputs[indexOfFirstWord + index])
                onChange={(e) => handleChange(indexOfFirstWord + index, e.target.value)}
                placeholder="Enter the word"
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
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
                🔍
              </button>
            </div>
            <textarea
              className="w-full h-[50px] p-2 border border-gray-300 rounded-md resize-none"
              value={word.translation}
              readOnly
            />
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-center mt-10 space-x-2">
        <button
          onClick={paginatePrev}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          disabled={currentPage === 1}
        >
          Trước
        </button>
        <div className="flex space-x-2">
          {visiblePageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`py-2 px-4 rounded-md ${
                currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {number}
            </button>
          ))}
        </div>
        <button
          onClick={paginateNext}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          disabled={currentPage === Math.ceil(words.length / wordsPerPage)}
        >
          Tiếp
        </button>
      </div>
    </div>
  );
};

export default ReviewTable;
