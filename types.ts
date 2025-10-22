
export interface AIUseCase {
  name: string;
  description: string;
  implementation_idea: string;
}

export interface AdviceSection {
  title: string;
  summary: string;
  bullet_points: string[];
}

export interface AdviceResponse {
  project_overview: AdviceSection;
  frontend_analysis: AdviceSection;
  backend_analysis: AdviceSection;
  ai_use_cases: AIUseCase[];
}
