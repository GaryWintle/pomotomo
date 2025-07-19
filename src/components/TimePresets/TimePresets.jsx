const TimePresets = ({ setTaskTime }) => {
  const presets = [10800, 7200, 3600, 1800, 900, 300];

  const increment = (amount) =>
    setTaskTime((prev) => Math.max(0, prev + amount));

  return (
    <div className="timepreset__container">
      {presets.map((seconds) => (
        <button
          key={seconds}
          type="button"
          className="time-preset"
          onClick={() => increment(seconds)}
        >
          {seconds >= 3600 ? `${seconds / 3600}h` : `${seconds / 60}m`}
        </button>
      ))}
      <button type="button" onClick={() => setTaskTime(0)}>
        Clear
      </button>
    </div>
  );
};

export default TimePresets;
