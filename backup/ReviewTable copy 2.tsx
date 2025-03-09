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
  const indexOfFirstWord = indexOfLastWord - wordsPerPage;
  const currentWords = words.slice(indexOfFirstWord, indexOfLastWord);

  const paginatePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginateNext = () => {
    if (currentPage < Math.ceil(words.length / wordsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        {currentWords.map((word, index) => (
          <React.Fragment key={index}>
            <div className="relative w-[450px]">
              <input
                type="text"
                className={`w-full h-[50px] p-2 border border-gray-300 rounded-md resize-none ${colors[indexOfFirstWord + index]}`}
                value={showEnglish[indexOfFirstWord + index] ? word.english : inputs[indexOfFirstWord + index]}
                // Nếu showEnglish của từ đó là true, thì hiển thị từ tiếng Anh (word.english).
                // Nếu false, thì hiển thị giá trị mà người dùng đã nhập (inputs[indexOfFirstWord + index]).
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
