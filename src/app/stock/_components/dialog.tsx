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
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Slide,
  Theme,
  useTheme,
} from "@mui/material";
import { Box, Stack, styled } from "@mui/system";
import { IoIosRemoveCircle, IoMdAddCircle } from "react-icons/io";
import { BootstrapDialog, DataGridCustomStyle } from "./styled";
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
import { forwardRef, useState } from "react";
import { TbArrowsExchange } from "react-icons/tb";

const mockTransactionData = [
  {
    id: 1,
    date: "20/02/2024",
    type: "Buy",
    shares: 0.00000005,
    price: 30.59,
    fee: 0.01,
  },
  {
    id: 2,
    date: "21/02/2024",
    type: "Sell",
    shares: 0.00000006,
    price: 31.72,
    fee: 0.02,
  },
  {
    id: 3,
    date: "22/02/2024",
    type: "Buy",
    shares: 0.00000007,
    price: 32.85,
    fee: 0.03,
  },
  {
    id: 4,
    date: "23/02/2024",
    type: "Sell",
    shares: 0.00000008,
    price: 33.98,
    fee: 0.04,
  },
  {
    id: 5,
    date: "24/02/2024",
    type: "Buy",
    shares: 0.00000009,
    price: 35.11,
    fee: 0.05,
  },
  {
    id: 6,
    date: "25/02/2024",
    type: "Sell",
    shares: 0.0000001,
    price: 36.24,
    fee: 0.06,
  },
  {
    id: 7,
    date: "26/02/2024",
    type: "Buy",
    shares: 0.00000011,
    price: 37.37,
    fee: 0.07,
  },
  {
    id: 8,
    date: "27/02/2024",
    type: "Sell",
    shares: 0.00000012,
    price: 38.5,
    fee: 0.08,
  },
  {
    id: 9,
    date: "28/02/2024",
    type: "Buy",
    shares: 0.00000013,
    price: 39.63,
    fee: 0.09,
  },
  {
    id: 10,
    date: "29/02/2024",
    type: "Sell",
    shares: 0.00000014,
    price: 40.76,
    fee: 0.1,
  },
  {
    id: 11,
    date: "01/03/2024",
    type: "Buy",
    shares: 0.00000015,
    price: 41.89,
    fee: 0.11,
  },
  {
    id: 12,
    date: "02/03/2024",
    type: "Sell",
    shares: 0.00000016,
    price: 43.02,
    fee: 0.12,
  },
  {
    id: 13,
    date: "03/03/2024",
    type: "Buy",
    shares: 0.00000017,
    price: 44.15,
    fee: 0.13,
  },
  {
    id: 14,
    date: "04/03/2024",
    type: "Sell",
    shares: 0.00000018,
    price: 45.28,
    fee: 0.14,
  },
  {
    id: 15,
    date: "05/03/2024",
    type: "Buy",
    shares: 0.00000019,
    price: 46.41,
    fee: 0.15,
  },
  {
    id: 16,
    date: "06/03/2024",
    type: "Sell",
    shares: 0.0000002,
    price: 47.54,
    fee: 0.16,
  },
  {
    id: 17,
    date: "07/03/2024",
    type: "Buy",
    shares: 0.00000021,
    price: 48.67,
    fee: 0.17,
  },
  {
    id: 18,
    date: "08/03/2024",
    type: "Sell",
    shares: 0.00000022,
    price: 49.8,
    fee: 0.18,
  },
  {
    id: 19,
    date: "09/03/2024",
    type: "Buy",
    shares: 0.00000023,
    price: 50.93,
    fee: 0.19,
  },
  {
    id: 20,
    date: "10/03/2024",
    type: "Sell",
    shares: 0.00000024,
    price: 52.06,
    fee: 0.2,
  },
];

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AssetsTransactionDialog = (props: any) => {
  const assetsId = props.assetsId;
  const RenderShareCell = (rowData: any) => {
    const displayValue = rowData.displayValue;
    return displayValue.toLocaleString(undefined, {
      minimumFractionDigits: 7,
      maximumFractionDigits: 7,
    });
  };

  const RenderTransctionActionCell = (rowData: any) => {
    return (
      <IconButton sx={{ padding: "5px" }}>
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
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <Stack
          direction="row"
          spacing={6}
          justifyContent="space-between"
          alignItems="center"
        >
          <div>Transaction of {assetsId}</div>
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
                    dataSource={mockTransactionData}
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
                      dataField="shares"
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
                    />
                  </DataGridCustomStyle>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </div>
      </DialogContent>
    </BootstrapDialog>
  );
};

const mockCashTransactionData = [
  {
    id: 1,
    date: "20/02/2024",
    type: "Buy",
    exRate: 0.00000005,
    thb: 30.59,
    usd: 0.01,
  },
  {
    id: 2,
    date: "21/02/2024",
    type: "Sell",
    exRate: 0.00000006,
    thb: 31.72,
    usd: 0.02,
  },
  {
    id: 3,
    date: "22/02/2024",
    type: "Buy",
    exRate: 0.00000007,
    thb: 32.85,
    usd: 0.03,
  },
  {
    id: 4,
    date: "23/02/2024",
    type: "Sell",
    exRate: 0.00000008,
    thb: 33.98,
    usd: 0.04,
  },
  {
    id: 5,
    date: "24/02/2024",
    type: "Buy",
    exRate: 0.00000009,
    thb: 35.11,
    usd: 0.05,
  },
  {
    id: 6,
    date: "25/02/2024",
    type: "Sell",
    exRate: 0.0000001,
    thb: 36.24,
    usd: 0.06,
  },
  {
    id: 7,
    date: "26/02/2024",
    type: "Buy",
    exRate: 0.00000011,
    thb: 37.37,
    usd: 0.07,
  },
  {
    id: 8,
    date: "27/02/2024",
    type: "Sell",
    exRate: 0.00000012,
    thb: 38.5,
    usd: 0.08,
  },
  {
    id: 9,
    date: "28/02/2024",
    type: "Buy",
    exRate: 0.00000013,
    thb: 39.63,
    usd: 0.09,
  },
  {
    id: 10,
    date: "29/02/2024",
    type: "Sell",
    exRate: 0.00000014,
    thb: 40.76,
    usd: 0.1,
  },
  {
    id: 11,
    date: "01/03/2024",
    type: "Buy",
    exRate: 0.00000015,
    thb: 41.89,
    usd: 0.11,
  },
  {
    id: 12,
    date: "02/03/2024",
    type: "Sell",
    exRate: 0.00000016,
    thb: 43.02,
    usd: 0.12,
  },
  {
    id: 13,
    date: "03/03/2024",
    type: "Buy",
    exRate: 0.00000017,
    thb: 44.15,
    usd: 0.13,
  },
  {
    id: 14,
    date: "04/03/2024",
    type: "Sell",
    exRate: 0.00000018,
    thb: 45.28,
    usd: 0.14,
  },
  {
    id: 15,
    date: "05/03/2024",
    type: "Buy",
    exRate: 0.00000019,
    thb: 46.41,
    usd: 0.15,
  },
  {
    id: 16,
    date: "06/03/2024",
    type: "Sell",
    exRate: 0.0000002,
    thb: 47.54,
    usd: 0.16,
  },
  {
    id: 17,
    date: "07/03/2024",
    type: "Buy",
    exRate: 0.00000021,
    thb: 48.67,
    usd: 0.17,
  },
  {
    id: 18,
    date: "08/03/2024",
    type: "Sell",
    exRate: 36.5,
    thb: 49.8,
    usd: 0.18,
  },
  {
    id: 19,
    date: "09/03/2024",
    type: "Buy",
    exRate: 36.5,
    thb: 50.93,
    usd: 0.19,
  },
  {
    id: 20,
    date: "10/03/2024",
    type: "Sell",
    exRate: 36.5,
    thb: 52.06,
    usd: 0.2,
  },
];

export const ExchangeTransactionDialog = (props: any) => {
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
      <IconButton sx={{ padding: "5px" }}>
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
                    dataSource={mockCashTransactionData}
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
    </BootstrapDialog>
  );
};

const symbols = [
  "AAPL",
  "TSLA",
  "GOOGL",
  "MSFT",
  "AMZN",
  "FB",
  "NVDA",
  "NFLX",
  "INTC",
  "ADBE",
  "CRM",
  "PYPL",
  "QCOM",
  "CSCO",
  "AMD",
  "AMGN",
  "COST",
  "SBUX",
  "TXN",
  "AVGO",
  "BKNG",
  "CMCSA",
  "GILD",
  "JD",
  "MU",
  "INTU",
  "ATVI",
  "TMUS",
  "ADI",
  "BIIB",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 7 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

function getStyles(symbol: string, symbols: readonly string[], theme: Theme) {
  return {
    fontWeight:
      symbols.indexOf(symbol) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const AddAssetsDialog = (props: any) => {
  const theme = useTheme();
  const [symbloList, setSymbloList] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof symbloList>) => {
    const {
      target: { value },
    } = event;
    setSymbloList(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <BootstrapDialog
      onClose={() => {
        setSymbloList([]);
        props.setAddAssetsDialogState(false)
    }}
      aria-labelledby="customized-dialog-title"
      open={props.addAssetsDialogState}
      TransitionComponent={Transition}
      fullWidth={true}
      maxWidth="sm"
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
                value={symbloList}
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
                {symbols.map((symbol) => (
                  <MenuItem
                    key={symbol}
                    value={symbol}
                    style={getStyles(symbol, symbols, theme)}
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
