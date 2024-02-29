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
import { SavingsTransactionTable } from "./_components/saving_transaction_table";
import { AddSavingsTransactionDialog } from "./_components/dialog";
import { useEffect, useState } from "react";
import {
  LoadTrSavingsList,
  LoadTrSavingsSummaryList,
} from "./_api/api_savings";
import { SummarySavings } from "./_components/summary";

const SavingPortfolio = (props: any) => {
  const [SavingsDialogState, setSavingsDialogState] = useState(false);
  const [tableData, setTableData] = useState();
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    LoadSavingsTrnsaction();
  }, []);

  const LoadSavingsTrnsaction = () => {
    LoadTrSavingsList(setTableData);
    LoadTrSavingsSummaryList(setSummaryData);
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
          <Typography>Summary Savings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SummarySavings summaryData={summaryData} />
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
                <SavingsTransactionTable
                  setSavingsDialogState={setSavingsDialogState}
                  tableData={tableData}
                  LoadSavingsTrnsaction={LoadSavingsTrnsaction}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </div>
      <AddSavingsTransactionDialog
        SavingsDialogState={SavingsDialogState}
        setSavingsDialogState={setSavingsDialogState}
        onSuccess={LoadSavingsTrnsaction}
      />
    </div>
  );
};

export default SavingPortfolio;
