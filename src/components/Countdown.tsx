import { useStore } from '@nanostores/react';

import { timeLeft } from '../store/countdown';
import { addLeadingZeros } from '../utils/index';


export default function Countdown() {

  const countDown = useStore(timeLeft);

  return (
    <div className="Countdown">
        <span className="countdown-col">
          <strong>{addLeadingZeros(countDown.days)}</strong>
          <span>{countDown.days === 1 ? 'Day' : 'Days'}</span>
        </span>

        <span className="countdown-col">
          <strong>{addLeadingZeros(countDown.hours)}</strong>
          <span>Hours</span>
        </span>

        <span className="countdown-col">
          <strong>{addLeadingZeros(countDown.min)}</strong>
          <span>Min</span>
        </span>

        <span className="countdown-col">
          <strong>{addLeadingZeros(countDown.sec)}</strong>
          <span>Sec</span>
        </span>
      </div>
  );
}