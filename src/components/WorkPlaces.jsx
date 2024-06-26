"use client";

import { Grid } from "@mui/material";
import WorkPlacesList from "./WorkPlacesList";
import { WorkPlaceCreationPopup } from "./WorkPlaceCreationPopup";
import WorkPlacesMap from "./WorkPlacesMap";
import { APIProvider } from "@vis.gl/react-google-maps";



export const WorkPlaces = ({ id }) => {

 
  return (
    <> <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API} >
        <Grid item lg={7} xs={12} id="workPlacesLists" minHeight={500}>
          <WorkPlaceCreationPopup id={id} />
          <WorkPlacesList type="café" />
          <WorkPlacesList type="coworking" />
          <WorkPlacesList type="coliving" />
        </Grid>
        <Grid item container xs={12} lg={5}>
          <WorkPlacesMap id={id}/>
        </Grid>
        </APIProvider>

      {/* <Grid
        item
        container
        xs={12}
        lg={5}
        sx={{
          backgroundSize: "cover", // Adjust the size of the background image
          backgroundPosition: "center", // Center the background image
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg)`,
          minHeight: 100,
          width: 150,
          display: { xs: "none", lg: "block" },
        }}
      ></Grid> */}
    </>
  );
};
