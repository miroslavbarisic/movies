import type { ReactElement } from "react";
import styles from "./index.module.css";
import CircularProgress from '@mui/material/CircularProgress';

const Fallback = (): ReactElement => {
  return (
    <div className={styles.root}>
      <CircularProgress />
    </div>
  );
};

export default Fallback;
