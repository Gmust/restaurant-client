export enum Units {
  Gram = 'g',
  Kilogram = 'kg',
  Milligram = 'mg',
}


export interface IIngredient {
  _id: string,
  name: string,
  quantity: string,
  unit: string
}
