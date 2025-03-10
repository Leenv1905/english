import { useState } from 'react';
import LayoutHome from '../components/home/LayoutHome';
import ReviewTable from '../components/review/ReviewTable';
import noteImage from '../../public/note.png';
import penImage from '../../public/pen.png';
import Image from 'next/image';

const Review: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Giả định danh sách các từ mới đã học
  const words = [
    { english: 'Hello', translation: 'Xin chào tôi là văn thanh, tôi năm nay 33 tuổi Xin chào tôi là văn thanh, tôi năm nay 33 tuổi Xin chào tôi là văn thanh, tôi năm nay 33 tuổi', date: '2025-03-01' },
    { english: 'Goodbye', translation: 'Tạm biệt', date: '2025-03-02' },
    { english: 'Thank you', translation: 'Cảm ơn', date: '2025-03-03' },
    { english: 'Yes', translation: 'Vâng', date: '2025-03-04' },
    { english: 'No', translation: 'Không', date: '2025-03-05' },
    { english: 'Please', translation: 'Làm ơn', date: '2025-03-06' },
    { english: 'Sorry', translation: 'Xin lỗi', date: '2025-03-07' },
    { english: 'Excuse me', translation: 'Xin lỗi', date: '2025-03-08' },
    { english: 'Help', translation: 'Giúp đỡ', date: '2025-03-09' },
    { english: 'Stop', translation: 'Dừng lại', date: '2025-03-10' },
    { english: 'Hello', translation: 'Xin chào', date: '2025-03-01' },
    { english: 'Goodbye', translation: 'Tạm biệt', date: '2025-03-02' },
    { english: 'Thank you', translation: 'Cảm ơn', date: '2025-03-03' },
    { english: 'Yes', translation: 'Vâng', date: '2025-03-04' },
    { english: 'No', translation: 'Không', date: '2025-03-05' },
    { english: 'Please', translation: 'Làm ơn', date: '2025-03-06' },
    { english: 'Sorry', translation: 'Xin lỗi', date: '2025-03-07' },
    { english: 'Excuse me', translation: 'Xin lỗi', date: '2025-03-08' },
    { english: 'Help', translation: 'Giúp đỡ', date: '2025-03-09' },
    { english: 'Stop', translation: 'Dừng lại', date: '2025-03-10' },
    { english: 'Hello', translation: 'Xin chào', date: '2025-03-01' },
    { english: 'Goodbye', translation: 'Tạm biệt', date: '2025-03-02' },
    { english: 'Thank you', translation: 'Cảm ơn', date: '2025-03-03' },
    { english: 'Yes', translation: 'Vâng', date: '2025-03-04' },
    { english: 'No', translation: 'Không', date: '2025-03-05' },
    { english: 'Please', translation: 'Làm ơn', date: '2025-03-06' },
    { english: 'Sorry', translation: 'Xin lỗi', date: '2025-03-07' },
    { english: 'Excuse me', translation: 'Xin lỗi', date: '2025-03-08' },
    { english: 'Help', translation: 'Giúp đỡ', date: '2025-03-09' },
    { english: 'Stop', translation: 'Dừng lại', date: '2025-03-10' },
  ];

  const filteredWords = words.filter((word) => {
    const wordDate = new Date(word.date);
    const start = startDate ? new Date(startDate) : new Date('1970-01-01');
    const end = endDate ? new Date(endDate) : new Date();
    return wordDate >= start && wordDate <= end;
  });

  return (
    <LayoutHome>
      <div className="relative h-screen overflow-hidden">
      <div className="absolute bottom-2 left-2">
          <Image src={penImage} alt="Pen" width={100} height={100} />
          {/* <Image src={laptopImage} alt="Laptop" width={500} height={500} /> */}

        </div>
        <div className="absolute top-1 md:top-5 right-1 md:right-5">
          {/* Kích thước khi ở màn hình to và nhỏ */}
          <Image src={noteImage} alt="Note" width={100} height={100} />
        </div>
        <div className="flex flex-col items-center justify-center h-full relative z-10 px-4 md:px-0">
  <div className="flex flex-col md:flex-row items-center mb-4 space-y-4 md:space-y-0">
    <h1 className="text-2xl md:text-5xl font-bold text-center md:text-left">
      {/* Cỡ chữ khi ở màn hình to và nhỏ */}
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
  </div>
  <ReviewTable words={filteredWords} />
</div>

      </div>
    </LayoutHome>
  );
};

export default Review;