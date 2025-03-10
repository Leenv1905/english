// components/Translator.js
// PHẢI SỬA PHẦN CUỐI, IMPORT DẠNG TỆN Ở TỆP TSCONFIG.JSON
import { useState, useEffect } from 'react';

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    const translateText = async () => {
      if (inputText.trim() === '') {
        setTranslatedText('');
        return;
      }

      try {
        const response = await fetch('https://libretranslate.de/translate', {
          // DÙNG API DỊCH
          // KIẾM 1 API
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: inputText,
            source: 'en',
            target: 'vi', // Dịch từ tiếng Anh sang tiếng Việt
            format: 'text',
            api_key: '' // Thêm api_key nếu cần thiết
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTranslatedText(data.translatedText);
      } catch (error) {
        console.error('Error translating text:', error);
      }
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
          readOnly
        />
      </div>
      <div className="flex justify-center mt-5"> {/* Căn giữa nút Save và thêm margin top */}
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-5"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Translator;