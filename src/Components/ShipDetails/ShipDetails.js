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
import languages from "../../languages";

const ShipDetails = ({
  shipNumber,
  shipState,
  shipLastStateDate,
  shipEvents,
  language,
}) => {
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
            fontFamily: "Cairo-Regular",
            color: "#667085",
            fontSize: "16px",
          }}
        >{`${languages[language]["Shipment No."]}: ${shipNumber}`}</p>
        <p
          style={{
            fontFamily: "Cairo-Regular",
            fontSize: "40px",
            margin: "auto",
          }}
        >
          {languages[language][shipState]
            ? languages[language][shipState]
            : shipState}
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
        fontFamily="Cairo-Regular"
        sx={{ display: "flex", flexDirection: "row", gap: "3px", mt: "24px" }}
      >
        <p>
          {languages[language][shipState]
            ? languages[language][shipState]
            : shipState}
        </p>
        <p style={{ color: "#0098a5", fontFamily: "Cairo-Regular" }}>
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
                      {moment(item.timestamp).format("L")}
                    </p>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>{languages[language][item.state] ? languages[language][item.state] : item.state }</TimelineContent>
                </TimelineItem>
              );
            })}
        </Timeline>
      </Box>
    </Box>
  );
};

export default ShipDetails;
