import { Dispatch, SetStateAction } from 'react';

export interface IModalProps {
  setIsActive: Dispatch<SetStateAction<boolean>>,
  isActive: boolean
}

