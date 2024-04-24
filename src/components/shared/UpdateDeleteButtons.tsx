import { Edit2, Trash } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

import { Button } from '@/src/components/shared/Button';


interface IUpdateDeleteButtonsProps {
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setIsDelete: Dispatch<SetStateAction<boolean>>;
  buttonsSize: 'sm' | 'lg' | 'md'
}

export const UpdateDeleteButtons = ({ setIsDelete, setIsEdit, buttonsSize }: IUpdateDeleteButtonsProps) => {
  return (
    <>
      <Button className='bg-emerald-700 hover:bg-emerald-800' onClick={() => setIsEdit(true)} size={buttonsSize}>
        <Edit2 />
      </Button>
      <Button className='bg-red-600 hover:bg-red-800' onClick={() => setIsDelete(true)} size={buttonsSize}>
        <Trash />
      </Button>
    </>
  );
};

