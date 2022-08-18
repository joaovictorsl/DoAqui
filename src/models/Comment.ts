export interface CommentInterface {
  itemId: string;
  userEmail: string;
  content: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
}