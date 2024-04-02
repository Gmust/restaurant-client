export enum Units {
  Gram = 'g',
  Kilogram = 'kg',
  Milligram = 'mg',
}


export interface IIngredient {
  _id: string,
  name: string,
  quantity: number,
  unit: Units
}

export interface ICreateIngredientRes {
  message: string,
  ingredient: IIngredient
}
