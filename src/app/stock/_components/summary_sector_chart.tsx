import {
  Box,
  Card,
  CardContent,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  Paper,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { faker } from "@faker-js/faker";
import { FiRefreshCw } from "react-icons/fi";
import { BootstrapDialog } from "@/app/_components/styled";
import { Transition } from "@/app/_utils/dialog_utils";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  PointElement,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  ChartDataLabels
);

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

export const SummarySectorChart = (props: any) => {
  const sumTargetBySectorData = props.sumTargetBySector;
  const labels = sumTargetBySectorData
    ? sumTargetBySectorData.map((sector: any) => sector.sectorName)
    : [];
  const totalTargets = sumTargetBySectorData
    ? sumTargetBySectorData.map((sector: any) => sector.totalTarget.toFixed(2))
    : [];
  const totalActuals = sumTargetBySectorData
    ? sumTargetBySectorData.map((sector: any) => sector.totalActual.toFixed(2))
    : [];

  const SumTargetBySector = {
    labels: labels,
    datasets: [
      {
        label: "Target",
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(51, 204, 204, 0.8)",
          "rgba(200, 200, 200, 0.8)",
          "rgba(204, 102, 0, 0.8)",
          "rgba(153, 255, 51, 0.8)",
          "rgba(255, 102, 102, 0.8)",
        ],
        data: totalTargets,
      },
      {
        label: "Actual",
        backgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 206, 86, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(255, 159, 64, 0.4)",
          "rgba(51, 204, 204, 0.4)",
          "rgba(200, 200, 200, 0.4)",
          "rgba(204, 102, 0, 0.4)",
          "rgba(153, 204, 51, 0.4)",
          "rgba(255, 102, 102, 0.4)",
        ],
        data: totalActuals,
      },
    ],
  };
  return (
    <BootstrapDialog
      onClose={() => {
        props.setCompareSectorState(false);
      }}
      aria-labelledby="customized-dialog-title"
      open={props.compareSectorState}
      TransitionComponent={Transition}
      fullWidth={true}
      maxWidth="xl"
      sx={{
        "& .MuiPaper-root": { borderRadius: "8px" },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <p className="text-[20px]">Compare Sector Chart</p>
      </DialogTitle>
      <DialogContent>
        <div className="mb-5">
          <Box
            sx={{ height: "700px" }}
            alignItems="center"
            justifyContent="center"
          >
            <Bar
              options={{
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: "y",
                layout: {
                  padding: 5,
                },
                plugins: {
                  legend: {
                    display: false,
                    position: "left",
                    labels: {
                      color: "#ffffff",
                    },
                  },
                  title: {
                    display: true,
                    text: "Sector Summary",
                    color: "#ffffff",
                  },
                  datalabels: {
                    color: "#eeeeee",
                    anchor: "center",
                    align: "end",
                    font: {
                      size: 14,
                    },
                    formatter: function (value, context) {
                      return (
                        context.chart.data.datasets[context.datasetIndex]
                          .label +
                        ": " +
                        value +
                        "%"
                      );
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      color: "#ffffff",
                    },
                  },
                  y: {
                    ticks: {
                      font: {
                        size: 16,
                      },
                      color: "#ffffff",
                    },
                  },
                },
              }}
              data={SumTargetBySector}
            />
          </Box>
        </div>
      </DialogContent>
    </BootstrapDialog>
  );
};
