'use client';

import { useState } from 'react';

import { IReview } from '@/@types/reviews';
import { ChangeReviewModal } from '@/src/components/reviews/ChangeReviewModal';
import { LeaveReviewModal } from '@/src/components/reviews/LeaveReviewModal';
import { Button } from '@/src/components/shared/Button';

interface IChangeFeedbackProps {
  review: IReview;
}

export const ChangeFeedback = ({ review }: IChangeFeedbackProps) => {

  const [isActive, setIsActive] = useState<boolean>(false);


  return (
    <>
      <Button onClick={() => setIsActive(true)}>Change Review</Button>
      <ChangeReviewModal setIsActive={setIsActive} isActive={isActive} initialReview={review} />
    </>
  );
};

