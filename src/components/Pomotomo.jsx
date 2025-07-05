import React, { useState, useEffect } from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas-lite';

export default function Pomotomo() {
  const [activeMachine, setActiveMachine] = useState('bounceAnim');

  const { rive, RiveComponent } = useRive({
    src: 'animations/pomo-03.riv',
    autoplay: false,
    stateMachines: ['idleAnim', 'bounceAnim'],
  });

  useEffect(() => {
    if (!rive) return;
    rive.reset({ stateMachines: activeMachine, autoplay: true });
  }, [rive, activeMachine]);

  return (
    <div className="riveContainer">
      <RiveComponent />

      <button onClick={() => setActiveMachine('bounceAnim')}>bounce!</button>
      <button onClick={() => setActiveMachine('idleAnim')}>idle</button>
    </div>
  );
}
