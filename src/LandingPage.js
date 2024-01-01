import logo from "./logo.png";
import "./App.css";
import { Box } from "@mui/system";
import { FaSun, FaMoon } from 'react-icons/fa'
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Select from '@mui/material/Select';
import CustomDropdown from './components/Coindropdown';
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
  IconButton,
  AccordionSummary,
  Container,
  styled,
  Pagination,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
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
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { server_url, whitelist } from "./config";
import { Link } from "react-router-dom";
import { getAddress, sendBtcTransaction } from "sats-connect";




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

const Mstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
  bgcolor: "white",
  borderRadius: "12px",
  boxShadow: 24,
  display: "flex",
};


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#121212",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: "rgb(228, 228, 228)",
  borderRadius: "5px 5px 0px 0px",
}));

const columns = [
  { id: "name", label: "Inscription", minWidth: 170 },
  { id: "code", label: "Time", minWidth: 100 },
  {
    id: "population",
    label: "Price",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Event",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "From",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(name, code, population, size, density) {
  return { name, code, population, size, density };
}

const rows = [
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
  createData(
    "#4239580",
    "12/12/2023, 1:07:27 AM",
    "$24534.98 sats/ordi",
    "Listed",
    "bc1pu...8e6h5"
  ),
];





function App() {


  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  //


  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

  // ------------------
  const [accordin, setAccordin] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpen] = useState(false);
  const [address, setAddress] = useState(null);
  const [curnetwork, setNetwork] = useState(null);
  const [walletConnectModal, setWalletConnectModal] = useState(false);
  const [size, setSize] = useState(0);
  const [unisatInstalled, setUnisatInstalled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [withdrawlist, setWithdrawList] = useState([]);
  const [depositedValue, setDepositedValue] = useState(0);
  const [earn, setEarn] = useState(0);
  const [available, setAvailable] = useState(true);
  const [balance, setBalance] = useState({
    confirmed: 0,
    unconfirmed: 0,
    total: 0,
  });
  const [depositValue, setDepositValue] = useState(0);
  const [withdrawValue, setWithdrawValue] = useState(0);
  const [tvl, setTVL] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedwallet, setSelectedwallet] = useState("unisat");
  // -------------------------

  const handleOpen = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handleClick = async () => {
    console.log(address, "address---");
    if (connected === false) {
      setOpen(true);
    } else {
      setAnchorEl(event.target);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //   -------------------------------

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

  const ConnectWallet = async () => {
    try {
      const result = await unisat.requestAccounts();
      const balance = await unisat.getBalance();
      setBalance(balance);
      handleAccountsChanged(result);
      setConnected(true);
      setOpen(false);
      setSelectedwallet("unisat");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const XverseWalletConnect = async () => {
    try {
      const getAddressOptions = {
        payload: {
          purposes: ["payment"],
          message: "Address for receiving payments",
          network: {
            // type: "Testnet",
            type: "Mainnet",
          },
        },
        onFinish: (response) => {
          console.log(response);
          setAddress(response.addresses[0].address);
          setConnected(true);
          setOpen(false);
          setSelectedwallet("xverse");
        },
        onCancel: () => toast.error("Request canceled"),
      };

      await getAddress(getAddressOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const OkxWalletConnect = async () => {
    try {
      if (typeof window.okxwallet === "undefined") {
        toast.error("OKX is not installed!");
      } else {
        const result = await window.okxwallet.bitcoin.connect();
        setAddress(result.address);
        setConnected(true);
        setOpen(false);
        setSelectedwallet("okx");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const LeatherWalletConnect = async () => {
    try {
      const userAddresses = await window.btc?.request("getAddresses");
      const usersNativeSegwitAddress = userAddresses.result.addresses.find(
        (address) => address.type === "p2wpkh"
      );
      setAddress(usersNativeSegwitAddress.address);
      setConnected(true);
      setOpen(false);
      setSelectedwallet("leather");
    } catch (error) {
      toast.error(error.message);
    }
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

  const DisconnectWallet = () => {
    setConnected(false);
    setBalance({
      confirmed: 0,
      unconfirmed: 0,
      total: 0,
    });
    setAccounts([]);
    handleClose();
  };

  const depositCoinonUnisat = async () => {
    if (unisat?._network === "livenet") {
      if (accounts[0]) {
        if (available && whitelist.indexOf(accounts[0]) === -1) {
          toast.error("Sorry, we can`t find you in our whitelist");
        } else {
          if (depositedValue > 0) {
            toast.error(
              <>
                Already Staked!
                <br />
                Please withdraw all and Try again
              </>
            );
          } else {
            if (depositValue >= 0 && depositValue <= 3) {
              if (balance.total / 10 ** 8 >= depositValue) {
                setLoading(true);
                try {
                  let txid = await window.unisat.sendBitcoin(
                    "bc1pzem4hsc4d3pa8yyv5ugp7gjnc5rhmsvrqff6637se5824ata4frspl9py3",
                    Number((depositValue * 100000000).toFixed())
                  );
                  let data = await axios.post(
                    `${server_url}/api/payment/deposit`,
                    {
                      txid,
                      address: accounts[0],
                      amount: depositValue,
                    }
                  );
                  if (data === "exist") {
                    toast.error("Tx Id Already Exist!");
                  } else {
                    setDepositedValue(data.data.value);
                    getBasicInfo();
                    toast.success("Deposit Successed!");
                  }
                  setLoading(false);
                } catch (e) {
                  setLoading(false);
                  toast.error(e.message);
                }
              } else {
                toast.error("Insufficiance the Balance!");
              }
            } else {
              toast.error("Invalid deposit amount");
            }
          }
        }
      } else {
        toast.error("Please connect wallet");
      }
    } else {
      toast.error("please change network to live");
    }
  };

  const depositCoinonXverse = async () => {
    if (address) {
      if (available && whitelist.indexOf(address) !== -1) {
        toast.error("Sorry, we can`t find you in our whitelist");
      } else {
        if (depositedValue > 0) {
          toast.error(
            <>
              Already Staked!
              <br />
              Please withdraw all and Try again
            </>
          );
        } else {
          if (depositValue >= 0 && depositValue <= 3) {
            setLoading(true);
            try {
              const sendBtcOptions = {
                payload: {
                  network: {
                    type: "Mainnet",
                  },
                  recipients: [
                    {
                      address:
                        "bc1pzem4hsc4d3pa8yyv5ugp7gjnc5rhmsvrqff6637se5824ata4frspl9py3",
                      amountSats: BigInt(
                        String(depositValue * 10 ** 8).split(".")[0]
                      ),
                    },
                  ],
                  senderAddress: address,
                },
                onFinish: async (txid) => {
                  let data = await axios.post(
                    `${server_url}/api/payment/deposit`,
                    {
                      txid,
                      address: address,
                      amount: depositValue,
                    }
                  );
                  if (data === "exist") {
                    toast.error("Tx Id Already Exist!");
                  } else {
                    setDepositedValue(data.data.value);
                    getBasicInfo();
                    toast.success("Deposit Successed!");
                  }
                },
                onCancel: () => toast.error("Canceled"),
              };

              await sendBtcTransaction(sendBtcOptions);

              setLoading(false);
            } catch (e) {
              setLoading(false);
              toast.error(e.message);
            }
          } else {
            toast.error("Invalid deposit amount");
          }
        }
      }
    } else {
      toast.error("Please connect wallet");
    }
  };

  const depositCoinonOkx = async () => {
    if (address) {
      if (available && whitelist.indexOf(address) !== -1) {
        toast.error("Sorry, we can`t find you in our whitelist");
      } else {
        if (depositedValue > 0) {
          toast.error(
            <>
              Already Staked!
              <br />
              Please withdraw all and Try again
            </>
          );
        } else {
          if (depositValue >= 0 && depositValue <= 3) {
            setLoading(true);
            try {
              const result = await window.okxwallet.bitcoin.send({
                from: address,
                to: "bc1pzem4hsc4d3pa8yyv5ugp7gjnc5rhmsvrqff6637se5824ata4frspl9py3",
                value: depositValue,
              });

              let data = await axios.post(`${server_url}/api/payment/deposit`, {
                txid: result.txhash,
                address: address,
                amount: depositValue,
              });
              if (data === "exist") {
                toast.error("Tx Id Already Exist!");
              } else {
                setDepositedValue(data.data.value);
                getBasicInfo();
                toast.success("Deposit Successed!");
              }

              setLoading(false);
            } catch (e) {
              setLoading(false);
              toast.error(e.message);
            }
          } else {
            toast.error("Invalid deposit amount");
          }
        }
      }
    } else {
      toast.error("Please connect wallet");
    }
  };

  const depositCoinonLeather = async () => {
    if (address) {
      if (available && whitelist.indexOf(address) !== -1) {
        toast.error("Sorry, we can`t find you in our whitelist");
      } else {
        if (depositedValue > 0) {
          toast.error(
            <>
              Already Staked!
              <br />
              Please withdraw all and Try again
            </>
          );
        } else {
          if (depositValue >= 0 && depositValue <= 3) {
            setLoading(true);
            try {
              const resp = await window.btc?.request("sendTransfer", {
                address:
                  "bc1pzem4hsc4d3pa8yyv5ugp7gjnc5rhmsvrqff6637se5824ata4frspl9py3",
                amount: (depositValue * 10 ** 8).toFixed(7),
              });

              let data = await axios.post(`${server_url}/api/payment/deposit`, {
                txid: resp.result.txid,
                address: address,
                amount: depositValue,
              });
              if (data === "exist") {
                toast.error("Tx Id Already Exist!");
              } else {
                setDepositedValue(data.data.value);
                getBasicInfo();
                toast.success("Deposit Successed!");
              }

              setLoading(false);
            } catch (e) {
              setLoading(false);
              toast.error(e.error.message);
            }
            setLoading(false);
          } else {
            toast.error("Invalid deposit amount");
          }
        }
      }
    } else {
      toast.error("Please connect wallet");
    }
  };

  const depositCoin = () => {
    console.log(selectedwallet);
    if (selectedwallet === "unisat") {
      depositCoinonUnisat();
    } else if (selectedwallet === "xverse") {
      depositCoinonXverse();
    } else if (selectedwallet === "okx") {
      depositCoinonOkx();
    } else if (selectedwallet === "leather") {
      depositCoinonLeather();
    }
  };

  const getValue = async () => {
    const userData = await axios.post(`${server_url}/api/payment/getdata`, {
      address: accounts[0],
    });
    setEarn((Number(userData.data.duringTime) * apy) / 365);
    if (userData.data.data) {
      setDepositedValue(Number(userData.data.data.value.toFixed(7)));
    } else {
      setDepositedValue(0);
    }
  };

  const getAvailableFlag = async () => {
    const data = await axios.get(`${server_url}/api/payment/getavailable`);
    setAvailable(data.data.flag);
  };

  const getTVL = async () => {
    try {
      const data = await axios.get(`${server_url}/api/payment/getTVL`);
      const sum = data.data.reduce((item, a) => item + a.value, 0);
      setTVL(Number(sum.toFixed(7)));
    } catch (error) {
      console.log(error);
    }
  };

  const RequsetWithdraw = async () => {
    if (withdrawValue > 0 && withdrawValue <= depositedValue) {
      const data = await axios.post(`${server_url}/api/payment/request`, {
        address: accounts[0],
        amount: withdrawValue,
      });
      if (data.data === "exist") {
        toast.error("Already sent withdraw request");
      } else {
        toast.success(
          <>
            Withdraw Requset Sent!
            <br />
            Please Wait Admin`s Approve
          </>
        );
      }
    } else {
      toast.error("Invalid Request Amount");
    }
  };

  const getWithdrawlist = async () => {
    const data = await axios.get(`${server_url}/api/payment/getWithdrawlist`);
    setWithdrawList(data.data);
  };

  const [apy, setAPY] = useState(0);

  const getAPY = async () => {
    const data = await axios.get(`${server_url}/api/payment/getAPY`);
    setAPY(data.data.apy);
  };

  useEffect(() => {
    getAPY();
  }, []);

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
        handleAccountsChanged(accounts);
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
    if (accounts[0]) {
      getValue();
    } else {
      setDepositedValue(0);
      setEarn(0);
    }
    getTVL();
    getWithdrawlist();
  }, [accounts]);

  useEffect(() => {
    getAvailableFlag();
  }, []);

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}
    >
      <Toaster />
      <Container className="mainCotainer">
        <Box
          sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
        >
          <Stack
            flexGrow="1"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography className={`logoapp ${isDarkMode ? 'dark' : 'light'}`} sx={{ fontSize: "25px" }}>LOGO</Typography>      
          </Stack>

          {connected &&
            address ===
            "bc1pzem4hsc4d3pa8yyv5ugp7gjnc5rhmsvrqff6637se5824ata4frspl9py3" ? (
            <Link to="/admin">
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                className={`connect-btn ${isDarkMode ? 'dark' : 'light'}`}
                sx={{
                  m: isMobile ? "20px" : "48px",
                  mr: "0px",
                  fontSize: isMobile ? "10px" : "12px",
                }}
                variant="contained"
              >
                Admin Page
              </Button>
              
            </Link>
          ) : (
            <></>
          )}

          {!connected ? (
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              className="connect-btn"
              sx={{
                m: isMobile ? "20px" : "48px",
                fontSize: isMobile ? "10px" : "12px",
                mr: "0px",
              }}
              variant="contained"
              onClick={handleClick}
            >
              {isMobile ? "Connect" : "Connect Wallet"}
            </Button>
          ) : (
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              className="connect-btn"
              sx={{
                m: isMobile ? "20px" : "48px",
                mr: "0px",
                fontSize: isMobile ? "10px" : "12px",
              }}
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
            <MenuItem onClick={handleClose} sx={{ fontSize: "12px" }}>
              {address ? (
                address.slice(0, 6) +
                "..." +
                address.slice(address.length - 4, address.length)
              ) : (
                <></>
              )}
            </MenuItem>
            <MenuItem onClick={DisconnectWallet} sx={{ fontSize: "12px" }}>
              disconnect
            </MenuItem>
         
          </Menu>

          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            {isMobile ? (
              <Box sx={Mstyle}>
                <Stack
                  sx={{
                    flex: "1",
                    bgcolor: "#d3d3d3",
                    borderRadius: "12px",
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
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "5px",
                      }}
                    />{" "}
                    Unisat Wallet
                  </Button>
                  <Button
                    onClick={XverseWalletConnect}
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
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "5px",
                      }}
                    />{" "}
                    Xverse Wallet
                  </Button>
                  <Button
                    onClick={OkxWalletConnect}
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
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "5px",
                      }}
                    />{" "}
                    Okx Wallet
                  </Button>
                  <Button
                    onClick={LeatherWalletConnect}
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
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "5px",
                      }}
                    />{" "}
                    Leather Wallet
                  </Button>
                </Stack>
              </Box>
            ) : (
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
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "5px",
                      }}
                    />{" "}
                    Unisat Wallet
                  </Button>
                  <Button
                    onClick={XverseWalletConnect}
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
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "5px",
                      }}
                    />{" "}
                    Xverse Wallet
                  </Button>
                  <Button
                    onClick={OkxWalletConnect}
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
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "5px",
                      }}
                    />{" "}
                    Okx Wallet
                  </Button>
                  <Button
                    onClick={LeatherWalletConnect}
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
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "5px",
                      }}
                    />{" "}
                    Leather Wallet
                  </Button>
                </Stack>
                <Stack
                  sx={{ flex: "2", borderRadius: "0px 12px 12px 0px", p: 4 }}
                >
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
                    No need to create new accounts and passwords for every
                    website. Just connect your wallet and get going.
                  </Typography>
                  <Typography variant="h6" component="h5" mb={2}>
                    Store your Digital Assets
                  </Typography>
                  <Typography id="modal-modal-description" mb={5}>
                    Send, receive, store, and display your digital assets like
                    NFTs & coins.
                  </Typography>
                </Stack>
              </Box>
            )}
          </Modal>
          <button className="toggle-button" onClick={toggleMode}>
                {isDarkMode ? <FaSun /> : <FaMoon />}
         </button>

        </Box>
        <header
          className="App-header"
          style={{ marginTop: isMobile ? "30px" : "0px" }}
        >
          <Box sx={{ width: "100%" }} className={`gridbox ${isDarkMode ? 'dark' : 'light'}`}>
            <Box>
              <Tabs

                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab className={`sidebtns ${isDarkMode ? 'dark' : 'light'}`} label="Listed" {...a11yProps(0)} />
                <Tab className={`sidebtns ${isDarkMode ? 'dark' : 'light'}`} label="Orders" {...a11yProps(1)} />
                <Tab className={`sidebtns ${isDarkMode ? 'dark' : 'light'}`} label="My Orders" {...a11yProps(2)} />
              </Tabs>
              <CustomDropdown />

              {/* <div dangerouslySetInnerHTML={{ __html: selectHtml }} /> */}
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  // spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  className="gridspace"
                >
                  {Array.from(Array(15)).map((_, index) => (
                    <Grid item xs={15} sm={4} md={4} key={index} className={`ss ${isDarkMode ? 'dark' : 'light'}`}>
                      <Item className="boxtop">
                        <Stack
                          sx={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography className="pill-wrap">ordi</Typography>
                          <Typography className="pill-wrap2">transfer</Typography>
                        </Stack>
                        <Stack>
                          <Typography sx={{ fontSize: "23px" }}>376</Typography>
                        </Stack>
                        <Stack>
                          <Typography className="gridprice"
                            sx={{ fontSize: "23px", color: "#ebb94c" }}
                          >
                            2460
                            <Box
                              component="span"
                              sx={{ color: "grey", fontSize: "17px" }}
                            >
                              sats/ordi
                            </Box>
                          </Typography>
                          <Box
                            component="span"
                            sx={{ color: "grey", fontSize: "14px" }}
                          >
                            $35.87
                          </Box>
                        </Stack>
                      </Item>
                      <Stack sx={{ bgcolor: "#1e1e1e", p: 2 }} className="boxbot">
                        <Stack>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#ebb94c",
                              textAlign: "left",
                              borderBottom: "1px solid #282828",
                              pb: 2,
                            }}
                          >
                            #d3d3d3
                          </Typography>
                        </Stack>
                        <Stack
                          sx={{
                            color: "grey",
                            flexDirection: "row",
                            alignItems: "center",
                            my: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              flexGrow: 1,
                              gap: 1,
                            }}
                          >
                            <img
                              src={btcCoin}
                              alt=""
                              style={{
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                              }}
                            />
                            0.0235
                          </Typography>
                          <Typography>$999.43</Typography>
                        </Stack>
                        <Button
                          variant="outlined"
                          sx={{ border: "1px solid grey" }}
                          className="btn_buy"
                        >
                          Buy
                        </Button>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
                <Stack
                  sx={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 2,
                  }}
                >
                  <Stack spacing={2}>
                    <Pagination count={10} />
                  </Stack>
                </Stack>
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Paper
                sx={{
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <TableContainer sx={{ maxHeight: "640px" }}>
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
                      {rows
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
                                    {value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              No Item
            </CustomTabPanel>
          </Box>
        </header>
      </Container>
      <style jsx>{`
        .gridbox {
          background: ${isDarkMode ? '#161616' : '#ffffff'} !important;
          color: ${isDarkMode ? 'white' : 'black'} !important;
        }

        .sidebtns{
          color: ${isDarkMode ? 'white' : 'black'} !important;
          background: ${isDarkMode ? '#161616' : '#ffffff'} !important;
        }
        
        .App{
          background: ${isDarkMode ? '#161616' : '#ffffff'} !important;
        }

        .ss{
        background: #1C1C1C !important;

          &:hover {
            background: ${isDarkMode ? 'linear-gradient(rgb(255 255 255 / 20%) 0%, #00000021 100%)' : 'linear-gradient(rgb(0 0 0) 100%, rgb(0 0 0) 100%)'} !important;
          }
        }

        .sidebtns.Mui-selected {
          color: ${isDarkMode ? 'white' : 'black'} !important;
        }
        
        .toggle-button {
          background-color: transparent;
          color: ${isDarkMode ? 'white' : 'black'} !important;
          border: none;
          padding: 10px;
          cursor: pointer;
          font-size: 18px;
          padding-left: 20px;
        }

        .logoapp {
          color: ${isDarkMode ? 'white' : 'black'} !important;
        
        }
        .connect-btn {
          background: ${isDarkMode ? 'white' : 'black'} !important;
          color: ${isDarkMode ? 'black' : 'white'} !important;
        }

        .MuiPagination-ul button {
          color: ${isDarkMode ? 'white' : 'black'} !important;
        }

      `}</style>
    </div>
  );
}

export default App;
