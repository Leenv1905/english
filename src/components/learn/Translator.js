// components/Translator.js
// PHẢI SỬA PHẦN CUỐI, IMPORT DẠNG TỆN Ở TỆP TSCONFIG.JSON
import { useState, useEffect } from 'react';
import axios from 'axios';

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

const handleSave = async () => {
    // Reset thông báo trước đó
    setError(null);
    setSuccess(null);

    // Validation: Kiểm tra cả hai textarea không được để trống
    if (!inputText.trim()) {
      setError('Vui lòng nhập từ vựng!');
      return;
    }
    if (!translatedText.trim()) {
      setError('Vui lòng nhập nghĩa của từ!');
      return;
    }

    // Lấy token từ localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Bạn cần đăng nhập để lưu từ vựng!');
      return;
    }

    // Chuẩn bị dữ liệu gửi lên backend (không gửi date)
    const newWordData = {
      word: inputText,
      meaning: translatedText,
    };

    try {
      const response = await axios.post(
        'http://localhost:6868/api/newwords',
        newWordData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setSuccess('Lưu từ vựng thành công!');
        setInputText(''); // Reset input
        setTranslatedText(''); // Reset output
      }
    } catch (err) {
      setError('Không thể lưu từ vựng. Vui lòng thử lại!');
      console.error('Error saving word:', err);
    }
  };

  return (
    <div className="container mx-auto p-2 mt-5 mb-2 mr-10">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <textarea
          className="w-[450px] h-[150px] p-2 text-gray-500 border border-gray-300 rounded-md resize-none text-3xl"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Nhập từ vựng mới..."
        />

        <div className="md:w-[100px]"></div> {/* Khoảng cách giữa hai textarea */}

        <textarea
          className="w-[450px] h-[150px] p-2 border text-gray-500 border-gray-300 rounded-md mt-2 md:mt-0 resize-none text-3xl"
          value={translatedText}
          onChange={(e) => setTranslatedText(e.target.value)}
          placeholder="Nhập nghĩa của từ vựng ..."
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
      {success && <p className="text-green-500 text-center mt-2">{success}</p>}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
};

export default Translator;