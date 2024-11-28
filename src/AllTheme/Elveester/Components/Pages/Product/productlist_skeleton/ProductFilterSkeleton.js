import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
  useMediaQuery,
} from "@mui/material";

const ProductFilterSkeleton = () => {
  const cardsArray = Array.from({ length: 6 }, (_, index) => index + 1);
  const isMobile = useMediaQuery("(max-width: 767px)");
    const isMobile600 = useMediaQuery("(max-width: 600px)");

  return (
    <div style={{ display: "flex", flex: "1 1 80%",height  : "auto" ,position  :"relative" }}>
      <Grid item xs={12} container spacing={2} sx={{
        height  :"auto"
      }}>
        {cardsArray.map((item) => (
          <Grid item xs={isMobile ? 6 : 4} key={item} sx={{height  :"fit-content"}}>
            <Skeleton
              animation="wave"
              variant="rect"
              width={"100%"}
              height="40vh"
            />
            <CardContent >
              <Skeleton
                animation="wave"
                variant="text"
                width={"80%"}
                height={20}
                style={{ marginBottom: "10px" }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={"60%"}
                height={20}
              />
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductFilterSkeleton;
