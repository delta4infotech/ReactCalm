import React from "react";

import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

const styles = (theme) => ({
  root: {

  },
});

const Footer = (props) => {
  const { classes } = props;

  return (
    <footer className={classes.root}>
    </footer>
  );
};

export default withStyles(styles)(Footer);
