import React, { useState, useEffect, useCallback } from "react";
import "firebase/firestore";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CircularProgress, Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Tooltip } from "@material-ui/core";
// import { RatingElement } from "./RatingElement";
import style from "./DisplayRoutes.module.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 365,
    boxShadow: "0 3px 5px 2px #adadad",
    margin: "20px auto",
    position: "relative",
  },
  gridRoot: {
    flexGrow: "1",
    margin: "auto",
    width: "90%",
  },
  gridItem: {
    borderRight: "1px solid black",
  },
  media: {
    height: 160,
  },
  routeDescription: {
    overflow: "auto",
    height: "70px",
  },
  rating: {
    position: "absolute",
    borderRadius: "5px",
    opacity: "0.7",
    top: "6px",
    left: "6px",
    backgroundColor: "#fff",
  },
  avatar: {
    width: "45px",
    height: "45px",
    position: "absolute",
    top: "5px",
    right: "5px",
    zIndex: "1",
    border: "2px solid #fff",
  },
  onAvatar: {
    width: "50px",
    height: "50px",
    position: "absolute",
    top: "5px",
    right: "5px",
    zIndex: "1",
    cursor: "pointer",
    border: "2px solid #fff",
    boxShadow: "5px 5px 21px -6px rgb(0 0 0 / 73%)",
  },
  title: {
    backgroundColor: "#fff",
    borderRadius: "5px",
    opacity: 0.75,
    position: "absolute",
    top: "5px",
    left: "10px",
    padding: "3px 5px",
  },
});

export const DisplayRoutes = (props) => {
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const { selectedRegion } = useParams();
  const classes = useStyles();
  const matches1300 = useMediaQuery("(min-width:1300px)");
  const matches1630 = useMediaQuery("(min-width:1630px)");
  const matches1100 = useMediaQuery("(min-width:1100px)");

  const paginationFilter = useCallback(
    function (obj, number) {
      const howManyDisplayed = matches1100 ? (matches1630 ? 12 : 8) : 4;
      const indexStart = number * howManyDisplayed - howManyDisplayed;
      const indexEnd = number * howManyDisplayed - 1;
      return obj.filter((obj, index) => {
        return index >= indexStart && index <= indexEnd;
      });
    },
    [matches1100, matches1630]
  );

  const progressElement = props.routes.length > 0 ? "" : <CircularProgress />;

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#fff",
      padding: "10px 15px",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
      borderRadius: "7px",
    },
  }))(Tooltip);

  useEffect(() => {
    const selectedRegionReplaced = selectedRegion.replace("-", " ");
    const filteredRoutes = props.routes.filter((route) => {
      // const selectedRegion = props.region.toLowerCase().trim();
      const region = route.region.toLowerCase().trim();
      return selectedRegionReplaced === region;
    });
    // 1. filter routes that have already been filtered by regions --- version 1
    const filteredByPaginationValue = paginationFilter(
      filteredRoutes,
      props.paginationValue
    );

    // 2. filter all routes that haven not been filtered by regions yet --- version 2
    // const filteredByPaginationValue = paginationFilter(
    //   props.routes,
    //   props.paginationValue
    // );
    setFilteredRoutes(filteredByPaginationValue);
  }, [
    props.routes,
    props.paginationValue,
    matches1100,
    selectedRegion,
    matches1630,
    paginationFilter,
  ]);

  return (
    <div className={classes.gridRoot}>
      {progressElement}
      <Grid container spacing={0}>
        {filteredRoutes.map((object) => (
          <Grid
            key={object.routeId}
            item
            xs={matches1100 ? (matches1300 ? (matches1630 ? 4 : 6) : 6) : 12}
          >
            <Card className={classes.root}>
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">
                      Mustafa Mustafiański
                    </Typography>
                  </React.Fragment>
                }
              >
                <div
                  className={style.avatar}
                  style={{
                    backgroundImage: `url(${"https://picsum.photos/150/150"})`,
                  }}
                ></div>
              </HtmlTooltip>

              <Link
                to={`/route/${object.routeId}`}
                style={{ textDecoration: "none", color: "#222222" }}
              >
                <CardActionArea>
                  {/* <div className={classes.rating}>
                    <RatingElement votesAverage={object.votesAverage} />
                  </div> */}
                  <div className={classes.title}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      style={{
                        margin: "0px",
                        width: "270px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {object.routeTitle}
                    </Typography>
                  </div>
                  <CardMedia
                    className={classes.media}
                    image={object.img}
                    title="Contemplative Reptile"
                  />
                </CardActionArea>
              </Link>
              <CardActions>
                <Grid container spacing={0}>
                  <Grid className={classes.gridItem} item xs={3}>
                    <Typography
                      align="center"
                      variant="subtitle1"
                      display="block"
                      gutterBottom
                    >
                      {object.duration}
                    </Typography>
                    <Typography
                      align="center"
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      time
                    </Typography>
                  </Grid>
                  <Grid className={classes.gridItem} item xs={3}>
                    <Typography
                      align="center"
                      variant="subtitle1"
                      display="block"
                      gutterBottom
                    >
                      {object.distance}
                    </Typography>
                    <Typography
                      align="center"
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      distance KM
                    </Typography>
                  </Grid>
                  <Grid className={classes.gridItem} item xs={3}>
                    <Typography
                      align="center"
                      variant="subtitle1"
                      display="block"
                      gutterBottom
                    >
                      {object.originElevation}
                    </Typography>
                    <Typography
                      align="center"
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      Heighest A
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      align="center"
                      variant="subtitle1"
                      display="block"
                      gutterBottom
                    >
                      {object.destinationElevation}
                    </Typography>
                    <Typography
                      align="center"
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      Heighest B
                    </Typography>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
