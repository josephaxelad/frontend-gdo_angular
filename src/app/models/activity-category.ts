export interface ActivityCategory {
  id: number;
  attributes: {
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    categorie_de_l_activites: {data: ActivityCategory[]
  }};
}
