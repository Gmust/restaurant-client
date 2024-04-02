import { Dispatch, SetStateAction, useState } from 'react';
import { Modal } from '@/src/components/shared/Modal';
import { z } from 'zod';
import { createEventValidator } from '@/src/lib/validations/create-event';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface ICreateEventModalProps {
  setIsActive: Dispatch<SetStateAction<boolean>>,
  isActive: boolean,
  setEvents: Dispatch<SetStateAction<IEvent[]>>
}

type formData = z.infer<typeof createEventValidator>;

export const CreateEventModal = ({ setEvents, setIsActive, isActive }: ICreateEventModalProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, formState: { errors }, setError, handleSubmit, reset } = useForm<formData>({
    resolver: zodResolver(createEventValidator),
    mode: 'all',
  });

  const onSubmit = async ({ name, description, startDate, endDate }: formData) => {
    setIsLoading(true);
    try {

    } catch (e) {

    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Modal isActive={isActive} setIsActive={setIsActive}>
      <div>

      </div>
    </Modal>
  );
};

