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
  Stack,
  Typography,
} from "@mui/material";
import { SavingTransactionTable } from "./_components/saving_transaction_table";
import { AddSavingTransactionDialog } from "./_components/dialog";
import { useEffect, useState } from "react";
import { LoadTrsavingList, LoadTrsavingSummaryList } from "./_api/api_saving";

const StockPortfolio = (props: any) => {
  const [savingDialogState, setSavingDialogState] = useState(false);
  const [tableData, setTableData] = useState();
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    LoadSavingTrnsaction();
  }, []);

  const LoadSavingTrnsaction = () => {
    LoadTrsavingList(setTableData);
    LoadTrsavingSummaryList(setSummaryData);
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
          <Typography>Summary Saving</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box color="white" sx={{ display: "flex", justifyContent: "center" }}>
            <Stack spacing={3} direction="row">
              <Card
                sx={{
                  backgroundColor: "#2E2F2E",
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CardContent>
                  <Stack
                    spacing={0}
                    direction="row"
                    textAlign="center"
                    justifyContent="center"
                  >
                    <p className="text-[40px] font-normal">
                      Total Saving :&nbsp;
                    </p>
                    <p className="text-[40px] font-normal">
                      {summaryData
                        ? summaryData
                            .reduce(
                              (accumulator, item: any) =>
                                accumulator + item.amount,
                              0
                            )
                            .toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                        : null}
                    </p>
                  </Stack>
                </CardContent>
              </Card>
              {summaryData
                ? summaryData.map((item: any) => (
                    <Card
                      key={item.application}
                      sx={{ backgroundColor: "#2E2F2E" }}
                    >
                      <CardContent>
                        <Stack
                          spacing={0}
                          direction="column"
                          textAlign="center"
                        >
                          <p className="text-[30px] font-normal">
                            {item.application}
                          </p>
                          <p className="text-[20px] font-normal">
                            ฿
                            {item.amount.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </Stack>
                      </CardContent>
                    </Card>
                  ))
                : null}
            </Stack>
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
                <SavingTransactionTable
                  setSavingDialogState={setSavingDialogState}
                  tableData={tableData}
                  LoadSavingTrnsaction={LoadSavingTrnsaction}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </div>
      <AddSavingTransactionDialog
        savingDialogState={savingDialogState}
        setSavingDialogState={setSavingDialogState}
        onSuccess={LoadSavingTrnsaction}
      />
    </div>
  );
};

export default StockPortfolio;
