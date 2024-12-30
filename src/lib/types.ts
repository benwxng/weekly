export interface Update {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  author: {
    username: string;
    avatar_url: string;
  };
}

export interface Friend {
  id: string;
  username: string;
  avatar_url: string;
}