export type User = {
  id: string;
  name: string;
  role: 'child' | 'parent' | 'teacher' | 'admin';
};

export type Session = {
  user: User;
};
