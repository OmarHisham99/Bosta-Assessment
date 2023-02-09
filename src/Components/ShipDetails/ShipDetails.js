import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
  TimelineSeparator,
} from "@mui/lab";
import { Box } from "@mui/material";
import { Divider } from "antd";
import moment from "moment";
import React from "react";
import languages from "../../App";

const ShipDetails = ({
  shipNumber,
  shipState,
  shipLastStateDate,
  shipEvents,
}) => {
  console.log(languages);
  let events = shipEvents;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "10%",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <p
          style={{
            fontFamily: "lato-SemiBold",
            color: "#667085",
            fontSize: "16px",
          }}
        >{`Shipment No. ${shipNumber}`}</p>
        <p
          style={{
            fontFamily: "poppins-SemiBold",
            fontSize: "40px",
            margin: "auto",
          }}
        >
          {shipState}
        </p>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: "6px" }}>
        <hr
          style={{
            background: "#0098a5",
            color: "#0098a5",
            borderColor: "#0098a5",
            height: "5px",
            width: "208px",
          }}
        />
        <hr
          style={{
            background: "#0098a5",
            color: "#0098a5",
            borderColor: "#0098a5",
            height: "5px",
            width: "208px",
          }}
        />
        <hr
          style={{
            background: "#0098a5",
            color: "#0098a5",
            borderColor: "#0098a5",
            height: "5px",
            width: "208px",
          }}
        />
      </Box>
      <Box
        fontFamily="lato-SemiBold"
        sx={{ display: "flex", flexDirection: "row", gap: "3px", mt: "24px" }}
      >
        <p>{shipState} on </p>
        <p style={{ color: "#0098a5", fontFamily: "lato-SemiBold" }}>
          {shipLastStateDate}
        </p>
      </Box>
      <Divider sx={{ background: "#e4e7ec" }} />
      <Box>
        <Timeline
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2,
            },
          }}
        >
          {events &&
            events.map((item) => {
              return (
                <TimelineItem>
                  <TimelineOppositeContent>
                    <p
                      style={{ color: "#475467", fontFamily: "lato-SemiBold" }}
                    >
                      {moment(item.timestamp).format('L')}
                    </p>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>{item.state}</TimelineContent>
                </TimelineItem>
              );
            })}
        </Timeline>
      </Box>
    </Box>
  );
};

export default ShipDetails;
