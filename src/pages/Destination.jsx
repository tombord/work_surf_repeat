import { Grid, Typography, Button, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadWorkPlaces } from "../components/workPlacesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectSpots } from "../components/spotsSlice";
import { WorkPlaces } from "../components/WorkPlaces";
import { theme } from "../app/theme";
import { SurfLine } from "../components/SurfLine";
const Destinations = () => {
  let { id } = useParams();
  const [buttonState, setButtonState] = useState("work");

  const spot = useSelector(selectSpots)[id];
  console.log("loadedspot : ", spot);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadWorkPlaces(id));
  }, [dispatch, id]);

  const handleButtonClick = (state) => {
    state === "work" ? setButtonState("work") : setButtonState("surf");
    console.log(buttonState);
  };

  if (!spot) {
    return <Typography variant="h6">Loading...</Typography>;
  } else {
    return (
      <Grid container p={3} spacing={1}>
        <Grid
          item
          container
          xs={12}
          direction="column"
          justifyContent="flex-end"
          
          sx={{
            backgroundSize: "cover", // Adjust the size of the background image
            backgroundPosition: "center", // Center the background image
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${spot.image})`,
            minHeight:{ xs: 150, sm: 300 }
          }}
        >
          <Typography
            variant="subtitle2"
            color={"secondary"}
            
            sx={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5) ", padding: { xs: 1, sm: 3 } }}
          >
            {" "}
            Destination submited by {spot.submitedBy}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: {
                sm: 50, // Small screens
                xs: 30,
                
              },
            }}
          >
            {" "}
            {spot.name}, {spot.country}{" "}
          </Typography>
        </Grid>
        {/* <Grid item container xs={12}>
          <Button
            variant="text"
            sx={{
              color:
                buttonState === "work"
                  ? theme.palette.primary.main
                  : theme.palette.primary.light,
              "&:hover": {
                color: buttonState === "surf" && theme.palette.primary.dark,
              },
            }}
            onClick={() => {
              handleButtonClick("work");
            }}
          >
            Where to work
          </Button>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Button
            variant="text"
            sx={{
              color:
                buttonState === "surf"
                  ? theme.palette.primary.main
                  : theme.palette.primary.light,
              "&:hover": {
                color: buttonState === "work" && theme.palette.primary.dark,
              },
            }}
            onClick={() => {
              handleButtonClick("surf");
            }}
          >
            Where to surf
          </Button>
        </Grid> */}

        {buttonState === "work" ? (
          <WorkPlaces id={id} />
        ) : (
          <SurfLine url={`https://www.surfline.com/surf-reports-forecasts-cams-map/@${spot.latitude},${spot.longitude},12z`}/>
        )}
      </Grid>
    );
  }
};

export default Destinations;
