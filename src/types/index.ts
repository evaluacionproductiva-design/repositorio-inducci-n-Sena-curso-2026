export interface Apprentice {
  id: string;
  name: string;
  document: string;
  email: string;
  program: string;
  ficha: string;
  regional: string;
  centro: string;
  avatarUrl?: string;
  modulesCompleted: {
    identity: boolean;
    regulations: boolean;
    stages: boolean;
    ethicsCase: boolean;
  };
  quizScores: {
    identity: number; // 0-100
    regulations: number; // 0-100
    stages: number; // 0-100
  };
  casesResolved: number;
  checklistCompletedIds: string[];
  lastActive: string;
  status: 'Completado' | 'En Progreso' | 'Rezagado';
  certificateIssuedAt?: string;
}

export interface InstructorProfile {
  id: string;
  name: string;
  title: string;
  email: string;
  document: string;
  centro: string;
  regional: string;
  fichasAsignadas: string[];
  roleDescription: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  articleRef?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  badgeName: string;
  badgeIcon: string;
  questions: QuizQuestion[];
}

export interface EthicalCase {
  id: string;
  title: string;
  scenario: string;
  category: 'Académica' | 'Disciplinaria' | 'Convivencia';
  gravity: 'Leve' | 'Grave' | 'Gravísima';
  involvedActor: string;
  options: {
    id: string;
    action: string;
    isCorrect: boolean;
    feedback: string;
    regulationReference: string;
  }[];
}

export interface RegulationArticle {
  id: string;
  chapter: string;
  title: string;
  category: 'Derechos' | 'Deberes' | 'Prohibiciones' | 'Faltas y Sanciones' | 'Etapa Productiva' | 'Comité de Evaluación';
  articleNum: string;
  summary: string;
  fullText: string;
  tags: string[];
}

export interface InstitutionalSymbol {
  id: string;
  name: string;
  shortDesc: string;
  fullMeaning: string;
  elements: {
    name: string;
    significance: string;
    highlightCoords?: { x: number; y: number };
  }[];
}
