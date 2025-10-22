
import React from 'react';
import { AIUseCase } from '../types';

interface AIUseCaseCardProps {
  useCase: AIUseCase;
}

const AIUseCaseCard: React.FC<AIUseCaseCardProps> = ({ useCase }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-6 flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300">
      <h4 className="text-xl font-semibold text-cyan-400 mb-2">{useCase.name}</h4>
      <p className="text-slate-400 mb-3 flex-grow">{useCase.description}</p>
      <div>
        <h5 className="text-slate-200 font-semibold mb-1">Implementation Idea:</h5>
        <p className="text-slate-400 text-sm bg-slate-900 p-3 rounded-md border border-slate-700">{useCase.implementation_idea}</p>
      </div>
    </div>
  );
};

export default AIUseCaseCard;
