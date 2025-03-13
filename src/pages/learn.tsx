// pages/aboutUs.tsx
import LayoutHome from '../components/home/LayoutHome';
import Image from 'next/image';
import lampImage from '../../public/lamp.png';
import treeImage from '../../public/tree.png';
import Link from 'next/link';
import Translator from '../components/learn/Translator';
import useAuthRedirect from '../hooks/useAuthRedirect';

const Learn: React.FC = () => {
  useAuthRedirect();
  // Sử dụng hook `useAuthRedirect` để điều hướng đến trang đăng nhập nếu chưa đăng nhập
  return (
    <LayoutHome>
      <div className="relative h-screen overflow-hidden">
        <div className="absolute bottom-30 left-2">
          <Image src={treeImage} alt="Tree" width={100} height={100} />
          {/* <Image src={laptopImage} alt="Laptop" width={500} height={500} /> */}

        </div>
        <div className="absolute top-20 right-5">
          <Image src={lampImage} alt="Lamp" width={100} height={100} />
        </div>
        {/* <div className="flex flex-col items-center justify-center h-full relative z-10"> */}
        <div className="flex flex-col items-center justify-center h-full relative z-10">

          {/* <h1 className="text-8xl font-bold text-center mb-4">My English</h1> */}
          <h1 className="text-8xl font-bold text-center mb-2 text-gray-500">My English</h1>
          <h1 className="text-3xl font-bold mb-4">Translator App</h1>
          <Translator />
            {/* <div className="flex items-center mt-4">
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 mr-2"
              placeholder="Enter text"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Translate
            </button>
            </div> */}
        </div>
      </div>
    </LayoutHome>
  );
};

export default Learn;
