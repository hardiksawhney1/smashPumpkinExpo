type Timer = {
  // Amount of time in seconds until the timer stops
  timeout: number;

  // Interval in seconds between each tick while timer is on
  tickInterval: number;

  // Callback for tick
  onTick: () => void;

  // Callback after timer has stopped
  onFinish: () => void;
};

export const startTimer = ({
  timeout,
  tickInterval,
  onTick,
  onFinish,
}: Timer) => {
  const intervalId = setInterval(() => {
    onTick();
  }, tickInterval * 1000);

  setTimeout(() => {
    clearInterval(intervalId);
    onFinish();
  }, timeout * 1000);
};
