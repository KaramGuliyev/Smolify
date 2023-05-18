import React from "react";
import { Typography } from "@mui/material";

const DateComponent = ({ dateDetails }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const timestamp = dateDetails;
  const date = new Date(timestamp);
  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let hour = date.getHours();
  let minute = date.getMinutes();
  if (day < 10) {
    day = `0${day}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (minute === 0) {
    minute = `00`;
  } else if (minute < 10) {
    minute = `0${minute}`;
  }
  const longDate = ` ${day} ${month} ${year}, ${hour}:${minute}`;

  return (
    <Typography variant="overline" color="textSecondary">
      Created At : {longDate}
    </Typography>
  );
};

export default DateComponent;
