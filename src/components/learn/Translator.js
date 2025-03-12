// components/Translator.js
// PHẢI SỬA PHẦN CUỐI, IMPORT DẠNG TỆN Ở TỆP TSCONFIG.JSON
import { useState, useEffect } from 'react';

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    // Giả lập quá trình dịch tự động
    const translateText = () => {
      setTranslatedText(inputText.split('').reverse().join(''));
    };
    translateText();
  }, [inputText]);

  const handleSave = () => {
    // Logic để lưu bản dịch vào database sau khi kết nối backend
    console.log('Saving translation:', translatedText);

    // Reset dữ liệu trên các textarea về trạng thái ban đầu
    setInputText('');
    setTranslatedText('');
  };

  return (
    <div className="container mx-auto p-2 mt-5 mb-2 mr-10">
      <div className="flex flex-col md:flex-row items-center">
        <textarea
          className="w-[450px] h-[150px] p-2 border border-gray-300 rounded-md resize-none"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Nhập văn bản cần dịch..."
        />

        <div className="md:w-[100px]"></div> {/* Khoảng cách giữa hai textarea */}

        <textarea
          className="w-[450px] h-[150px] p-2 border border-gray-300 rounded-md mt-2 md:mt-0 resize-none"
          value={translatedText}
          onChange={(e) => setTranslatedText(e.target.value)}
          placeholder="Bản dịch sẽ hiện ở đây..."
        />
      </div>
      <div className="flex justify-center mt-5"> {/* Căn giữa nút Save và thêm margin top */}
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-5 cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Translator;