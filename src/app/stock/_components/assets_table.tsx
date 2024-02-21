import { Button, Chip, Grid, IconButton, Slider, Stack } from "@mui/material";
import {
  Column,
  ColumnChooser,
  ColumnFixing,
  Item,
  LoadPanel,
  Toolbar,
} from "devextreme-react/data-grid";
import { FiRefreshCw } from "react-icons/fi";
import { IoMdAddCircle } from "react-icons/io";
import { FormatValue, ReturnDetailsNoText } from "./details";
import { DataGridCustomStyle } from "./styled";

export const AssetsTable = (props: any) => {
  const data = props.mockAssetsData;
  const summaryAssets = props.summaryAssets;

  const renderTargetAndActual = (rowData: any) => {
    const caption = rowData.column.caption;
    let value;
    if (caption === "Target") {
      value = summaryAssets.target;
    } else if (caption === "Actual") {
      value = summaryAssets.actual;
    } else {
      value = 0;
    }

    return (
      <Stack>
        <p>{caption}</p>
        <Chip
          sx={{
            backgroundColor: value === 100 ? "green" : "red",
            height: 20,
            width: 80,
          }}
          label={value.toFixed(2) + "%"}
        />
      </Stack>
    );
  };

  const getColor = (value: number, min: number, max: number) => {
    const colorRange = {
      red: [255, 0, 0],
      yellow: [255, 255, 0],
      green: [0, 220, 0],
    };

    const percentage = (value - min) / (max - min);

    let color;
    if (percentage <= 0.5) {
      const [r1, g1, b1] = colorRange.red;
      const [r2, g2, b2] = colorRange.yellow;
      color = [
        Math.round(r1 + percentage * (r2 - r1)),
        Math.round(g1 + percentage * (g2 - g1)),
        Math.round(b1 + percentage * (b2 - b1)),
      ];
    } else {
      const [r1, g1, b1] = colorRange.yellow;
      const [r2, g2, b2] = colorRange.green;
      color = [
        Math.round(r1 + (percentage - 0.5) * 2 * (r2 - r1)),
        Math.round(g1 + (percentage - 0.5) * 2 * (g2 - g1)),
        Math.round(b1 + (percentage - 0.5) * 2 * (b2 - b1)),
      ];
    }

    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  };

  const RenderActionCell = (rowData: any) => {
    return (
      <IconButton
        sx={{ padding: "5px" }}
        onClick={() => props.openTransactionDialog(rowData.data.id)}
      >
        <IoMdAddCircle size={25} color="#9C27B0" />
      </IconButton>
    );
  };

  const RenderPriceCell = (rowData: any) => {
    const displayValue = rowData.displayValue;
    return (
      "$" +
      displayValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  const RenderPercentCell = (rowData: any) => {
    const displayValue = rowData.displayValue;
    return (
      displayValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) + "%"
    );
  };

  const RenderHistoryPercentCell = (rowData: any) => {
    const displayValue = rowData.displayValue;
    return (
      <p>
        <FormatValue value={displayValue} textSize={16} type="percent" />
      </p>
    );
  };

  const RenderHoldingCell = (rowData: any) => {
    console.log(rowData.data);
    const costGain = rowData.data.costGain;
    const costGainValue = rowData.data.costGainValue;
    return (
      <Stack
        direction="row"
        textAlign="center"
        justifyContent="center"
        style={{ color: costGain >= 0 ? "green" : "red" }}
      >
        <Stack>
          <ReturnDetailsNoText
            percent={costGain}
            value={costGainValue}
            type="usd"
            textSize={[16, 14]}
          />
        </Stack>
      </Stack>
    );
  };

  const RenderDailyHoldingCell = (rowData: any) => {
    const lastPricePercentage = rowData.data.lastPriceChangePercentage;
    const dailyPriceValue =
      (lastPricePercentage / 100) * rowData.data.costValue;
    return (
      <Stack
        direction="row"
        textAlign="center"
        justifyContent="center"
        style={{ color: lastPricePercentage >= 0 ? "green" : "red" }}
      >
        <Stack>
          <ReturnDetailsNoText
            percent={lastPricePercentage}
            value={dailyPriceValue}
            type="usd"
            textSize={[16, 14]}
          />
        </Stack>
      </Stack>
    );
  };

  const RenderScoreCell = (rowData: any) => {
    console.log(rowData.displayValue);
    const value = rowData.displayValue;
    return (
      <Chip
        sx={{
          backgroundColor: getColor(
            value,
            summaryAssets.minScore,
            summaryAssets.maxScore
          ),
          height: 35,
          width: 70,
          "& .MuiChip-label": {
            color: "#000000",
            fontSize: "16px",
            fontWeight: 540,
          },
        }}
        label={value.toFixed(2)}
      />
    );
  };

  const Render52Week = (rowData: any) => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Slider
            max={rowData.data.yearHigh}
            min={rowData.data.yearLow}
            defaultValue={rowData.data.percentYear}
            disabled
            sx={{
              "& .MuiSlider-thumb": {
                width: "4px",
                height: "16px",
                borderRadius: "0",
              },
              "& .MuiSlider-track": {
                borderRadius: "5px 0px 0px 5px",
              },
              "&.Mui-disabled": {
                color: "green",
                height: "8px",
                padding: "5px 0px",
              },
            }}
          />
        </Grid>
        <Grid item xs={3} textAlign="left">
          <p className="text-[12px]">${rowData.data.yearLow.toFixed(2)}</p>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={3} textAlign="right">
          <p className="text-[12px]">${rowData.data.yearHigh.toFixed(2)}</p>
        </Grid>
      </Grid>
    );
  };

  return (
    <DataGridCustomStyle
      id="gridContainer"
      dataSource={data}
      columnAutoWidth={true}
      keyExpr="id"
      allowColumnReordering={true}
      showBorders={false}
      showRowLines={true}
      showColumnLines={false}
      height={390}
    >
      <Toolbar>
        <Item location="before">
          <div className="ml-2 mt-[5px]">
            <p className="text-[#FFFFFF]">
              Update : {summaryAssets.updateTime}
            </p>
          </div>
        </Item>{" "}
        <Item location="after">
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            marginRight={2}
            marginTop="5px"
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
                height: 30,
                "&.MuiButtonBase-root": {
                  backgroundColor: "#42a5f5",
                },
                "&.MuiButtonBase-root:hover": {
                  backgroundColor: "#b3ffc0",
                },
              }}
              onClick={() => props.setExchangeTransactionDialogState(true)}
            >
              Add Exchange Transaction
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
                height: 30,
                "&.MuiButtonBase-root": {
                  backgroundColor: "#42a5f5",
                },
                "&.MuiButtonBase-root:hover": {
                  backgroundColor: "#b3ffc0",
                },
              }}
              onClick={() => props.setAddAssetsDialogState(true)}
            >
              Add Asset
            </Button>
          </Stack>
        </Item>
        <Item location="after">
          <IconButton
            sx={{
              backgroundColor: "transparent !important",
              marginRight: 2,
              marginTop: "5px",
            }}
          >
            <FiRefreshCw size={20} />
          </IconButton>
        </Item>
        <Item name="columnChooserButton" />
      </Toolbar>
      <ColumnFixing enabled={true} />
      <ColumnChooser enabled={true} />
      <LoadPanel enabled={true} />
      <Column
        minWidth={55}
        width={55}
        alignment="center"
        fixed={true}
        cellRender={RenderActionCell}
      />
      <Column
        caption="Symbol"
        minWidth={80}
        width={80}
        alignment="center"
        fixed={true}
        dataField="symbol"
      />
      <Column
        caption="Sector"
        minWidth={100}
        alignment="center"
        dataField="sectorName"
        visible={false}
      />
      <Column
        caption="Industry"
        minWidth={100}
        alignment="center"
        dataField="industryName"
        visible={false}
      />
      <Column
        caption="Score"
        minWidth={80}
        alignment="center"
        dataField="score"
        cellRender={RenderScoreCell}
      />
      <Column
        caption="State"
        minWidth={100}
        alignment="center"
        dataField="state"
        visible={false}
      />
      <Column
        caption="Line"
        minWidth={100}
        alignment="center"
        dataField="line"
        visible={false}
      />
      <Column
        caption="Average Price"
        minWidth={100}
        width={100}
        alignment="center"
        dataField="averagePrice"
        cellRender={RenderPriceCell}
      />
      <Column
        caption="Holding Value"
        minWidth={100}
        width={100}
        alignment="center"
        dataField="actualValue"
        cellRender={RenderPriceCell}
      />
      <Column
        caption="Holding Gain"
        minWidth={100}
        width={100}
        alignment="center"
        dataField="costGain"
        cellRender={RenderHoldingCell}
      />
      <Column
        caption="Daily Holding Gain"
        minWidth={130}
        width={130}
        alignment="center"
        dataField="lastPriceChangePercentage"
        cellRender={RenderDailyHoldingCell}
      />
      <Column
        caption="Last Price"
        minWidth={90}
        width={90}
        alignment="center"
        dataField="lastPrice"
        cellRender={RenderPriceCell}
      />
      <Column
        caption="Target"
        minWidth={100}
        alignment="center"
        dataField="target"
        headerCellRender={renderTargetAndActual}
      />
      <Column
        caption="Actual"
        minWidth={100}
        alignment="center"
        dataField="actualPercentage"
        headerCellRender={renderTargetAndActual}
      />
      <Column
        caption="Different"
        minWidth={100}
        alignment="center"
        dataField="different"
        cellRender={RenderPriceCell}
      />
      <Column
        caption="Dividend Yield"
        minWidth={80}
        width={80}
        alignment="center"
        dataField="dividendYieldPercentage"
        cellRender={RenderPercentCell}
      />
      <Column
        caption="52 Week"
        minWidth={200}
        cellRender={Render52Week}
        alignment="center"
      />
      <Column
        caption="YTD"
        minWidth={100}
        alignment="center"
        dataField="ytdPrice"
        cellRender={RenderHistoryPercentCell}
        visible={false}
      />
      <Column
        caption="1 Week"
        minWidth={100}
        alignment="center"
        dataField="wkPrice1"
        cellRender={RenderHistoryPercentCell}
        visible={false}
      />
      <Column
        caption="1 Month"
        minWidth={100}
        alignment="center"
        dataField="moPrice1"
        cellRender={RenderHistoryPercentCell}
        visible={false}
      />
      <Column
        caption="3 Month"
        minWidth={100}
        alignment="center"
        dataField="moPrice3"
        cellRender={RenderHistoryPercentCell}
        visible={false}
      />
      <Column
        caption="6 Month"
        minWidth={100}
        alignment="center"
        dataField="moPrice6"
        cellRender={RenderHistoryPercentCell}
        visible={false}
      />
      <Column
        caption="1 Year"
        minWidth={100}
        alignment="center"
        dataField="yearPrice1"
        cellRender={RenderHistoryPercentCell}
        visible={false}
      />
      <Column
        caption="Note"
        minWidth={100}
        alignment="center"
        dataField="note"
        visible={false}
      />
    </DataGridCustomStyle>
  );
};
