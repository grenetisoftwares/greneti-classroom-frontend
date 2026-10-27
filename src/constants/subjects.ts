import type { Subject } from "@/types";

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "CS",
    description: "Fundamentals of programming, algorithms, and computational thinking.",
    createdAt: "2026-01-15T08:00:00.000Z",
  },
  {
    id: 2,
    code: "MATH201",
    name: "Calculus II",
    department: "MATH",
    description: "Integration techniques, infinite series, and their applications.",
    createdAt: "2026-01-20T08:00:00.000Z",
  },
  {
    id: 3,
    code: "ENGL102",
    name: "Academic Writing",
    department: "ENGLISH",
    description: "Research-based writing, rhetorical analysis, and critical thinking.",
    createdAt: "2026-01-25T08:00:00.000Z",
  },
];
