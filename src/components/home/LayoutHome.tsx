// components/LayoutHome.tsx

import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import "../../app/globals.css";


interface LayoutHomeProps {
  children: React.ReactNode;
}

const LayoutHome: React.FC<LayoutHomeProps> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Website Học Tiếng Anh</title>
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutHome;
