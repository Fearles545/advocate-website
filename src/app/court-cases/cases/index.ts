export interface CourtCase {
  title: string;
  slug: string;
  description?: string;
  date: string;
  caseNumber?: string;
  court?: string;
  outcome?: 'win' | 'partial' | 'pending';
}

export const courtCases: CourtCase[] = (
  [
    // TODO: Add court cases here
  ] as CourtCase[]
).sort((a, b) => b.date.localeCompare(a.date));
