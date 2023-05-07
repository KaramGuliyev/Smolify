import { Typography, Button, Box, Divider } from "@mui/material";
import { BarChart } from "@mui/icons-material";
import DateComponent from "./Date";

const LinkItem = ({ LinkArray }) => {
  return (
    <>
      {LinkArray.map((linkItem, i) => {
        const { id, createdAt, name, longUrl, shortCode, totalClicks } = linkItem;

        return (
          <>
            <Box display={"flex"} justifyContent={"space-between"} key={i}>
              <Box>
                <DateComponent dateDetails={createdAt} />
                <Box my={2}>
                  <Typography variant="h5">{name}</Typography>
                  <Typography>{longUrl}</Typography>
                </Box>
                <Box display={"flex"} alignItems="center">
                  <Typography mr={3} color="primary">
                    {window.location.host + "/" + shortCode}
                  </Typography>
                  <Button size="small" variant="outlined">
                    Copy
                  </Button>
                </Box>
              </Box>
              <Box display={"flex"} flexDirection={"column"} alignSelf={"center"}>
                <Box>
                  <Box display={"flex"} justifyContent={"center"}>
                    <Typography>{totalClicks}</Typography>
                    <BarChart></BarChart>
                  </Box>
                  <Typography variant="overline" color="textSecondary">
                    Total Clicks
                  </Typography>
                </Box>
              </Box>
            </Box>
            {i !== LinkArray.length - 1 && (
              <Box my={4}>
                <Divider />
              </Box>
            )}
          </>
        );
      })}
    </>
  );
};

export default LinkItem;
