import { IIngredient } from '@/@types/ingredients';
import { Dispatch, SetStateAction } from 'react';


interface IHandleUpdateData {
  updatedData: any,
  data: any,
  setData: Dispatch<SetStateAction<any>>
}

export const handleUpdateData = ({ updatedData, setData, data }: IHandleUpdateData) => {
  const index = data.findIndex((d:any) => d._id === updatedData._id);
  if (index !== -1) {
    const updatedDishes = [...data];
    updatedDishes[index] = updatedData;
    setData(updatedDishes);
  }
};
