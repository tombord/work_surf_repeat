import React, { useRef, useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";

export const GoogleMapsIdFinder = ({onChange}) => {
  const [predictions, setPredictions] = useState([]);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const autocomplete = new places.AutocompleteService();

    const handleInput = () => {
      const query = inputRef.current.value;
      if (!query) {
        setPredictions([]);
        return;
      }

      const request = {
        input: query,
        types: ["establishment"],
        componentRestrictions: { country: ["FR"] },
        fields: ["geometry", "name", "formatted_address"],
      };

      autocomplete.getPlacePredictions(request, (results, status) => {
        if (status === "OK" && results) {
          setPredictions(results);
        } else {
          setPredictions([]);
        }
      });
    };

    const inputElement = inputRef.current;
    inputElement.addEventListener("input", handleInput);

    return () => {
      inputElement.removeEventListener("input", handleInput);
    };
  }, [places]);

  

  return (
    <Box
      className="autocomplete-container"
      sx={{ maxWidth: 300, margin: "auto", mt: 4 }}
    >
      <Autocomplete
        options={predictions}
        getOptionLabel={(option) => `${option.description}`}
        onChange={onChange}
        name="googleId"
        noOptionsText="type name to see suggestions"
        renderInput={(params) => (
          <TextField {...params} inputRef={inputRef} label="Place name" name="googleId"  />
        )}
        isOptionEqualToValue={(option, value) =>
          option.place_id === value.place_id
        }
      />
     
      
    </Box>
  );
};