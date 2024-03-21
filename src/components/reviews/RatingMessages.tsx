import { FaRegAngry, FaRegFrown, FaRegGrinAlt, FaRegGrinHearts, FaRegMeh } from 'react-icons/fa';


interface IRatingMessagesProps {
  currentRating: number
}
export const RatingMessages = ({currentRating}:IRatingMessagesProps) => {
  return (
    <div className='font-bold'>
      {
        currentRating == 1 && <div className='text-red-700 flex items-center space-x-1'>
          <p>
            Very bad...
          </p>
          <FaRegAngry className='text-red-700' size={30} />
        </div>
      }
      {
        currentRating == 2 && <div className='text-amber-400 flex items-center space-x-1'>
          <p>
            Bad...
          </p>
          <FaRegFrown className='text-amber-400' size={30} />
        </div>
      }
      {
        currentRating == 3 && <div className='text-yellow-300 flex items-center space-x-1'>
          <p>
            It`s ok...
          </p>
          <FaRegMeh className='text-yellow-300' size={30} />
        </div>
      }
      {
        currentRating == 4 && <div className='text-green-400 flex items-center space-x-1'>
          <p>
            Good
          </p>
          <FaRegGrinAlt className='text-green-400' size={30} />
        </div>
      }
      {
        currentRating == 5 && <div className='text-emerald-700 flex items-center space-x-1'>
          <p>
            HEAVENLY
          </p>
          <FaRegGrinHearts className='text-emerald-700' size={30} />
        </div>
      }
    </div>
  );
};

