import "./App.css";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import {
  Alert,
  AppBar,
  Box,
  Button,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Dropdown, Space } from "antd";
import { react, useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import storySet from "./images/story-set.svg";
import { fetchShipById } from "./store/apps/Ships";
import { useDispatch, useSelector } from "react-redux";
import "./fonts/Poppins-SemiBold.ttf";
import moment, { lang } from "moment/moment";
import ShipDetails from "./Components/ShipDetails/ShipDetails";
import i18next from "i18next";
import languages from './languages'

const items = [
  {
    label: "English",
    key: "en",
  },
  {
    label: "Arabic",
    key: "ar",
  },
];

function App() {

  // ************* States *************
  const [language, setLanguage] = useState("en");
  const [shipNumber, setShipNumber] = useState("");
  const [shipTrackingNumber, setShipTrackingNumber] = useState(null);
  const [shipState, setShipState] = useState(null);
  const [shipLastStateDate, setShipLastStateDate] = useState(null);
  const [transitEvents, setTransitEvents] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [notFoundShip, setNotFoundShip] = useState(false);
  // ************* Redux *************
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Ships);

  // ************* Functions *************
  const handleSearch = () => {
    // console.log(shipNumber)
    dispatch(fetchShipById(shipNumber));
    checkValidation();
    setShipState(data?.data?.CurrentStatus?.state);
    setShipLastStateDate(
      moment(data?.data?.CurrentStatus?.timestamp).format("LLLL")
    );
    setTransitEvents(data?.data?.TransitEvents);
    // console.log(data?.data?.TrackingNumber)
    setShipTrackingNumber(data?.data?.TrackingNumber);
  };

  const checkValidation = () => {
    console.log(shipNumber);
    console.log(JSON.stringify(data));
    if (shipNumber === "") {
      setDetailsOpen(false);
    } else if (Object.keys(data.data).length === 0) {
      setDetailsOpen(true)
      setNotFoundShip(true);
    } else {
      setNotFoundShip(false);
      setDetailsOpen(true);
    }
  };
  const onClick = ({ key }) => {
    setLanguage(key);

  }
  // ************* Effects *************
  useEffect(() => {}, [data]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/************ app bar **************/}
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "white", boxShadow: 0, zIndex: 1 }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: 20,
          }}
        >
          <img
            src={require("./images/bosta-logo.png")}
            style={{
              height: 30,
              width: 90,
              maxWidth: 90,
              marginLeft: "3%",
              cursor: "pointer",
            }}
          />
          <Dropdown
            menu={{
              items,
              onClick,
            }}
          >
            <a
              onClick={(e) => e.preventDefault()}
              style={{
                color: "black",
                cursor: "pointer",
                marginRight: "3%",
                zIndex: 0,
              }}
            >
              <Space>
                {language === "en" ? "En" : "Ar"}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Toolbar>
      </AppBar>

      {/************ main content **************/}
      {/* search area */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "10%",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ fontFamily: "Poppins-SemiBold", color: "#475467", mb: "24px" }}
        >
          {languages[language]['Track Your Shipment']}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <TextField
            autoFocus
            placeholder={languages[language]["Tracking No."]}
            sx={{ width: 395, height: 60 }}
            onChange={(e) => {
              setShipNumber(e.target.value);
            }}
          />
          <button
            onClick={() => handleSearch()}
            style={{
              border: "none",
              cursor: "pointer",
              backgroundColor: "white",
            }}
          >
            <img
              src={require("./images/search-btn.png")}
              style={{ height: 50, objectFit: "fill" }}
            />
          </button>
        </Box>

        {detailsOpen ? (
          notFoundShip ? (
            <div>
              <span>
                <Alert severity="error" sx={{width:'40%', m:'auto',mt:'10px'}}>{languages[language]['No record of this tracking number can be found at this time, please check the number and try again later. For further assistance, please contact Customer Service.']}</Alert>
              </span>
            </div>
          ) : (
            <ShipDetails
              shipNumber={shipTrackingNumber}
              shipState={shipState}
              shipLastStateDate={shipLastStateDate}
              shipEvents={transitEvents}
              language={language}
            />
          )
        ) : (
          <img
            src={storySet}
            style={{
              height: 400,
              width: 400,
              position: "absolute",
              left: "5%",
              top: "70%",
            }}
          />
        )}
      </Box>
      {/* search results */}
    </Box>
  );
}

export default App;
