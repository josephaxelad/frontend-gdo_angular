export interface Partner {
  id: number;
  attributes: {
    email: string;
    name: string;
    description?: string;
    // checked: boolean;
    picture?: {data: {attributes: { url: string}}};
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
}
