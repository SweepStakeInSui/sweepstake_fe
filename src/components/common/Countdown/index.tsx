// components/Countdown.tsx
import { useEffect, useState } from 'react';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<string>('00h 00m 00s');
  let countdownInterval: NodeJS.Timeout; // Declare countdownInterval here

  useEffect(() => {
    // Function to get the current time in Singapore
    const getCurrentTimeInSingapore = (): Date => {
      const now = new Date();
      return new Date(
        now.toLocaleString('en-US', { timeZone: 'Asia/Singapore' }),
      );
    };

    const countdownToMidnight = () => {
      // Get the current time in Singapore
      const sgTime = getCurrentTimeInSingapore();
      const hours = sgTime.getHours();
      const minutes = sgTime.getMinutes();
      const seconds = sgTime.getSeconds();

      // Calculate the remaining seconds until midnight (00:00)
      let remainingSeconds =
        24 * 60 * 60 - (hours * 60 * 60 + minutes * 60 + seconds);

      // Set an interval to update the countdown every second
      countdownInterval = setInterval(() => {
        // Calculate hours, minutes, and seconds from remaining seconds
        const hoursLeft = Math.floor(remainingSeconds / 3600);
        const minutesLeft = Math.floor((remainingSeconds % 3600) / 60);
        const secondsLeft = remainingSeconds % 60;

        // Update the state with the formatted time left
        setTimeLeft(
          `${String(hoursLeft).padStart(2, '0')}h ${String(minutesLeft).padStart(2, '0')}m ${String(secondsLeft).padStart(2, '0')}s`,
        );

        // Clear the interval if the countdown reaches zero
        if (remainingSeconds <= 0) {
          clearInterval(countdownInterval);
          setTimeLeft('Countdown finished!');
        }

        remainingSeconds -= 1; // Decrement remaining seconds
      }, 1000); // Execute every 1000 milliseconds (1 second)
    };

    countdownToMidnight(); // Start the countdown

    // Clean up the interval on component unmount
    return () => clearInterval(countdownInterval);
  }, []); // Empty dependency array ensures this runs once on mount

  return <span>{timeLeft}</span>;
};

export default Countdown;
