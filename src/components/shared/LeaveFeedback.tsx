'use client';

import { useState } from 'react';

import { LeaveReviewModal } from '@/src/components/reviews/LeaveReviewModal';
import { Button } from '@/src/components/shared/Button';

export const LeaveFeedback = () => {

  const [isActive, setIsActive] = useState<boolean>(false);


  return (
    <>
      <div>
        <Button onClick={() => setIsActive(true)}>Leave feedback</Button>
      </div>
      <LeaveReviewModal setIsActive={setIsActive} isActive={isActive} />
    </>
  );
};

