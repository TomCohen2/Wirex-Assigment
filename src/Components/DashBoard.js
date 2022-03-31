import React from "react";
import { useEffect, useState } from "react";
import Logout from "./Logout";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import QueryResults from "./QueryResults";

function DashBoard() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [topology, setTopology] = useState("");
  const [openEvents, setOpenEvents] = useState(false);
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");
  const [limit, setLimit] = useState(1000);

  const [data, setData] = useState({
    username: "",
    authtoken: "",
    starttime: "",
    endtime: "",
    topology: "",
    limit: "",
    clientIp: "",
    serverIp: "",
    eventType: "",
  });
  let url = `http://localhost:5443/eventids?user=${user}&authtoken=${token}&starttime=${starttime}&endtime=${endtime}&topology=${data.topology}&openevents=${openEvents}&limit=${limit}`;

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUser(localStorage.getItem("username"));

    if (token && user) {
      setToken(token);
      axios
        .get(`http://localhost:5443/topology?user=${user}&authtoken=${token}`)
        .then((res) => {
          const topologyValue = res.data[0].topology;
          setTopology(topologyValue);
          setData({
            ...data,
            topology: topologyValue,
            username: user,
            authtoken: token,
            openEvents: openEvents,
            starttime: starttime,
            endtime: endtime,
            limit: limit,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token, user]);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    setLimit(data.limit);
    console.log(limit);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.clientIp !== "") {
      url += `&clientip=${data.clientIp.toString()}`;
    }
    if (data.serverIp !== "") {
      url += `&serverip=${data.serverIp.toString()}`;
    }
    if (data.eventType !== "") {
      url += `&eventtype=${data.eventType}`;
    }
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        setShowResult(true);
        console.log(res);
        setResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "fontWeightBold",
            mb: 3,
            mt: 3,
            marginRight: "30px",
            marginLeft: "70px",
          }}
          variant="h4"
        >
          Welcome {user}
        </Typography>
        <Logout />
      </Box>
      <Box
        sx={{
          width: "500px",
        }}
      >
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            sx={{ width: 500 }}
            autoFocus
            value={data.username}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            sx={{ width: 500 }}
            name="authtoken"
            onChange={handleChange}
            label="Authentication Token"
            type="text"
            id="authtoken"
            autoComplete="authentication token"
            value={data.authtoken}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            sx={{ width: 500 }}
            margin="normal"
            required
            fullWidth
            name="topology"
            label="Topology"
            id="topology"
            autoComplete="topology"
            onChange={handleChange}
            value={data.topology}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              id="starttime"
              label="Start Time"
              type="datetime-local"
              name="starttime"
              onChange={(newVal) => {
                setStarttime(Date.parse(newVal.target.value) / 1000);
                console.log(Date.parse(newVal.target.value) / 1000);
              }}
              sx={{ width: 250 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="endtime"
              label="End Time"
              type="datetime-local"
              name="endtime"
              onChange={(newVal) => {
                setEndtime(Date.parse(newVal.target.value) / 1000);
              }}
              sx={{ width: 250, marginLeft: "1rem" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <FormControlLabel
            sx={{
              marginLeft: "1rem",
              marginTop: "1rem",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            control={
              <Checkbox
                value="openevents"
                color="primary"
                name="openevents"
                onChange={() => {
                  setOpenEvents(!openEvents);
                  console.log(openEvents);
                }}
              />
            }
            label="Open Events"
          />
          <TextField
            sx={{ width: 500 }}
            margin="normal"
            fullWidth
            name="limit"
            label="Limit"
            id="limit"
            autoComplete="Limit"
            onChange={(newVal) => {
              setLimit(newVal.target.value);
            }}
            value={limit}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            sx={{ width: 500 }}
            margin="normal"
            fullWidth
            name="clientIp"
            label="Client IP"
            id="clientIp"
            autoComplete="clientip"
            onChange={handleChange}
            value={data.clientIp}
          />
          <TextField
            sx={{ width: 500 }}
            margin="normal"
            fullWidth
            name="serverIp"
            label="ServerIP"
            id="serverIp"
            autoComplete="serverIp"
            onChange={handleChange}
            value={data.serverIp}
          />
          <TextField
            sx={{ width: 500 }}
            margin="normal"
            fullWidth
            name="eventType"
            label="Event Type"
            id="eventType"
            autoComplete="eventType"
            onChange={handleChange}
            value={data.eventType}
          />
        </Box>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              marginTop: "1rem",
              width: "200px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Send Query
            </Button>
          </Box>
        </div>
      </Box>
      {showResult && result.length > 0 && <QueryResults result={result} />}
      {showResult && result.length === 0 && (
        <Typography
          sx={{
            fontWeight: "fontWeightBold",
            mb: 3,
            mt: 3,
          }}
          variant="h4"
        >
          No Results Found
        </Typography>
      )}
    </div>
  );
}

export default DashBoard;
