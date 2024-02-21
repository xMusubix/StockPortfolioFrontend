"use client";

import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import WatchlistTable from "./_components/watchlist_table";
import SectorIndestryTable from "./_components/sector_indestry_table";
import { IoIosAddCircle } from "react-icons/io";

type WatchlistData = {
  market: string;
  symbol: string;
  id: string;
};

type SectorData = {
  sector: string;
  id: string;
  industry: IndustryData[];
};

type IndustryData = {
  industry: string;
  id: string;
};

export default function Setup() {
  const createWatchlistData = (
    market: string,
    symbol: string,
    id: string
  ): WatchlistData => {
    return { market, symbol, id };
  };

  const createSectorData = (
    sector: string,
    id: string,
    industry: IndustryData[]
  ): SectorData => {
    return { sector, id, industry };
  };

  const rowsWatchlistData = [
    createWatchlistData("India", "IN", "1324171354"),
    createWatchlistData("China", "CN", "1403500365"),
    createWatchlistData("Italy", "IT", "60483973"),
    createWatchlistData("United States", "US", "327167434"),
    createWatchlistData("Canada", "CA", "37602103"),
    createWatchlistData("Australia", "AU", "25475400"),
    createWatchlistData("Germany", "DE", "83019200"),
    createWatchlistData("Ireland", "IE", "4857000"),
    createWatchlistData("Mexico", "MX", "126577691"),
    createWatchlistData("Japan", "JP", "126317000"),
    createWatchlistData("France", "FR", "67022000"),
    createWatchlistData("United Kingdom", "GB", "67545757"),
    createWatchlistData("Russia", "RU", "146793744"),
    createWatchlistData("Nigeria", "NG", "200962417"),
    createWatchlistData("Brazil", "BR", "210147125"),
  ];

  const rowsSectorData = [
    createSectorData("Information Technology", "1", [
      { industry: "Technology Hardware, Storage and Peripherals", id: "1" },
      { industry: "Interactive Media and Services", id: "2" },
      { industry: "Interactive Media and Services", id: "3" },
      { industry: "Interactive Media and Services", id: "4" },
    ]),
    createSectorData("Health Care", "2", [
      { industry: "Health Care", id: "2" },
      { industry: "Interactive Media and Services", id: "2" },
    ]),
    createSectorData("Health Care", "2", [
      { industry: "Health Care", id: "2" },
      { industry: "Interactive Media and Services", id: "2" },
    ]),
    createSectorData("Health Care", "2", [
      { industry: "Health Care", id: "2" },
      { industry: "Interactive Media and Services", id: "2" },
    ]),
    createSectorData("Health Care", "2", [
      { industry: "Health Care", id: "2" },
      { industry: "Interactive Media and Services", id: "2" },
    ]),
    createSectorData("Health Care", "2", [
      { industry: "Health Care", id: "2" },
      { industry: "Interactive Media and Services", id: "2" },
    ]),
    createSectorData("Health Care", "2", [
      { industry: "Health Care", id: "2" },
      { industry: "Interactive Media and Services", id: "2" },
    ]),
    createSectorData("Health Care", "2", [
      { industry: "Health Care", id: "2" },
      { industry: "Interactive Media and Services", id: "2" },
    ]),
    createSectorData("Health Care", "2", [
      { industry: "Health Care", id: "2" },
      { industry: "Interactive Media and Services", id: "2" },
    ]),
    createSectorData("Health Care", "2", [
      { industry: "Health Care", id: "2" },
      { industry: "Interactive Media and Services", id: "2" },
    ]),
    createSectorData("Health Care", "2", [
      { industry: "Health Care", id: "2" },
      { industry: "Interactive Media and Services", id: "2" },
    ]),
    createSectorData("Health Care", "2", [
      { industry: "Health Care", id: "2" },
      { industry: "Interactive Media and Services", id: "2" },
    ]),
    createSectorData("Health Care", "2", [
      { industry: "Health Care", id: "2" },
      { industry: "Interactive Media and Services", id: "2" },
    ]),
  ];

  return (
    <div>
      <Stack direction="row" spacing={6} justifyContent="center">
        <Paper sx={{ width: "40%" }}>
          <p className="text-center p-3">Sector List</p>
          <SectorIndestryTable data={rowsSectorData} />
        </Paper>
        <Paper sx={{ width: "40%" }}>
          <Stack
            direction="row"
            spacing={6}
            justifyContent="space-between"
            alignItems="center"
          >
            <div style={{ marginRight: 40 }} />
            <p className="p-3">Symbol List</p>
            <div>
              <IconButton>
                <IoIosAddCircle />
              </IconButton>
            </div>
          </Stack>
          <WatchlistTable data={rowsWatchlistData} />
        </Paper>
      </Stack>
    </div>
  );
}
