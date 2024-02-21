import { Dialog } from "@mui/material";
import { styled } from "@mui/system";
import { DataGrid } from "devextreme-react";

export const DataGridCustomStyle = styled(DataGrid)(() => ({
  border: "2px solid #232423",
  borderRadius: "8px !important",
  "& .dx-header-row>td>.dx-datagrid-text-content": {
    whiteSpace: "normal !important",
  },
  "& .dx-gridbase-container>.dx-datagrid-rowsview.dx-scrollable": {
    borderRadius: "0px 0px 8px 8px",
  },
  "& .dx-datagrid .dx-datagrid-headers .dx-header-filter, .dx-datagrid .dx-datagrid-headers .dx-header-row > td":
    {
      backgroundColor: "#232423 !important",
      color: "#FFFFFF !important",
      fontWeight: 400,
      fontSize: "16px !important",
    },
  "& .dx-datagrid-rowsview .dx-row": {
    backgroundColor: "#BFBFBF",
    border: "0px !important",
  },
  "& .dx-datagrid-content .dx-datagrid-table .dx-row>td": {
    backgroundColor: "#BFBFBF",
    color: "#000000",
    fontWeight: 400,
    fontSize: "16px",
    verticalAlign: "middle",
  },
  "& .dx-datagrid-header-panel": {
    borderBottom: "0px !important",
  },
  "& .dx-scrollable-scroll .dx-scrollable-scroll-content": {
    backgroundColor: "#000000 !important",
    borderRadius: "10px !important",
  },
}));

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));