"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  LoadAssetsList,
  LoadDashboardData,
  LoadSumTargetBySectorData,
  LoadSummaryAssetsData,
} from "./_api/api_stock";
import { AssetsTable } from "./_components/assets_table";
import {
  AddAssetsDialog,
  AssetsTransactionDialog,
  ExchangeTransactionDialog,
} from "./_components/dialog";
import { GainTable } from "./_components/gain_table";
import {
  SummaryDashboard,
  SummeryOtherDetails,
} from "./_components/summary_dashboard";
import { SummarySectorChart } from "./_components/summary_sector_chart";

type DashboardDataType = {
  totalHoldingUSD: number;
  totalHoldingTHB: number;
  totalCostTHB: number;
  totalCostUSD: number;
  changeUSD: number;
  changeTHB: number;
  changePercentageUSD: number;
  changePercentageTHB: number;
  avgDividendYield: number;
  avgExchangeRate: number;
  exchangeRate: number;
  topGainers: [];
  topLosers: [];
};

const StockPortfolio = (props: any) => {
  const [exchangeTransactionDialogState, setExchangeTransactionDialogState] =
    useState(false);
  const [transactionDialogState, setTransactionDialogState] = useState(false);
  const [addAssetsDialogState, setAddAssetsDialogState] = useState(false);
  const [compareSectorState, setCompareSectorState] = useState(false);
  const [assetsToView, setAssetsToView] = useState({});
  const [tableData, setTableData] = useState([]);
  const [summaryAssets, setSummaryAssets] = useState({});
  const [sumTargetBySector, setSumTargetBySector] = useState([]);
  const [dashboard, setDashboard] = useState<DashboardDataType>();
  const [tableSize, setTableSize] = useState(440);

  const openTransactionDialog = (
    assetsId: any,
    symbol: any,
    marketSymbol: any
  ) => {
    setAssetsToView({
      id: assetsId,
      symbol: symbol,
      marketSymbol: marketSymbol,
    });
    setTransactionDialogState(true);
  };

  useEffect(() => {
    LoadAssets();
    const intervalId = setInterval(() => {
      LoadAssets();
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    LoadAssets();
  }, [transactionDialogState]);

  const LoadAssets = () => {
    LoadAssetsList(setTableData);
    LoadSummaryAssetsData(setSummaryAssets);
    LoadDashboardData(setDashboard);
    LoadSumTargetBySectorData(setSumTargetBySector);
  };

  return (
    <div>
      <Accordion
        defaultExpanded
        sx={{
          marginBottom: "20px",
          borderRadius: "8px",
        }}
        onChange={(e, expanded) => {
          if (expanded) {
            setTableSize(440);
          } else {
            setTableSize(730);
          }
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
                {dashboard ? <SummaryDashboard data={dashboard} /> : <></>}
              </Grid>
              <Grid
                item
                xs={7}
                sx={{
                  width: "100%",
                  placeSelf: "center",
                }}
              >
                {dashboard ? (
                  <SummeryOtherDetails data={dashboard} tableData={tableData} />
                ) : (
                  <></>
                )}
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
                {dashboard ? (
                  <GainTable
                    data={[
                      {
                        title: "Top Gainers",
                        tableData: dashboard?.topGainers,
                      },
                      { title: "Top Losers", tableData: dashboard?.topLosers },
                    ]}
                  />
                ) : (
                  <></>
                )}
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
                  tableSize={tableSize}
                  tableData={tableData}
                  LoadAssets={LoadAssets}
                  summaryAssets={summaryAssets}
                  setExchangeTransactionDialogState={
                    setExchangeTransactionDialogState
                  }
                  setAddAssetsDialogState={setAddAssetsDialogState}
                  openTransactionDialog={openTransactionDialog}
                  setCompareSectorState={setCompareSectorState}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </div>
      <AssetsTransactionDialog
        assets={assetsToView}
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
        LoadAssets={LoadAssets}
      />
      <SummarySectorChart
        compareSectorState={compareSectorState}
        setCompareSectorState={setCompareSectorState}
        sumTargetBySector={sumTargetBySector}
      />
    </div>
  );
};

export default StockPortfolio;
