import styles from './OpenButton.module.css';
import open from '../../assets/open-module.svg';

export default function OpenButton({ setModuleOpen }) {
  return (
    <button type="button" className={styles.openButton}>
      <img
        src={open}
        alt="open button"
        onClick={() => setModuleOpen((prev) => !prev)}
      />
    </button>
  );
}
