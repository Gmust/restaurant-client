'use client';

import { useState } from 'react';
import { Button } from '@/src/components/shared/Button';
import { LeaveReviewModal } from '@/src/components/reviews/LeaveReviewModal';

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

