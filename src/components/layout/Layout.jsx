import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';  // <-- Navbar imported here
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />  {/* <-- Navbar appears at the top of EVERY page */}
      <main className="flex-grow">
        <Outlet />  {/* <-- Your page content goes here */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;