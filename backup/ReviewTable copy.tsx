import React, { useState } from 'react';

interface ReviewTableProps {
  words: { english: string; translation: string; date: string }[];
}

const ReviewTable: React.FC<ReviewTableProps> = ({ words }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const wordsPerPage = 5;
  const [inputs, setInputs] = useState<string[]>(Array(words.length).fill(''));
  const [colors, setColors] = useState<string[]>(Array(words.length).fill(''));

  // Tính toán các từ cần hiển thị trên trang hiện tại
  const indexOfLastWord = currentPage * wordsPerPage;
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
    if (value.toLowerCase() === words[index].english.toLowerCase()) {
      newColors[index] = 'bg-green-200';
    } else {
      newColors[index] = 'bg-red-200';
    }
    setColors(newColors);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        {currentWords.map((word, index) => (
          <React.Fragment key={index}>
            <input
              type="text"
              className={`w-[450px] h-[50px] p-2 border border-gray-300 rounded-md resize-none ${colors[indexOfFirstWord + index]}`}
              value={inputs[indexOfFirstWord + index]}
              onChange={(e) => handleChange(indexOfFirstWord + index, e.target.value)}
              placeholder="Enter the word"
            />
            <textarea
              className="w-[450px] h-[50px] p-2 border border-gray-300 rounded-md resize-none"
              value={word.translation}
              readOnly
            />
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
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