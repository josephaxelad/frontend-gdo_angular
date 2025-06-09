export interface Gallerie {
  id: number;
  attributes: {
    image: {data: {attributes: { url: string}}};
  };
}
