import React from 'react';
import { AdviceSection } from '../types';

interface AdviceCardProps {
  section: AdviceSection;
  // Fix: Changed JSX.Element to React.ReactElement to resolve namespace issue.
  icon: React.ReactElement;
}

const AdviceCard: React.FC<AdviceCardProps> = ({ section, icon }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-6 transform hover:-translate-y-1 transition-transform duration-300">
      <div className="flex items-center mb-4">
        <div className="bg-slate-700 p-2 rounded-full mr-4 text-cyan-400">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-slate-100">{section.title}</h3>
      </div>
      <p className="text-slate-400 mb-4">{section.summary}</p>
      <ul className="space-y-2">
        {section.bullet_points.map((point, index) => (
          <li key={index} className="flex items-start">
            <svg className="w-4 h-4 mr-2 mt-1 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-slate-300">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdviceCard;
