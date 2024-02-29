"use client";

import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  List,
  Paper,
  Stack,
} from "@mui/material";
import { LoadTrSavingsSummaryList } from "./saving/_api/api_savings";
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
import { ReturnDetailsDashboardNoText } from "./stock/_components/details";
import { LoadDashboard } from "./_api/api_dashboard";
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

const monthLabel = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const colorList = [
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(53, 162, 235)",
  "rgb(255, 205, 86)",
  "rgb(255, 99, 132)",
  "rgb(75, 192, 192)",
  "rgb(255, 159, 64)",
  "rgb(201, 203, 207)",
  "rgb(255, 205, 86)",
];

type DashboardType = {
  totalBalance: number;
  totalStock: number;
  totalStockPercent: number;
  changePercentageTHB: number;
  totalSavings: number;
  totalSavingsPercent: number;
  savingSummaryPayloads: [];
  barChartDataList: [];
  lineChartData: LineChartData;
};

type LineChartData = {
  labels: [];
  dividendAmount: [];
};

export default function Home() {
  const [summaryData, setSummaryData] = useState<DashboardType>();
  const [chartState, setChartState] = useState(false);

  useEffect(() => {
    LoadData();
    const intervalId = setInterval(() => {
      LoadData();
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const LoadData = () => {
    LoadDashboard(setSummaryData);
  };

  const portData = {
    labels: ["Savings", "Dime Stock"],
    datasets: [
      {
        label: "Portfolio",
        data: [
          summaryData ? summaryData.totalSavingsPercent.toFixed(2) : 0,
          summaryData ? summaryData.totalStockPercent.toFixed(2) : 0,
        ],
        backgroundColor: ["rgba(255, 165, 50, 0.7)", "rgba(0,240, 125, 0.7)"],
        borderColor: ["rgba(255, 165, 50, 1)", "rgba(0,240, 125, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: monthLabel,
    datasets: summaryData
      ? summaryData.barChartDataList.map((item: any, index: any) => ({
          label: item.year,
          data: item.dividendAmount.map((amount: number) => amount.toFixed(2)),
          backgroundColor: colorList[index % colorList.length],
        }))
      : [],
  };

  const lineData = {
    labels: summaryData ? summaryData.lineChartData.labels : [""],
    datasets: [
      {
        label: "Dividend",
        data: summaryData
          ? summaryData.lineChartData.dividendAmount.map((amount: number) =>
              amount.toFixed(2)
            )
          : [0],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <Box sx={{ height: "400px" }}>
      <Grid container spacing={2} height="100%" textAlign="center">
        <Grid item xs={5} height="100%">
          <Card
            sx={{
              height: "100%",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent>
              <div>
                <p className="text-[40px]">Total Balance</p>
                <p className="text-[60px]">
                  ฿
                  {summaryData
                    ? summaryData.totalBalance.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : 0}
                </p>
              </div>
              <Divider
                orientation="horizontal"
                sx={{
                  margin: "20px",
                  width: "600px",
                  borderBottom: "3px dotted #8B8B8B",
                }}
              />
              <div>
                <p className="text-[25px]">Dime Stock</p>
                <ReturnDetailsDashboardNoText
                  percent={summaryData ? summaryData.changePercentageTHB : 0}
                  value={summaryData ? summaryData.totalStock : 0}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4} height="100%">
          <Card
            sx={{
              height: "100%",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent>
              <Stack spacing={3}>
                <div>
                  <p className="text-[30px]">Total Savings</p>
                  <p className="text-[50px]">
                    ฿
                    {summaryData
                      ? summaryData.totalSavings.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : 0}
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "#2E2F2E",
                    overflow: "auto",
                    display: "block",
                    whiteSpace: "nowrap",
                    maxWidth: 500,
                    justifyContent: "space-between",
                    textAlignLast: "center",
                  }}
                >
                  {summaryData
                    ? summaryData.savingSummaryPayloads.map((item: any) => (
                        <Card
                          key={item.application}
                          sx={{
                            backgroundColor: "#2E2F2E",
                            display: "inline-block",
                            margin: 1,
                          }}
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
                </div>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3} height="100%">
          <Card sx={{ height: "100%", borderRadius: "8px", width: "100%" }}>
            <CardContent
              sx={{ height: "100%", borderRadius: "8px", width: "100%" }}
            >
              <Doughnut
                data={portData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  layout: {
                    padding: 5,
                  },
                  plugins: {
                    datalabels: {
                      formatter: (value) => {
                        return value + "%";
                      },
                      color: "#FFFFFF",
                      font: {
                        weight: "bold",
                        size: 14,
                      },
                    },
                    legend: {
                      display: true,
                      position: "bottom",
                    },
                    title: {
                      display: true,
                      text: "Total Portfolio",
                      color: "#FFFFFF",
                      font: {
                        weight: "bold",
                        size: 20,
                      },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} height="100%">
          <Card sx={{ height: "100%", borderRadius: "8px", width: "100%" }}>
            <CardContent
              sx={{
                height: "100%",
                borderRadius: "8px",
                width: "100%",
              }}
            >
              <IconButton
                sx={{
                  backgroundColor: "transparent !important",
                  marginRight: 2,
                  marginTop: "5px",
                  position: "absolute",
                  zIndex: 2,
                  right: "29px",
                  top: "437px",
                }}
                onClick={() => setChartState(!chartState)}
              >
                <FiRefreshCw size={20} />
              </IconButton>
              <Box
                sx={{ display: chartState ? "none" : "flex", height: "100%" }}
              >
                <Bar
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                      padding: 5,
                    },
                    plugins: {
                      datalabels: {
                        display: true,
                        color: "#ffffff",
                        font: {
                          weight: "bold",
                          size: 14,
                        },
                        formatter: (value) => {
                          return "$" + value;
                        },
                      },
                      title: {
                        display: true,
                        text: "Dividend Summary",
                      },
                      legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                          color: "#FFFFFF",
                        },
                      },
                    },
                    scales: {
                      x: {
                        ticks: {
                          font: {
                            size: 14,
                          },
                          color: "#ffffff",
                        },
                        stacked: true,
                      },
                      y: {
                        ticks: {
                          font: {
                            size: 14,
                          },
                          color: "#ffffff",
                        },
                        stacked: true,
                      },
                    },
                  }}
                  data={barData}
                />
              </Box>
              <Box
                sx={{ display: chartState ? "flex" : "none", height: "100%" }}
              >
                <Line
                  options={{
                    scales: {
                      x: {
                        ticks: {
                          font: {
                            size: 14,
                          },
                          color: "#ffffff",
                        },
                      },
                      y: {
                        ticks: {
                          font: {
                            size: 14,
                          },
                          color: "#ffffff",
                        },
                      },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                      padding: 5,
                    },
                    plugins: {
                      datalabels: {
                        anchor: "end",
                        align: "top",
                        display: true,
                        color: "#ffffff",
                        font: {
                          weight: "bold",
                          size: 14,
                        },
                        formatter: (value) => {
                          return "$" + value;
                        },
                      },
                      title: {
                        display: true,
                        text: "Dividend Summary",
                      },
                      legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                          color: "#FFFFFF",
                        },
                      },
                    },
                  }}
                  data={lineData}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
