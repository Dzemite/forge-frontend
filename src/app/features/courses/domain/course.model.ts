export type CourseLevelId = 'spark' | 'circuits' | 'code-robot' | 'master';

export type CourseLevel = {
  id: CourseLevelId;
  badge: string;
  title: string;
  subtitle: string;
  bullets: string[];
};
