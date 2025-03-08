// pages/aboutUs.tsx

import LayoutHome from '../components/home/LayoutHome';
import Image from 'next/image';
import lampImage from '../../public/lamp.png';
import treeImage from '../../public/tree.png';
import Link from 'next/link';
import Translator from '../components/Translator';

const Learn: React.FC = () => {
  return (
    <LayoutHome>
      <div className="relative h-screen overflow">
        <div className="absolute bottom-20 left-10">
          <Image src={treeImage} alt="Laptop" width={100} height={100} />
          {/* <Image src={laptopImage} alt="Laptop" width={500} height={500} /> */}

        </div>
        <div className="absolute top-10 right-5">
          <Image src={lampImage} alt="Book" width={100} height={100} />
        </div>
        {/* <div className="flex flex-col items-center justify-center h-full relative z-10"> */}
        <div className="flex flex-col items-center justify-center h-full relative z-10 ml-90">

          {/* <h1 className="text-8xl font-bold text-center mb-4">My English</h1> */}
          <h1 className="text-8xl font-bold text-center mb-4 text-gray-500">My English</h1>
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
