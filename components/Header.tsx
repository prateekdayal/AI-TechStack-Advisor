
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        AI Tech Stack Advisor
      </h1>
      <p className="text-slate-400 mt-3 text-lg">
        Get expert analysis on your project idea and tech stack.
      </p>
    </header>
  );
};

export default Header;
