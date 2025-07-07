import { useEffect } from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas-lite';

export default function Pomotomo({ activeMachine }) {
  const { rive, RiveComponent } = useRive({
    src: 'animations/pomo-04.riv',
    autoplay: false,
    stateMachines: ['idleAnim', 'bounceAnim', 'readingAnim'],
  });

  useEffect(() => {
    if (!rive) return;
    rive.reset({ stateMachines: activeMachine, autoplay: true });
  }, [rive, activeMachine]);

  return (
    <div className="riveContainer">
      <RiveComponent />
    </div>
  );
}
