import { Typography, Button, Box } from "@mui/material";
import { BarChart } from "@mui/icons-material";

const LinkItem = ({ LinkArray }) => {
  console.log(LinkArray);
  return (
    <>
      {LinkArray.map((linkItem, i) => {
        const { id, createdAt, name, longUrl, shortCode, totalClicks } = linkItem;

        console.log(id, createdAt, name, longUrl, shortCode, totalClicks);

        return (
          <Box display={"flex"} justifyContent={"space-between"} key={i}>
            <Box>
              <Typography>Created At : {`${createdAt}`}</Typography>
              <Typography variant="h5">{name}</Typography>
              <Typography>{longUrl}</Typography>
              <Box>
                <Typography>{window.location.host + "/" + shortCode}</Typography>
                <Button size="small" variant="outlined">
                  Copy
                </Button>
              </Box>
            </Box>
            <Box>
              <Box>
                <Box display={"flex"}>
                  <Typography>{totalClicks}</Typography>
                  <BarChart></BarChart>
                </Box>
                <Typography>Total Clicks</Typography>
              </Box>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default LinkItem;
