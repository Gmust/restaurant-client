'use client';

import { useState } from 'react';
import { Button } from '@/src/components/shared/Button';
import { LeaveReviewModal } from '@/src/components/reviews/LeaveReviewModal';
import { ChangeReviewModal } from '@/src/components/reviews/ChangeReviewModal';
import { IReview } from '@/@types/reviews';

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

