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
import { useEffect, useState } from "react";
import WatchlistTable from "./_components/watchlist_table";
import SectorIndestryTable from "./_components/sector_indestry_table";
import { IoIosAddCircle } from "react-icons/io";
import { AddWatchlistDialog } from "./_components/dialog";
import { LoadSectorData, LoadSymbolData } from "./_api/api_setup";


type WatchlistData = {
  market: string;
  symbol: string;
  id: string;
};

type SectorData = {
  sector: string;
  id: string;
  industryList: IndustryData[];
};

type IndustryData = {
  industry: string;
  id: string;
};

export default function Setup() {
  const [addWathclistDialogState, setAddWathclistDialogState] = useState(false);
  const [watchlistDatas, setWatchlistDatas] = useState<WatchlistData[]>([]);
  const [sectorDatas, setSectorDatas] = useState<SectorData[]>([]);

  useEffect(() => {
    LoadSymbolData(setWatchlistDatas);
    LoadSectorData(setSectorDatas);
  }, []);

  return (
    <div>
      <Stack direction="row" spacing={6} justifyContent="center">
        <Paper sx={{ width: "40%" }}>
          <p className="text-center p-3">Sector List</p>
          <SectorIndestryTable data={sectorDatas} />
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
              <IconButton onClick={() => setAddWathclistDialogState(true)}>
                <IoIosAddCircle />
              </IconButton>
            </div>
          </Stack>
          <WatchlistTable datas={watchlistDatas} />
        </Paper>
      </Stack>
      <AddWatchlistDialog
        addWathclistDialogState={addWathclistDialogState}
        setAddWathclistDialogState={setAddWathclistDialogState}
        setWatchlistDatas={setWatchlistDatas}
        setSectorDatas={setSectorDatas}
      />
    </div>
  );
}
