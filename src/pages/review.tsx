import { useState, useEffect } from 'react';
import axios from 'axios';
import LayoutHome from '../components/home/LayoutHome';
import ReviewTable from '../components/review/ReviewTable';
import noteImage from '../../public/note.png';
import penImage from '../../public/pen.png';
import Image from 'next/image';
import useAuthRedirect from '../hooks/useAuthRedirect';

interface Word {
  id: number;
  word: string;
  meaning: string;
  date: string;
  maMember: string;
}

const Review: React.FC = () => {
  useAuthRedirect(); // Kiểm tra đăng nhập
  const [words, setWords] = useState<Word[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWords = async () => {
      const maMember = localStorage.getItem('maMember'); // Lấy maMember từ localStorage
      if (!maMember) return setError('User chưa đăng nhập!');
      try {
        // const response = await axios.get('http://localhost:6868/api/newwords?maMember=${maMember}');
        const response = await axios.get(`http://localhost:6868/api/newwords?maMember=${maMember}`);

        // Dùng backtick (``) thay vì ' ' để nội suy biến vào URL
        // Hoặc truyền params trong axios.get() để làm sạch code (NÊN DÙNG)
        // params Tự động encode maMember nếu có ký tự đặc biệt.
        // Dễ đọc, dễ bảo trì hơn template string.
        // const response = await axios.get('http://localhost:6868/api/newwords', {params: { maMember }});

        // const response = await axios.get('http://localhost:6868/api/newwords?maMember=1');
        setWords(response.data);
      } catch (err) {
        setError('Không thể tải dữ liệu!');
      } finally {
        setLoading(false);
      }
    };
    fetchWords();
  }, []);

  const filteredWords = words.filter((word) => {
    const wordDate = new Date(word.date);
    const start = startDate ? new Date(startDate) : new Date('1970-01-01');
    const end = endDate ? new Date(endDate) : new Date();
    return wordDate >= start && wordDate <= end;
  });

  return (
    <LayoutHome>
      <div className="relative h-screen overflow-hidden">
        <div className="absolute bottom-1 left-2">
          <Image src={penImage} alt="Pen" width={100} height={100} />
        </div>
        <div className="absolute top-1 md:top-20 right-1 md:right-5">
          <Image src={noteImage} alt="Note" width={100} height={100} />
        </div>
        <div className="flex flex-col items-center justify-center h-full relative z-10 px-4 md:px-0">
          <h1 className="text-2xl md:text-5xl font-bold text-center md:text-left">
            Review Learned Words
          </h1>
          <div className="flex flex-row md:flex-row items-center md:ml-4 space-y-2 md:space-y-0 md:space-x-2">
            <input
              type="date"
              className="p-2 border border-gray-300 rounded-md"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span className="mx-2">to</span>
            <input
              type="date"
              className="p-2 border border-gray-300 rounded-md"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ReviewTable words={filteredWords} /> // Truyền dữ liệu vào component con
          )}
        </div>
      </div>
    </LayoutHome>
  );
};

export default Review;
