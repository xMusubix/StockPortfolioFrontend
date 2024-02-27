import {
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Slide,
  TextField,
  Theme,
  useTheme,
} from "@mui/material";
import { Box, Stack, styled } from "@mui/system";
import { IoIosRemoveCircle, IoMdAddCircle } from "react-icons/io";
import { BootstrapDialog, DataGridCustomStyle } from "../../_components/styled";
import DataGrid, {
  Column,
  ColumnChooser,
  ColumnFixing,
  Item,
  LoadPanel,
  Scrolling,
  Toolbar,
} from "devextreme-react/data-grid";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect, useState } from "react";
import { TbArrowsExchange } from "react-icons/tb";
import {
  DeleteTrc,
  DeleteTrs,
  LoadSymbolList,
  LoadTrcList,
  LoadTrsList,
  SaveAssets,
  SaveTrc,
  SaveTrs,
} from "../_api/api_stock";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { InputMask } from "primereact/inputmask";
import { IMaskInput } from "react-imask";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { CgLogOff } from "react-icons/cg";
import {
  ExRateMaskCustom,
  NumericFormatTHB,
  NumericFormatUSD,
  ShareMaskCustom,
} from "../../_utils/input_mask";
import { MenuProps, getStyles } from "../../_utils/selete_style";
import { FeedTwoTone } from "@mui/icons-material";
import Decimal from "decimal.js";
import { Transition } from "@/app/_utils/dialog_utils";

export const AssetsTransactionDialog = (props: any) => {
  const assetsId = props.assets.id;
  const marketSymbol = props.assets.marketSymbol;
  const symbol = props.assets.symbol;
  const [tableData, setTableData] = useState([]);
  const [addTransactionStockDialogState, setAddTransactionStockDialogState] =
    useState(false);

  useEffect(() => {
    LoadTrsList(marketSymbol, setTableData);
  }, [props.transactionDialogState, props.assets]);

  const onSuccess = () => {
    LoadTrsList(marketSymbol, setTableData);
  };

  const RenderShareCell = (rowData: any) => {
    const displayValue = rowData.displayValue;
    return displayValue
      ? displayValue.toLocaleString(undefined, {
          minimumFractionDigits: 7,
          maximumFractionDigits: 7,
        })
      : null;
  };

  const RenderFeeCell = (rowData: any) => {
    const displayValue = rowData.displayValue;
    return displayValue
      ? displayValue.toLocaleString(undefined, {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        })
      : null;
  };

  const RenderTransctionActionCell = (rowData: any) => {
    return (
      <IconButton
        sx={{ padding: "5px" }}
        onClick={() => {
          DeleteTrs(rowData.data.id, marketSymbol, onSuccess);
        }}
      >
        <IoIosRemoveCircle size={25} color="red" />
      </IconButton>
    );
  };

  return (
    <BootstrapDialog
      onClose={() => props.setTransactionDialogState(false)}
      aria-labelledby="customized-dialog-title"
      open={props.transactionDialogState}
      TransitionComponent={Transition}
      fullWidth={true}
      maxWidth="md"
      sx={{
        "& .MuiPaper-root": { borderRadius: "8px" },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <Stack
          direction="row"
          spacing={6}
          justifyContent="space-between"
          alignItems="center"
        >
          <div>Transaction of {symbol}</div>
          <div style={{ marginRight: 40 }} />
          <div>
            <Button
              variant="contained"
              startIcon={<IoMdAddCircle />}
              sx={{
                "&.MuiButtonBase-root": {
                  backgroundColor: "#42a5f5",
                },
                "&.MuiButtonBase-root:hover": {
                  backgroundColor: "#b3ffc0",
                },
              }}
              onClick={() => setAddTransactionStockDialogState(true)}
            >
              Add Transaction
            </Button>
          </div>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <div className="mb-5">
          <Box
            sx={{
              display: "grid",
            }}
          >
            <Card>
              <CardContent>
                <Box>
                  <DataGridCustomStyle
                    id="gridContainer"
                    dataSource={tableData}
                    columnAutoWidth={true}
                    keyExpr="id"
                    allowColumnReordering={true}
                    showBorders={false}
                    showRowLines={true}
                    showColumnLines={false}
                    height={600}
                  >
                    <Column
                      caption="Action"
                      minWidth={60}
                      alignment="center"
                      cellRender={RenderTransctionActionCell}
                    />
                    <Column
                      caption="Date"
                      minWidth={150}
                      alignment="center"
                      dataField="date"
                      dataType="date"
                      format="dd/MM/yyyy"
                    />
                    <Column
                      caption="Type"
                      minWidth={100}
                      alignment="center"
                      dataField="type"
                    />
                    <Column
                      caption="Shares"
                      minWidth={160}
                      alignment="center"
                      dataField="share"
                      cellRender={RenderShareCell}
                    />
                    <Column
                      caption="Price"
                      minWidth={100}
                      alignment="center"
                      dataField="price"
                    />
                    <Column
                      caption="Fee"
                      minWidth={100}
                      alignment="center"
                      dataField="fee"
                      cellRender={RenderFeeCell}
                    />
                  </DataGridCustomStyle>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </div>
      </DialogContent>
      <AddTransactionStockDialog
        addTransactionStockDialogState={addTransactionStockDialogState}
        setAddTransactionStockDialogState={setAddTransactionStockDialogState}
        marketSymbol={marketSymbol}
        onSuccess={onSuccess}
      />
    </BootstrapDialog>
  );
};

export const AddTransactionStockDialog = (props: any) => {
  const [date, setDate] = useState<string | null>(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [type, setType] = useState("Buy");
  const [share, setShare] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [fee, setFee] = useState<string>("0.01");

  useEffect(() => {
    if (price !== "") {
      if (type !== "Dividend" && share !== "") {
        var fee = new Decimal(0.0);
        let priceValue = new Decimal(price);
        let shareValue = new Decimal(share);
        fee = priceValue.times(shareValue);
        Decimal.set({ precision: 1, rounding: Decimal.ROUND_UP });
        fee = fee.times(0.0015);
        Decimal.set({ precision: 4, rounding: Decimal.ROUND_DOWN });
        fee = fee.plus(fee.times(0.07)).minus(0.0001);
        setFee(fee.toFixed(4, Decimal.ROUND_DOWN));
      } else {
        var fee = new Decimal(0.0);
        let priceValue = new Decimal(price);
        fee = priceValue.times(0.15);
        setFee(fee.toFixed(2, Decimal.ROUND_DOWN));
      }
    }
  }, [price, share]);

  useEffect(() => {
    if (type === "Dividend") {
      setShare("");
    }
  }, [type]);

  const saveTrs = () => {
    setShare("");
    setPrice("");
    setFee("0.01");
    SaveTrs(
      {
        marketSymbol: props.marketSymbol,
        date: date,
        type: type,
        share: share ? share : "0",
        price: price,
        fee: fee,
      },
      props.onSuccess
    );
  };

  useEffect(() => {
    setShare("");
    setPrice("");
    setFee("0.01");
    setType("Buy");
  }, [props.addTransactionStockDialogState]);

  return (
    <BootstrapDialog
      onClose={() => {
        props.setAddTransactionStockDialogState(false);
      }}
      aria-labelledby="customized-dialog-title"
      open={props.addTransactionStockDialogState}
      TransitionComponent={Transition}
      fullWidth={true}
      maxWidth="sm"
      sx={{
        "& .MuiPaper-root": { borderRadius: "8px" },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <p className="text-[20px]">Add Assets</p>
      </DialogTitle>
      <DialogContent>
        <div className="mb-5">
          <Box
            sx={{
              display: "grid",
            }}
            alignItems="center"
            justifyContent="center"
          >
            <Stack spacing={3} alignItems="center" sx={{ marginTop: 2 }}>
              <FormControl fullWidth>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="th"
                >
                  <DesktopDatePicker
                    label="Exchange Date"
                    defaultValue={dayjs(new Date())}
                    onChange={(newDate) => {
                      const formatDate = newDate
                        ? dayjs(newDate).format("YYYY-MM-DD")
                        : "";
                      setDate(formatDate);
                    }}
                    format="DD/MM/YYYY"
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="type">Type</InputLabel>
                <Select
                  value={type}
                  label="Type"
                  onChange={(event) => setType(event.target.value as string)}
                  defaultValue="Buy"
                >
                  <MenuItem value={"Buy"}>Buy</MenuItem>
                  <MenuItem value={"Sell"}>Sell</MenuItem>
                  <MenuItem value={"Dividend"}>Dividend</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth variant="standard">
                <TextField
                  label="Share"
                  value={share}
                  onChange={(event) =>
                    setShare(
                      isNaN(parseFloat(event.target.value))
                        ? ""
                        : event.target.value
                    )
                  }
                  disabled={type === "Dividend" ? true : false}
                  name="numberformat"
                  id="share"
                  InputProps={{
                    inputComponent: ShareMaskCustom as any,
                  }}
                  variant="outlined"
                />
              </FormControl>
              <Stack
                direction="row"
                spacing={2}
                sx={{ "&.MuiStack-root": { width: "360px !important" } }}
              >
                <FormControl variant="standard">
                  <TextField
                    label="Price"
                    value={price}
                    onChange={(event) =>
                      setPrice(
                        isNaN(parseFloat(event.target.value))
                          ? ""
                          : event.target.value
                      )
                    }
                    name="numberformat"
                    id="price"
                    InputProps={{
                      inputComponent: NumericFormatUSD as any,
                    }}
                    variant="outlined"
                  />
                </FormControl>

                <FormControl variant="standard">
                  <TextField
                    label="Fee"
                    value={fee}
                    onChange={(event) =>
                      setFee(
                        isNaN(parseFloat(event.target.value))
                          ? ""
                          : event.target.value
                      )
                    }
                    name="numberformat"
                    id="fee"
                    InputProps={{
                      inputComponent: NumericFormatUSD as any,
                    }}
                    variant="outlined"
                  />
                </FormControl>
              </Stack>
              <div style={{ widows: 100, justifySelf: "center" }}>
                <Button
                  variant="contained"
                  startIcon={<IoMdAddCircle />}
                  sx={{
                    "&.MuiButtonBase-root": {
                      backgroundColor: "#42a5f5",
                    },
                    "&.MuiButtonBase-root:hover": {
                      backgroundColor: "#b3ffc0",
                    },
                  }}
                  onClick={saveTrs}
                >
                  Add Transaction
                </Button>
              </div>
            </Stack>
          </Box>
        </div>
      </DialogContent>
    </BootstrapDialog>
  );
};

export const ExchangeTransactionDialog = (props: any) => {
  const [trcDatas, setTrcDatas] = useState([]);
  const [addExchangeTransactionState, setAddExchangeTransactionState] =
    useState(false);

  useEffect(() => {
    LoadTrcList(setTrcDatas);
  }, [addExchangeTransactionState, props.exchangeTransactionDialogState]);

  const onSuccess = () => {
    LoadTrcList(setTrcDatas);
  };

  const RenderExRateCell = (rowData: any) => {
    const displayValue = rowData.displayValue;
    return displayValue.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const RenderThbCell = (rowData: any) => {
    const displayValue = rowData.displayValue;
    return (
      "฿" +
      displayValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  const RenderUsdCell = (rowData: any) => {
    const displayValue = rowData.displayValue;
    return (
      "$" +
      displayValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  const RenderArrowCell = (rowData: any) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TbArrowsExchange />
      </div>
    );
  };

  const RenderTransctionActionCell = (rowData: any) => {
    return (
      <IconButton
        sx={{ padding: "5px" }}
        onClick={() => {
          DeleteTrc(rowData.data.id, onSuccess);
        }}
      >
        <IoIosRemoveCircle size={25} color="red" />
      </IconButton>
    );
  };

  return (
    <BootstrapDialog
      onClose={() => props.setExchangeTransactionDialogState(false)}
      aria-labelledby="customized-dialog-title"
      open={props.exchangeTransactionDialogState}
      TransitionComponent={Transition}
      fullWidth={true}
      maxWidth="md"
      sx={{
        "& .MuiPaper-root": { borderRadius: "8px" },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <Stack
          direction="row"
          spacing={6}
          justifyContent="space-between"
          alignItems="center"
        >
          <div>Transaction of Exchange</div>
          <div style={{ marginRight: 40 }} />
          <div>
            <Button
              variant="contained"
              startIcon={<IoMdAddCircle />}
              sx={{
                "&.MuiButtonBase-root": {
                  backgroundColor: "#42a5f5",
                },
                "&.MuiButtonBase-root:hover": {
                  backgroundColor: "#b3ffc0",
                },
              }}
              onClick={() => setAddExchangeTransactionState(true)}
            >
              Add Transaction
            </Button>
          </div>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <div className="mb-5">
          <Box
            sx={{
              display: "grid",
            }}
          >
            <Card>
              <CardContent>
                <Box>
                  <DataGridCustomStyle
                    id="gridContainer"
                    dataSource={trcDatas}
                    columnAutoWidth={true}
                    keyExpr="id"
                    allowColumnReordering={true}
                    showBorders={false}
                    showRowLines={true}
                    showColumnLines={false}
                    height={600}
                  >
                    <Column
                      caption="Action"
                      minWidth={60}
                      alignment="center"
                      cellRender={RenderTransctionActionCell}
                    />
                    <Column
                      caption="Date"
                      minWidth={150}
                      alignment="center"
                      dataField="date"
                      dataType="date"
                      format="dd/MM/yyyy"
                    />
                    <Column
                      caption="Type"
                      minWidth={100}
                      alignment="center"
                      dataField="type"
                    />
                    <Column
                      caption="Exchange Rate"
                      minWidth={160}
                      alignment="center"
                      dataField="exRate"
                      cellRender={RenderExRateCell}
                    />
                    <Column
                      caption="THB"
                      minWidth={40}
                      alignment="center"
                      dataField="thb"
                      cellRender={RenderThbCell}
                    />
                    <Column
                      minWidth={50}
                      width={50}
                      alignment="center"
                      cellRender={RenderArrowCell}
                    />
                    <Column
                      caption="USD"
                      minWidth={40}
                      alignment="center"
                      dataField="usd"
                      cellRender={RenderUsdCell}
                    />
                  </DataGridCustomStyle>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </div>
      </DialogContent>
      <AddExchangeTransactionDialog
        addExchangeTransactionState={addExchangeTransactionState}
        setAddExchangeTransactionState={setAddExchangeTransactionState}
        onSuccess={onSuccess}
      />
    </BootstrapDialog>
  );
};

export const AddExchangeTransactionDialog = (props: any) => {
  const [exchangeDate, setExchangeDate] = useState<string | null>(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [type, setType] = useState("ExchangeToUSD");
  const [exRate, setExRate] = useState<number | string>();
  const [thb, setThb] = useState<number | string>();
  const [usd, setUsd] = useState<number | string>();

  const saveTrc = () => {
    setExRate("");
    setThb("");
    setUsd("");
    SaveTrc(
      {
        date: exchangeDate,
        type: type,
        exRate: exRate,
        thb: thb,
        usd: usd,
      },
      props.onSuccess
    );
  };

  useEffect(() => {
    setExRate("");
    setThb("");
    setUsd("");
  }, [props.addExchangeTransactionState]);

  return (
    <BootstrapDialog
      onClose={() => {
        props.setAddExchangeTransactionState(false);
      }}
      aria-labelledby="customized-dialog-title"
      open={props.addExchangeTransactionState}
      TransitionComponent={Transition}
      fullWidth={true}
      maxWidth="sm"
      sx={{
        "& .MuiPaper-root": { borderRadius: "8px" },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <p className="text-[20px]">Add Assets</p>
      </DialogTitle>
      <DialogContent>
        <div className="mb-5">
          <Box
            sx={{
              display: "grid",
            }}
            alignItems="center"
            justifyContent="center"
          >
            <Stack spacing={3} alignItems="center" sx={{ marginTop: 2 }}>
              <FormControl fullWidth>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="th"
                >
                  <DesktopDatePicker
                    label="Exchange Date"
                    defaultValue={dayjs(new Date())}
                    onChange={(newDate) => {
                      const formatDate = newDate
                        ? dayjs(newDate).format("YYYY-MM-DD")
                        : "";
                      setExchangeDate(formatDate);
                    }}
                    format="DD/MM/YYYY"
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Type"
                  onChange={(event) => setType(event.target.value as string)}
                  defaultValue="ExchangeToUSD"
                >
                  <MenuItem value={"ExchangeToUSD"}>Exchange To USD</MenuItem>
                  <MenuItem value={"ExchangeToTHB"}>Exchange To THB</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth variant="standard">
                <TextField
                  label="Exchange Rate"
                  value={exRate}
                  onChange={(event) =>
                    setExRate(
                      isNaN(parseFloat(event.target.value))
                        ? ""
                        : event.target.value
                    )
                  }
                  name="numberformat"
                  id="exchange-rate"
                  InputProps={{
                    inputComponent: ExRateMaskCustom as any,
                  }}
                  variant="outlined"
                />
              </FormControl>
              <Stack
                direction="row"
                spacing={2}
                sx={{ "&.MuiStack-root": { width: "360px !important" } }}
              >
                <FormControl variant="standard">
                  <TextField
                    label="THB"
                    value={thb}
                    onChange={(event) =>
                      setThb(
                        isNaN(parseFloat(event.target.value))
                          ? ""
                          : event.target.value
                      )
                    }
                    name="numberformat"
                    id="thb"
                    InputProps={{
                      inputComponent: NumericFormatTHB as any,
                    }}
                    variant="outlined"
                  />
                </FormControl>

                <FormControl variant="standard">
                  <TextField
                    label="USD"
                    value={usd}
                    onChange={(event) =>
                      setUsd(
                        isNaN(parseFloat(event.target.value))
                          ? ""
                          : event.target.value
                      )
                    }
                    name="numberformat"
                    id="usd"
                    InputProps={{
                      inputComponent: NumericFormatUSD as any,
                    }}
                    variant="outlined"
                  />
                </FormControl>
              </Stack>
              <div style={{ widows: 100, justifySelf: "center" }}>
                <Button
                  variant="contained"
                  startIcon={<IoMdAddCircle />}
                  sx={{
                    "&.MuiButtonBase-root": {
                      backgroundColor: "#42a5f5",
                    },
                    "&.MuiButtonBase-root:hover": {
                      backgroundColor: "#b3ffc0",
                    },
                  }}
                  onClick={saveTrc}
                >
                  Add Transaction
                </Button>
              </div>
            </Stack>
          </Box>
        </div>
      </DialogContent>
    </BootstrapDialog>
  );
};

export const AddAssetsDialog = (props: any) => {
  const theme = useTheme();
  const [symbolList, setSymbolList] = useState<string[]>([]);
  const [selectSymbolList, setSelectSymbolList] = useState<string[]>([]);

  useEffect(() => {
    LoadSymbolList(setSymbolList);
  }, [props.addAssetsDialogState]);

  const onSuccess = () => {
    setSelectSymbolList([]);
    LoadSymbolList(setSymbolList);
    props.LoadAssets();
  };

  const handleChange = (event: SelectChangeEvent<typeof symbolList>) => {
    const {
      target: { value },
    } = event;
    setSelectSymbolList(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <BootstrapDialog
      onClose={() => {
        setSelectSymbolList([]);
        props.setAddAssetsDialogState(false);
      }}
      aria-labelledby="customized-dialog-title"
      open={props.addAssetsDialogState}
      TransitionComponent={Transition}
      fullWidth={true}
      maxWidth="sm"
      sx={{
        "& .MuiPaper-root": { borderRadius: "8px" },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <p className="text-[20px]">Add Assets</p>
      </DialogTitle>
      <DialogContent>
        <div className="mb-5">
          <Box
            sx={{
              display: "grid",
            }}
            alignItems="center"
            justifyContent="center"
          >
            <FormControl sx={{ m: 1, width: 500 }}>
              <InputLabel id="demo-multiple-chip-label">Symbol</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selectSymbolList}
                onChange={handleChange}
                input={
                  <OutlinedInput id="select-multiple-chip" label="Symbol" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {symbolList.map((symbol) => (
                  <MenuItem
                    key={symbol}
                    value={symbol}
                    style={getStyles(symbol, symbolList, theme)}
                  >
                    {symbol}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{ widows: 100, justifySelf: "center" }}>
              <Button
                variant="contained"
                startIcon={<IoMdAddCircle />}
                sx={{
                  "&.MuiButtonBase-root": {
                    backgroundColor: "#42a5f5",
                  },
                  "&.MuiButtonBase-root:hover": {
                    backgroundColor: "#b3ffc0",
                  },
                }}
                onClick={() => SaveAssets(selectSymbolList, onSuccess)}
              >
                Add Assets
              </Button>
            </div>
          </Box>
        </div>
      </DialogContent>
    </BootstrapDialog>
  );
};
