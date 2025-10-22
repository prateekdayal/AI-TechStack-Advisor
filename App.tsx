
import React, { useState, useCallback } from 'react';
import { getTechAdvice } from './services/geminiService';
import { AdviceResponse } from './types';
import Header from './components/Header';
import QueryForm from './components/QueryForm';
import AdviceCard from './components/AdviceCard';
import AIUseCaseCard from './components/AIUseCaseCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const initialQuery = `I want to build a mobile app that has the latest AI business use cases. For the frontend, I'm thinking Flutter and Dart. For the backend, I want to use Java and Elasticsearch.`;

const ProjectIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);
const FrontendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);
const BackendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
);
const AIIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);


const App: React.FC = () => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [advice, setAdvice] = useState<AdviceResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateAdvice = useCallback(async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setAdvice(null);

    try {
      const result = await getTechAdvice(query);
      setAdvice(result);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans p-4 md:p-8">
      <main className="container mx-auto">
        <Header />
        <div className="mt-8">
          <QueryForm
            query={query}
            setQuery={setQuery}
            onSubmit={handleGenerateAdvice}
            isLoading={isLoading}
          />
        </div>

        <div className="mt-12">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {advice && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <AdviceCard section={advice.project_overview} icon={<ProjectIcon />} />
                <AdviceCard section={advice.frontend_analysis} icon={<FrontendIcon />} />
                <AdviceCard section={advice.backend_analysis} icon={<BackendIcon />} />
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-slate-700 p-2 rounded-full mr-4 text-cyan-400">
                    <AIIcon />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-100">AI-Powered Business Use Cases</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {advice.ai_use_cases.map((useCase, index) => (
                    <AIUseCaseCard key={index} useCase={useCase} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
