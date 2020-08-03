import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingMessage = () => {
  return (
    <div data-testid="loading-message">
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} align="center">
          <Typography variant="body1" gutterBottom>
            The motions are being generated. It may take a while.
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} align="center">
          <CircularProgress size={24} />
        </Grid>
      </Grid>
    </div>
  );
};

export default LoadingMessage;
