import { DataGridCustomStyle } from "@/app/_components/styled";
import { Button, Card, CardContent, IconButton } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Column } from "devextreme-react/data-grid";
import { useEffect, useState } from "react";
import { IoIosRemoveCircle, IoMdAddCircle } from "react-icons/io";
import { DeleteTrSavings } from "../_api/api_savings";

export const SavingsTransactionTable = (props: any) => {
  const RenderThbCell = (rowData: any) => {
    const displayValue = rowData.displayValue;
    return (
      "฿" +
      displayValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  const RenderTransctionActionCell = (rowData: any) => {
    return (
      <IconButton
        sx={{ padding: "5px" }}
        onClick={() => {
          DeleteTrSavings(rowData.data.id, props.LoadSavingsTrnsaction);
        }}
      >
        <IoIosRemoveCircle size={25} color="red" />
      </IconButton>
    );
  };

  return (
    <div className="mb-5">
      <Stack
        direction="row"
        spacing={6}
        justifyContent="space-between"
        alignItems="center"
      >
        <div style={{ marginRight: 40 }} />
        <div style={{ marginRight: 40 }} />
        <div>
          <Button
            variant="contained"
            startIcon={<IoMdAddCircle />}
            sx={{
              "&.MuiButtonBase-root": {
                backgroundColor: "#42a5f5",
              },
              "&.MuiButtonBase-root:hover": {
                backgroundColor: "#b3ffc0",
              },
            }}
            onClick={() => props.setSavingsDialogState(true)}
          >
            Add Transaction
          </Button>
        </div>
      </Stack>
      <div className="mb-5">
        <Box
          sx={{
            display: "grid",
          }}
        >
          <Card>
            <CardContent>
              <Box>
                <DataGridCustomStyle
                  id="gridContainer"
                  dataSource={props.tableData}
                  columnAutoWidth={true}
                  keyExpr="id"
                  allowColumnReordering={true}
                  showBorders={false}
                  showRowLines={true}
                  showColumnLines={false}
                  height={500}
                >
                  <Column
                    caption="Action"
                    minWidth={60}
                    alignment="center"
                    cellRender={RenderTransctionActionCell}
                  />
                  <Column
                    caption="Date"
                    minWidth={150}
                    alignment="center"
                    dataField="date"
                    dataType="date"
                    format="dd/MM/yyyy"
                  />
                  <Column
                    caption="Type"
                    minWidth={100}
                    alignment="center"
                    dataField="type"
                  />
                  <Column
                    caption="Amount"
                    minWidth={160}
                    alignment="center"
                    dataField="amount"
                    cellRender={RenderThbCell}
                  />
                  <Column
                    caption="Application"
                    minWidth={40}
                    alignment="center"
                    dataField="application"
                  />
                  <Column
                    caption="Note"
                    minWidth={40}
                    alignment="center"
                    dataField="note"
                  />
                </DataGridCustomStyle>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </div>
    </div>
  );
};
