import logo from "./logo.png";
import "./App.css";
import { Box } from "@mui/system";
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Stack,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  TablePagination,
  IconButton,
  Container,
  Switch,
} from "@mui/material";
import btcCoin from "./bitcoin.png";
import { isMobile } from "mobile-device-detect";
import React, { useEffect, useRef, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import sat from "./wallets/unisat.jpg";
import okx from "./wallets/okx.png";
import xverse from "./wallets/xverse.jpg";
import leather from "./wallets/leather.jpg";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import toast, { Toaster } from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { server_url } from "./config";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

const columns = [
  { id: "address", label: "Address", minWidth: 170 },
  { id: "amount", label: "Amount", minWidth: 100 },
  {
    id: "updatedAt",
    label: "Date",
    minWidth: 170,
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 478,
  bgcolor: "white",
  borderRadius: "12px",
  boxShadow: 24,
  display: "flex",
};

const IOSSwitch = styled((props) => (
  <Switch
    checked={props.available}
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

function App() {
  const navigate = useNavigate();
  const [available, setAvailable] = useState(false);
  // ------------------
  const [openModal, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if (connected) {
      setAnchorEl(event.currentTarget);
    } else {
      handleOpen();
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //   -------------------------------

  const [walletConnectModal, setWalletConnectModal] = useState(false);
  const [size, setSize] = useState(0);

  const [address, setAddress] = useState(null);
  const [unisatInstalled, setUnisatInstalled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [withdrawlist, setWithdrawList] = useState([]);
  const [network, setNetwork] = useState("livenet");
  const [depositedValue, setDepositedValue] = useState(0);
  const [earn, setEarn] = useState(0);
  const [loading, setLoading] = useState(false);
  const [apy, setAPY] = useState(3.89);
  const [balance, setBalance] = useState({
    confirmed: 0,
    unconfirmed: 0,
    total: 0,
  });
  const [tvl, setTVL] = useState(0);

  const unisat = window.unisat;

  const selfRef = useRef({
    accounts: [],
  });

  const self = selfRef.current;

  const getBasicInfo = async () => {
    const unisat = window.unisat;
    const [address] = await unisat.getAccounts();
    setAddress(address);

    const publicKey = await unisat.getPublicKey();
    setPublicKey(publicKey);

    const balance = await unisat.getBalance();
    setBalance(balance);

    const network = await unisat.getNetwork();
    setNetwork(network);
  };

  const handleAccountsChanged = (_accounts) => {
    // if (self.accounts[0] === _accounts[0]) {
    //   // prevent from triggering twice
    //   setOpen(false);
    //   return;
    // }
    self.accounts = _accounts;
    if (_accounts.length > 0) {
      setAccounts(_accounts);
      setConnected(true);
      setAddress(_accounts[0]);
      getBasicInfo();
    } else {
      setConnected(false);
    }
    setWalletConnectModal(false);
  };

  const handleNetworkChanged = (network) => {
    setNetwork(network);
    getBasicInfo();
  };

  const ConnectWallet = async () => {
    const result = await unisat.requestAccounts();
    const balance = await unisat.getBalance();
    setBalance(balance);
    handleAccountsChanged(result);
    setConnected(true);
    setOpen(false);
  };

  const DisconnectWallet = () => {
    setConnected(false);
    setAccounts([]);
    handleClose();
  };

  const getAvailableFlag = async () => {
    const data = await axios.get(`${server_url}/api/payment/getavailable`);
    setAvailable(data.data.flag);
  };

  const getAPY = async () => {
    const data = await axios.get(`${server_url}/api/payment/getAPY`);
    setAPY(data.data.apy);
  };

  const updateAvailableFlag = async (flag) => {
    await axios.post(`${server_url}/api/payment/updateAvailableFlag`, { flag });
  };

  const updateAPY = async (flag) => {
    if (apy > 0) {
      await axios.post(`${server_url}/api/payment/updateAPY`, { apy });
      toast.success("Update APY!");
    } else {
      toast.error("Invalid APY!");
    }
  };

  const getTVL = async () => {
    setLoading(true);
    try {
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    const data = await axios.get(`${server_url}/api/payment/getTVL`);
    const sum = data.data.reduce((item, a) => item + a.value, 0);
    setTVL(Number(sum.toFixed(7)));
  };

  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");

  const Verify = () => {
    if (password === "1234567890") {
      setVerified(true);
    } else {
      toast.error("Password is incorrect");
    }
  };

  const getWithdrawlist = async () => {
    const data = await axios.get(`${server_url}/api/payment/getWithdrawlist`);
    setWithdrawList(data.data);
  };

  const checkedWithdraw = async (rowdata) => {
    const data = await axios.post(`${server_url}/api/payment/checkedWithdraw`, {
      rowdata,
    });
    console.log(data, "data=====");
    toast.success("Withdraw successed");
    getWithdrawlist();
  };

  useEffect(() => {
    async function checkUnisat() {
      let unisat = window.unisat;

      for (let i = 1; i < 10 && !unisat; i += 1) {
        await new Promise((resolve) => setTimeout(resolve, 100 * i));
        unisat = window.unisat;
      }

      if (unisat) {
        setUnisatInstalled(true);
      } else if (!unisat) return;

      unisat.getAccounts().then((accounts) => {
        if (accounts[0] !== "bc1pzem4hsc4d3pa8yyv5ugp7gjnc5rhmsvrqff6637se5824ata4frspl9py3") {
          navigate("/404");
        } else {
          handleAccountsChanged(accounts);
        }
      });

      unisat.on("accountsChanged", handleAccountsChanged);
      unisat.on("networkChanged", handleNetworkChanged);

      return () => {
        unisat.removeListener("accountsChanged", handleAccountsChanged);
        unisat.removeListener("networkChanged", handleNetworkChanged);
      };
    }

    checkUnisat().then();
  }, []);

  useEffect(() => {
    setSize(window.innerWidth);
  }, [window.innerWidth]);

  useEffect(() => {
    getTVL();
    getWithdrawlist();
  }, [accounts]);

  useEffect(() => {
    getAvailableFlag();
    getAPY();
  }, []);

  return (
    <div className="App">
      <Toaster />
      <Box sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
        <Link to="/">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            className="connect-btn"
            sx={{ my: "48px" }}
            variant="contained"
          >
            Home Page
          </Button>
        </Link>
        {!connected ? (
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            className="connect-btn"
            sx={{ m: "48px" }}
            variant="contained"
          >
            Connect Wallet
          </Button>
        ) : (
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            className="connect-btn"
            sx={{ m: "48px" }}
            variant="contained"
          >
            {address.slice(0, 6) +
              "..." +
              address.slice(address.length - 4, address.length)}
          </Button>
        )}

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>{balance.total / 100000000}</MenuItem>
          <MenuItem onClick={DisconnectWallet}>disconnect</MenuItem>
        </Menu>

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack
              sx={{
                flex: "1",
                bgcolor: "#d3d3d3",
                borderRadius: "12px 0px 0px 12px",
                p: 4,
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                mb={5}
              >
                Connect a Wallet
              </Typography>
              <Button
                sx={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  textTransform: "none",
                  color: "black",
                  justifyContent: "flex-start",
                }}
                onClick={ConnectWallet}
              >
                <img
                  src={sat}
                  style={{ width: "30px", height: "30px", borderRadius: "5px" }}
                />{" "}
                Unisat Wallet
              </Button>
              <Button
                disabled
                sx={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  textTransform: "none",
                  color: "black",
                  justifyContent: "flex-start",
                }}
              >
                <img
                  src={xverse}
                  style={{ width: "30px", height: "30px", borderRadius: "5px" }}
                />{" "}
                Xverse Wallet
              </Button>
              <Button
                disabled
                sx={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  textTransform: "none",
                  color: "black",
                  justifyContent: "flex-start",
                }}
              >
                <img
                  src={okx}
                  style={{ width: "30px", height: "30px", borderRadius: "5px" }}
                />{" "}
                Okx Wallet
              </Button>
              <Button
                disabled
                sx={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  textTransform: "none",
                  color: "black",
                  justifyContent: "flex-start",
                }}
              >
                <img
                  src={leather}
                  style={{ width: "30px", height: "30px", borderRadius: "5px" }}
                />{" "}
                Leather Wallet
              </Button>
            </Stack>
            <Stack sx={{ flex: "2", borderRadius: "0px 12px 12px 0px", p: 4 }}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                mb={5}
              >
                What is a Wallet?
              </Typography>
              <Typography variant="h6" component="h5" mb={2}>
                Easy Login
              </Typography>
              <Typography id="modal-modal-description" mb={5}>
                No need to create new accounts and passwords for every website.
                Just connect your wallet and get going.
              </Typography>
              <Typography variant="h6" component="h5" mb={2}>
                Store your Digital Assets
              </Typography>
              <Typography id="modal-modal-description" mb={5}>
                Send, receive, store, and display your digital assets like NFTs
                & coins.
              </Typography>
            </Stack>
          </Box>
        </Modal>
      </Box>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isMobile ? (
          <Box sx={{ width: "100%", margin: "auto" }}>
            {verified ? (
              <Box my={5} p={2}>
                <Box sx={{ display: "flex" }}>
                  <FormControlLabel
                    sx={{ flex: 1 }}
                    onChange={(e) => {
                      setAvailable(e.target.checked);
                      updateAvailableFlag(e.target.checked);
                    }}
                    control={<IOSSwitch sx={{ m: 1 }} available={available} />}
                    label="Whitelist Available"
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
                  <TextField
                    sx={{ flex: "1" }}
                    value={apy}
                    onChange={(e) => {
                      setAPY(e.target.value);
                    }}
                    id="outlined-size-small"
                    placeholder="please input the apy"
                    defaultValue=""
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                  />
                  <LoadingButton
                    size="small"
                    loading={loading}
                    variant="outlined"
                    sx={{ flex: "1", minWidth: "150px" }}
                    className="deposit-button"
                    onClick={updateAPY}
                  >
                    Set the APY
                  </LoadingButton>
                </Box>
                <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {withdrawlist
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.code}
                              >
                                {columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      {column.id === "amount"
                                        ? value.toFixed(7)
                                        : value}
                                    </TableCell>
                                  );
                                })}
                                <TableCell>
                                  <IconButton
                                    onClick={() => {
                                      checkedWithdraw(row);
                                    }}
                                    color="secondary"
                                    aria-label="add an alarm"
                                  >
                                    <DoneOutlineIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={withdrawlist.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </Box>
            ) : (
              <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box noValidate sx={{ mt: 1 }}>
                      <TextField
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={Verify}
                      >
                        Sign In
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </ThemeProvider>
            )}
          </Box>
        ) : (
          <Box sx={{ width: "832px", margin: "auto" }}>
            {verified ? (
              <Box my={5}>
                <Box sx={{ display: "flex", gap: 5 }}>
                  <FormControlLabel
                    sx={{ flex: 1 }}
                    onChange={(e) => {
                      setAvailable(e.target.checked);
                      updateAvailableFlag(e.target.checked);
                    }}
                    control={<IOSSwitch sx={{ m: 1 }} available={available} />}
                    label="Whitelist Available"
                  />
                  <TextField
                    sx={{ flex: "1" }}
                    value={apy}
                    onChange={(e) => {
                      setAPY(e.target.value);
                    }}
                    id="outlined-size-small"
                    placeholder="please input the apy"
                    defaultValue=""
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                  />
                  <LoadingButton
                    size="small"
                    loading={loading}
                    variant="outlined"
                    sx={{ flex: "1", minWidth: "150px" }}
                    className="deposit-button"
                    onClick={updateAPY}
                  >
                    Set the APY
                  </LoadingButton>
                </Box>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {withdrawlist
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.code}
                              >
                                {columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      {column.id === "amount"
                                        ? value.toFixed(7)
                                        : value}
                                    </TableCell>
                                  );
                                })}
                                <TableCell>
                                  <IconButton
                                    onClick={() => {
                                      checkedWithdraw(row);
                                    }}
                                    color="secondary"
                                    aria-label="add an alarm"
                                  >
                                    <DoneOutlineIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={withdrawlist.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </Box>
            ) : (
              <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box noValidate sx={{ mt: 1 }}>
                      <TextField
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={Verify}
                      >
                        Sign In
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </ThemeProvider>
            )}
          </Box>
        )}
      </header>
    </div>
  );
}

export default App;
