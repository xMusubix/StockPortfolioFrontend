"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Slide,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GainTable } from "./_components/gain_table";
import { SummeryOtherDetails, TotalHolding } from "./_components/summary";
import DataGrid, {
  Column,
  ColumnChooser,
  ColumnFixing,
  Item,
  LoadPanel,
  Scrolling,
  Toolbar,
} from "devextreme-react/data-grid";
import { styled } from "@mui/system";
import { FormatValue, ReturnDetailsNoText } from "./_components/details";
import { FiRefreshCw } from "react-icons/fi";
import { IoMdAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { forwardRef, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { DataGridCustomStyle } from "./_components/styled";
import {
  AddAssetsDialog,
  AssetsTransactionDialog,
  ExchangeTransactionDialog,
} from "./_components/dialog";
import { AssetsTable } from "./_components/assets_table";

const summaryData = {
  totalUsd: 1234.0,
  usdPercent: 18.13,
  usdValue: 6306.39,
  totalThb: 11234.0,
  thbPercent: 22.13,
  thbValue: 10000.39,
};

const otherData = {
  dailyPercent: 18.13,
  dailyValue: 6306.39,
  annualDividendYield: "1.58%",
  avgExRate: 34.63,
  exRate: 35.63,
};

const gainData = [
  { symbol: "AAPL", percent: 0.3, value: 1.3 },
  { symbol: "TSLA", percent: -0.5, value: -1.5 },
  { symbol: "TSLA", percent: 0, value: 0 },
  { symbol: "TSLA", percent: -0.3, value: -1.3 },
  { symbol: "TSLA", percent: -0.3, value: -1.3 },
  { symbol: "AAPL", percent: 0.3, value: 1.3 },
  { symbol: "TSLA", percent: -0.3, value: -1.3 },
  { symbol: "TSLA", percent: -0.3, value: -1.3 },
];

const loseData = [
  { symbol: "AAPL", percent: 0.3, value: 1.3 },
  { symbol: "TSLA", percent: -0.3, value: -1.3 },
  { symbol: "TSLA", percent: -0.3, value: -1.3 },
  { symbol: "TSLA", percent: -0.3, value: -1.3 },
  { symbol: "TSLA", percent: -0.3, value: -1.3 },
  { symbol: "AAPL", percent: 0.3, value: 1.3 },
  { symbol: "TSLA", percent: -0.3, value: -1.3 },
  { symbol: "TSLA", percent: -0.3, value: -1.3 },
];

const summaryAssets = {
  updateTime: "21/02/2024 21:51:20",
  assetsCount: 54,
  target: 100,
  actual: 90,
  minScore: 0,
  maxScore: 10,
};

const mockAssetsData = [
  {
    id: "1",
    symbol: "AAPL",
    industryName: "industryName",
    sectorName: "sectorName",
    score: 10,
    state: "up",
    line: "100%",
    totalShare: 1000,
    averagePrice: 5000,
    lastPrice: 80,
    actualValue: 5000,
    costGain: 20.56,
    costGainValue: 20,
    costValue: 165,
    lastPriceChangePercentage: 3.25,
    dividendYieldPercentage: 4,
    different: 5000,
    target: 50,
    actualPercentage: 50,
    ytdPrice: 60,
    wkPrice1: 55,
    moPrice1: 58,
    moPrice3: 62,
    moPrice6: 65,
    yearPrice1: 70,
    yearHigh: 75,
    yearLow: 45,
    percentYear: 70,
    note: "Mock note for testing purposes",
  },
  {
    id: "2",
    symbol: "TSLA",
    industryName: "industryName",
    sectorName: "sectorName",
    score: 3,
    state: "up",
    line: "100%",
    totalShare: 1000,
    averagePrice: 5000,
    lastPrice: 80,
    actualValue: 5000,
    costGain: 150.98,
    costGainValue: 1000,
    costValue: 985,
    lastPriceChangePercentage: 61.25,
    dividendYieldPercentage: 4,
    different: 5000,
    target: 50,
    actualPercentage: 50,
    ytdPrice: 60,
    wkPrice1: 55,
    moPrice1: 58,
    moPrice3: 62,
    moPrice6: 65,
    yearPrice1: 70,
    yearHigh: 75,
    yearLow: 45,
    percentYear: 70,
    note: "Mock note for testing purposes",
  },
  {
    id: "3",
    symbol: "NVDA",
    industryName: "industryName",
    sectorName: "sectorName",
    score: 8,
    state: "up",
    line: "100%",
    totalShare: 1000,
    averagePrice: 5000,
    lastPrice: 80,
    actualValue: 5000,
    costGain: -100.56,
    costGainValue: -1000,
    costValue: 100,
    lastPriceChangePercentage: 8.25,
    dividendYieldPercentage: 4,
    different: 5000,
    target: 50,
    actualPercentage: 50,
    ytdPrice: 60,
    wkPrice1: -55,
    moPrice1: 58,
    moPrice3: 62,
    moPrice6: -65,
    yearPrice1: 70,
    yearHigh: 750,
    yearLow: 45,
    percentYear: 524,
    note: "Mock note for testing purposes",
  },
];

const StockPortfolio = (props: any) => {
  const [exchangeTransactionDialogState, setExchangeTransactionDialogState] =
    useState(false);
  const [transactionDialogState, setTransactionDialogState] = useState(false);
  const [addAssetsDialogState, setAddAssetsDialogState] = useState(false);
  const [assetsToView, setAssetsToView] = useState(null);

  const openTransactionDialog = (assetsId: any) => {
    setAssetsToView(assetsId);
    setTransactionDialogState(true);
  };

  return (
    <div>
      <Accordion
        defaultExpanded
        sx={{
          marginBottom: "20px",
          borderRadius: "8px",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            minHeight: "50px !important",
            height: "50px !important",
          }}
        >
          <Typography>Summary</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box color="white">
            <Grid
              container
              spacing={1}
              sx={{
                width: "100%",
                padding: "0px 20px",
              }}
            >
              <Grid
                item
                xs={5}
                sx={{
                  width: "100%",
                  placeSelf: "center",
                }}
              >
                <TotalHolding data={summaryData} />
              </Grid>
              <Grid
                item
                xs={7}
                sx={{
                  width: "100%",
                  placeSelf: "center",
                }}
              >
                <SummeryOtherDetails data={otherData} />
              </Grid>
              <Grid
                item
                xs={12}
                alignItems="center"
                textAlign="center"
                sx={{
                  marginTop: 1,
                  borderTop: "3px dashed #8B8B8B",
                }}
              >
                <GainTable
                  data={[
                    { title: "Top Gainers", tableData: gainData },
                    { title: "Top Losers", tableData: loseData },
                  ]}
                />
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
      <div className="mb-5">
        <Box
          sx={{
            display: "grid",
          }}
        >
          <Card>
            <CardContent>
              <Box>
                <AssetsTable
                  mockAssetsData={mockAssetsData}
                  summaryAssets={summaryAssets}
                  setExchangeTransactionDialogState={
                    setExchangeTransactionDialogState
                  }
                  setAddAssetsDialogState={setAddAssetsDialogState}
                  openTransactionDialog={openTransactionDialog}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </div>
      <AssetsTransactionDialog
        assetsId={assetsToView}
        transactionDialogState={transactionDialogState}
        setTransactionDialogState={setTransactionDialogState}
      />
      <ExchangeTransactionDialog
        exchangeTransactionDialogState={exchangeTransactionDialogState}
        setExchangeTransactionDialogState={setExchangeTransactionDialogState}
      />
      <AddAssetsDialog
        addAssetsDialogState={addAssetsDialogState}
        setAddAssetsDialogState={setAddAssetsDialogState}
      />
    </div>
  );
};

export default StockPortfolio;
