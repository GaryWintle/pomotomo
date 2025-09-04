import { useEffect } from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas-lite';
import styles from './PomoCharacter.module.css';

export default function PomoCharacter({ activeMachine }) {
  const { rive, RiveComponent } = useRive({
    src: 'animations/pomotomo-05.riv',
    autoplay: true,
    stateMachines: ['Pomotomo'],
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  useEffect(() => {
    if (!rive) return;
    const inputs = rive.stateMachineInputs('Pomotomo');
    const input = inputs.find((i) => i.name === activeMachine);
    input?.fire();
  }, [rive, activeMachine]);

  return (
    <div className={styles.container}>
      <RiveComponent />
    </div>
  );
}
