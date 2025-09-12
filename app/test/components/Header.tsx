"use client";

import { headerData } from '../data/headerData';

interface HeaderProps {
  completionPercentage: string;
}

const Header = ({ completionPercentage }: HeaderProps) => (
  <div className="border-b border-1 bg-white px-4 py-4 flex-shrink-0" data-theme="light">
    <h1 className="text-xl font-bold text-gray-900">{headerData.title}</h1>
    <p className="text-sm text-gray-600 mt-1">{completionPercentage}</p>
  </div>
);

export default Header;
