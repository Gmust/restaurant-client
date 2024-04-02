import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DishCategories } from '@/@types/dishes';
import {
  Beef,
  CookingPot,
  Dessert,
  EggFried,
  GlassWater,
  Popcorn,
  Salad,
  Sandwich,
  Soup,
  Utensils,
} from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function showDishCategoryIcon(dishCategory: DishCategories) {
  if (dishCategory === 'Side Dish') {
    return CookingPot;
  }
  if (dishCategory === 'Dessert') {
    return Dessert;
  }
  if (dishCategory === 'Soup') {
    return Soup;
  }
  if (dishCategory === 'Snack') {
    return Sandwich;
  }
  if (dishCategory === 'Salad') {
    return Salad;
  }
  if (dishCategory === 'Appetizer') {
    return Popcorn;
  }
  if (dishCategory === 'Beverage') {
    return GlassWater;
  }
  if (dishCategory === 'Breakfast') {
    return EggFried;
  }
  if (dishCategory === 'Main Course') {
    return Beef;
  }
  return Utensils;
}


export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
