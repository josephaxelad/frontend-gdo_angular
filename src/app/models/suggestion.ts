export interface Suggestion {
  id?: number;
  attributes: {
    email: string;
    object: string;
    name: string;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
    publishedAt?: Date;
  };
}
