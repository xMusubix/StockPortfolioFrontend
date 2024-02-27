"use client";

import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { GoDotFill } from "react-icons/go";

const SectorIndestryTable = (props: any) => {
  const datas = props.data;

  const Row = (props: any) => {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell sx={{ width: 20 }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <MdOutlineKeyboardArrowUp />
              ) : (
                <MdOutlineKeyboardArrowDown />
              )}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.sector}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  textAlign="left"
                >
                  Industry
                </Typography>
                <List component="ul">
                  {row.industryList.map((industry: any) => (
                    <ListItem key={industry.id} disablePadding>
                      <GoDotFill />
                      <ListItemText
                        className="pl-3"
                        primary={industry.industryName}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  return (
    <TableContainer sx={{ minHeight: 700, maxHeight: 700, borderRadius: 2 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableBody>
          {datas.map((data: any) => (
            <Row key={data.id} row={data} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SectorIndestryTable;
