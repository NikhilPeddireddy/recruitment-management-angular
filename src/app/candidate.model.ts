export interface Candidate {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string;
    stage: string;
    evaluated: boolean;
    status?: string;
    resume?: string;
    score?: number;
  }