import { Skeleton as MuiSkeleton } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import styles from "./index.module.css";

const Skeleton = (): React.ReactElement => {
  return (
    <Card className={styles.root}>
      <CardActionArea>
        <MuiSkeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={400}
        />
        <CardContent className={styles.overText}>
          <MuiSkeleton
            animation="wave"
            variant="text"
            width="80%"
            height={40}
          />
        </CardContent>
      </CardActionArea>
      <CardActions className={styles.actionsContainer}>
        <MuiSkeleton animation="wave" variant="text" width={100} height={40} />
        <MuiSkeleton animation="wave" variant="circular" width={40} height={40} />
      </CardActions>
    </Card>
  );
};

export default Skeleton;
