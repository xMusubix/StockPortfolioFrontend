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
import { DividendTable } from "./_components/summary_dividend_table";

const mockDividend = [
  {
    year: "2022",
    jan: 0.05,
    feb: 0.04,
    mar: 0.09,
    apr: 0.07,
    may: 0.06,
    jun: 0.08,
    jul: 0.07,
    aug: 0.09,
    sep: 0.05,
    oct: 0.06,
    nov: 0.08,
    dec: 0.07,
  },
  {
    year: "2023",
    jan: 0.06,
    feb: 0.05,
    mar: 0.07,
    apr: 0.08,
    may: 0.09,
    jun: 0.06,
    jul: 0.08,
    aug: 0.07,
    sep: 0.05,
    oct: 0.07,
    nov: 0.08,
    dec: 0.06,
  },
  {
    year: "2024",
    jan: 0.08,
    feb: 0.09,
    mar: 0.06,
    apr: 0.07,
    may: 0.08,
    jun: 0.09,
    jul: 0.07,
    aug: 0.08,
    sep: 0.06,
    oct: 0.05,
    nov: 0.07,
    dec: 0.08,
  },
];

const StockPortfolio = (props: any) => {
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
          <Typography>Summary Dividend Each Year</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box color="white" sx={{ display: "flex", justifyContent: "center" }}>
            <DividendTable data={mockDividend} />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        sx={{
          marginBottom: "20px",
          borderRadius: "8px",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{
            minHeight: "50px !important",
            height: "50px !important",
          }}
        ></AccordionSummary>
        <AccordionDetails>
          <Box color="white">
            {/* TODO Table Top Dividend And Ex Date Data*/}
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default StockPortfolio;
