import { IIngredient } from '@/@types/ingredients';

export interface IDish {
  _id: string,
  name: string,
  description: string,
  isVegan: boolean,
  price: number,
  ingredients: IIngredient[],
  preparationTime: string,
  category: DishCategories,
  isAvailable: boolean,
  dishWeight: number,
  image: string
}

export interface IFetchDishesResponse {
  currentPage: number,
  pageTotal: number,
  data: IDish[]
}

export interface IFetchDishesQueryParams {
  skip?: number,
  limit?: number,
  isVegan?: boolean,
  category?: DishCategories
}

export interface IFetchDishesRequest {
  queryParams: string;
}

export interface IFetchSpecialtiesResponse {
  _id: string,
  specialtyDishes: IDish[],
  created_at: string,
  updated_at: string
}

export enum DishCategories {
  All = 'All',
  Soup = 'Soup',
  Salad = 'Salad',
  MainCourse = 'Main Course',
  Dessert = 'Dessert',
  Appetizer = 'Appetizer',
  Breakfast = 'Breakfast',
  SideDish = 'Side Dish',
  Beverage = 'Beverage',
  Snack = 'Snack',
}

