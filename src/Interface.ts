export interface UserData {
  name: string;
  username: string;
  role: string;
  bio: string;
  location: string;
  email: string;
  avatarUrl: string;
  coverUrl?: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}