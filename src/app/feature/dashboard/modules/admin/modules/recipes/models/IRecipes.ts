export interface IRecipes {
  id: number,
  name: string,
  imagePath: string,
  description: string,
  price: string,
  creationDate: string,
  modificationDate: string,
  category: [
    {
      id: number,
      name: string,
      creationDate: string,
      modificationDate: string,
    }
  ],
  tag: {
    id: number,
    name: string,
    creationDate: string,
    modificationDate: string,
  }
}
