import {
  Button,
  Chip,
  Grid,
  IconButton,
  Slider,
  Stack,
  TextField,
} from "@mui/material";
import {
  Column,
  ColumnChooser,
  ColumnFixing,
  Editing,
  Item,
  LoadPanel,
  Paging,
  Scrolling,
  SearchPanel,
  Toolbar,
} from "devextreme-react/data-grid";
import { FiRefreshCw } from "react-icons/fi";
import { IoMdAddCircle } from "react-icons/io";
import { FormatValue, ReturnDetailsNoText } from "./details";
import { DataGridCustomStyle } from "../../_components/styled";
import { useEffect, useState } from "react";
import { LoadAssetsList, UpdateTarget } from "../_api/api_stock";
import { Tune } from "@mui/icons-material";
import { constants } from "fs/promises";
import dayjs from "dayjs";
import { FaChartBar } from "react-icons/fa6";

export const AssetsTable = (props: any) => {
  const summaryAssets = props.summaryAssets;
  const [maxDifferent, setMaxDifferent] = useState(0);
  const [minDifferent, setMinDifferent] = useState(0);

  useEffect(() => {
    setMaxDifferent(
      Math.max(...props.tableData.map((item: any) => item.different))
    );
    setMinDifferent(
      Math.min(...props.tableData.map((item: any) => item.different))
    );
  }, [props.tableData]);

  const onSccess = () => {
    console.log("Success Update Target");
    props.LoadAssets();
  };

  const updateTarget = (id: any, target: any) => {
    UpdateTarget(id, target, onSccess);
  };

  const renderHeaderTargetAndActual = (rowData: any) => {
    const caption = rowData.column.caption;
    let value;
    if (caption === "Target") {
      value = summaryAssets.target;
    } else if (caption === "Actual") {
      value = 100;
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
            "& .MuiChip-label": {
              padding: "5px",
            },
          }}
          label={value ? value.toFixed(2) + "%" : "0%"}
        />
      </Stack>
    );
  };

  const renderTarget = (rowData: any) => {
    return (
      <TextField
        defaultValue={rowData.displayValue}
        type="number"
        sx={{
          right: "-5px",
          width: "65px",
          "&.MuiFormControl-root": { border: "none" },
          "&.MuiTextField-root": {
            textAlignLast: "center",
            border: "none",
            color: "black",
            borderBottom: 0,
            "-webkit-text-fill-color": "black",
            "&:before": {
              borderBottom: 0,
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
        InputProps={{ inputProps: { min: 0, max: 100 } }}
        onBlur={(event) => {
          updateTarget(rowData.data.id, event.target.value);
        }}
      ></TextField>
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

  const getColorForDifferent = (value: number) => {
    if (value > 0) {
      const min = 0;
      const max = maxDifferent;
      const range = max - min;
      const ratio = value / range;
      const hue = 120;
      const saturation = 100 - Math.round(50 * ratio); // reduce saturation from 100 to 50 as value approaches min
      const lightness = 100 - Math.round(50 * ratio); // reduce lightness from 100 to 50 as value approaches min
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    } else if (value < 0) {
      const min = 0;
      const max = Math.abs(minDifferent);
      const range = max - min;
      const ratio = Math.abs(value) / range;
      const hue = 0;
      const saturation = 100 - Math.round(50 * ratio); // reduce saturation from 100 to 50 as value approaches min
      const lightness = 100 - Math.round(50 * ratio); // reduce lightness from 100 to 50 as value approaches min
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    } else {
      return "white";
    }
  };

  const RenderActionCell = (rowData: any) => {
    return (
      <IconButton
        sx={{ padding: "5px" }}
        onClick={() =>
          props.openTransactionDialog(
            rowData.data.id,
            rowData.data.symbol,
            rowData.data.marketSymbol
          )
        }
      >
        <IoMdAddCircle size={25} color="#9C27B0" />
      </IconButton>
    );
  };

  const RenderPriceCell = (rowData: any) => {
    const displayValue = rowData.displayValue;
    return displayValue
      ? "$" +
          displayValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
      : 0;
  };

  const RenderShareCell = (rowData: any) => {
    const displayValue = rowData.displayValue;
    return displayValue
      ? displayValue.toLocaleString(undefined, {
          minimumFractionDigits: 7,
          maximumFractionDigits: 7,
        })
      : 0;
  };

  const RenderPercentCell = (rowData: any) => {
    const displayValue = rowData.displayValue;
    return displayValue
      ? displayValue.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + "%"
      : 0;
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
    const dailyCostGain = rowData.data.dailyCostGain;
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
            value={dailyCostGain}
            type="usd"
            textSize={[16, 14]}
          />
        </Stack>
      </Stack>
    );
  };

  const RenderScoreCell = (rowData: any) => {
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
            defaultValue={rowData.data.lastPrice}
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
          <p className="text-[12px]">
            ${rowData.data.yearLow ? rowData.data.yearLow.toFixed(2) : 0}
          </p>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={3} textAlign="right">
          <p className="text-[12px]">
            ${rowData.data.yearHigh ? rowData.data.yearHigh.toFixed(2) : 0}
          </p>
        </Grid>
      </Grid>
    );
  };

  const RenderDiffentCell = (rowData: any) => {
    const value = rowData.displayValue;
    return (
      <Chip
        sx={{
          backgroundColor: getColorForDifferent(value),
          height: 35,
          width: 90,
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

  const RenderActionHeaderCell = (rowData: any) => {
    return (
      <Chip
        sx={{
          height: 35,
          width: 70,
          "& .MuiChip-label": {
            color: "#FFFFFF",
            fontSize: "16px",
            fontWeight: 540,
            padding: "5px",
          },
        }}
        label={summaryAssets.assetsCount}
      />
    );
  };

  const RenderExDateCell = (rowData: any) => {
    const todayDate = dayjs();
    const today = todayDate;
    const twoDaysLater = todayDate.add(2, "day");
    const sevenDaysLater = todayDate.add(7, "day");

    if (rowData.displayValue) {
      let chipColor = "#A9A9A9"; // สีพื้นหลังเริ่มต้น
      const displayDate = dayjs(rowData.displayValue);

      if (displayDate === today) {
        chipColor = "#ff5252"; // สีแดงถ้าเป็นวันนี้
      } else if (displayDate > today && displayDate <= twoDaysLater) {
        chipColor = "#ffd600"; // สีเหลืองถ้าเป็น 1 หรือ 2 วันหลังจากวันนี้
      } else if (displayDate > twoDaysLater && displayDate <= sevenDaysLater) {
        chipColor = "#4caf50"; // สีเขียวถ้าเป็น 3 ถึง 7 วันหลังจากวันนี้
      }

      return (
        <Chip
          sx={{
            height: 35,
            width: 100,
            backgroundColor: chipColor,
            "& .MuiChip-label": {
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: 540,
              padding: "5px",
            },
          }}
          label={displayDate.format("DD/MM/YYYY")}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <DataGridCustomStyle
      id="gridContainer"
      dataSource={props.tableData}
      columnAutoWidth={true}
      keyExpr="id"
      allowColumnReordering={true}
      showBorders={false}
      showRowLines={true}
      showColumnLines={false}
      height={props.tableSize}
    >
      <Toolbar>
        <Item location="before">
          <div className="ml-2 mt-[5px]">
            <p className="text-[#FFFFFF]">
              Update :{" "}
              {summaryAssets.updateTime
                ? new Date(summaryAssets.updateTime).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : null}
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
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            marginRight={2}
            marginTop="5px"
          >
            <IconButton
              sx={{
                backgroundColor: "transparent !important",
                marginRight: 2,
                marginTop: "5px",
              }}
              onClick={() => props.LoadAssets()}
            >
              <FiRefreshCw size={20} />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "transparent !important",
                marginRight: 2,
                marginTop: "5px",
              }}
              onClick={() => props.setCompareSectorState(true)}
            >
              <FaChartBar size={20} />
            </IconButton>
          </Stack>
        </Item>
        <Item name="columnChooserButton" />
        <Item name="searchPanel" />
      </Toolbar>
      <ColumnFixing enabled={true} />
      <ColumnChooser enabled={true} />
      <Paging enabled={false} />
      <LoadPanel enabled={false} />
      <SearchPanel visible={true} width={150} placeholder="Search..." />
      <Column
        minWidth={55}
        width={55}
        alignment="center"
        fixed={true}
        cellRender={RenderActionCell}
        headerCellRender={RenderActionHeaderCell}
      />
      <Column
        caption="Symbol"
        minWidth={70}
        width={70}
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
        width={80}
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
        visible={false}
      />
      <Column
        caption="Cost Value"
        minWidth={100}
        width={100}
        alignment="center"
        dataField="costValue"
        cellRender={RenderPriceCell}
        visible={false}
      />
      <Column
        caption="Holding Value"
        minWidth={100}
        width={100}
        alignment="center"
        dataField="holdingValue"
        cellRender={RenderPriceCell}
      />
      <Column
        caption="Total Share"
        minWidth={100}
        width={100}
        alignment="center"
        dataField="totalShare"
        cellRender={RenderShareCell}
        visible={false}
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
        caption="Dividend Yield"
        minWidth={80}
        width={80}
        alignment="center"
        dataField="dividendYield"
        cellRender={RenderPercentCell}
      />
      <Column
        caption="Dividend Ex-Date"
        minWidth={120}
        width={120}
        alignment="center"
        dataField="exDate"
        dataType="date"
        format="dd/MM/yyyy"
        cellRender={RenderExDateCell}
        headerCellRender={() => (
          <div style={{ whiteSpace: "nowrap" }}>
            Dividend
            <br />
            Ex-Date
          </div>
        )}
      />
      <Column
        caption="Dividend Amount"
        minWidth={80}
        width={80}
        alignment="center"
        dataField="dividendAmount"
        cellRender={RenderPriceCell}
        visible={false}
      />
      <Column
        caption="Payout Ratio"
        minWidth={80}
        width={80}
        alignment="center"
        dataField="payoutRatio"
        cellRender={RenderPercentCell}
        visible={false}
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
        width={100}
        alignment="center"
        dataField="ytdPrice"
        cellRender={RenderHistoryPercentCell}
      />
      <Column
        caption="1 Week"
        minWidth={80}
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
        width={100}
        alignment="center"
        dataField="yearPrice1"
        cellRender={RenderHistoryPercentCell}
      />
      <Column
        caption="Note"
        minWidth={100}
        alignment="center"
        dataField="note"
        visible={false}
      />
      <Column
        caption="Target"
        minWidth={80}
        width={80}
        alignment="center"
        dataField="target"
        fixed={true}
        fixedPosition="right"
        headerCellRender={renderHeaderTargetAndActual}
        cellRender={renderTarget}
      />
      <Column
        caption="Actual"
        minWidth={80}
        width={80}
        alignment="center"
        dataField="actual"
        fixed={true}
        fixedPosition="right"
        headerCellRender={renderHeaderTargetAndActual}
        cellRender={RenderPercentCell}
      />
      <Column
        caption="Different"
        minWidth={100}
        width={100}
        alignment="center"
        dataField="different"
        fixed={true}
        fixedPosition="right"
        cellRender={RenderDiffentCell}
      />
    </DataGridCustomStyle>
  );
};
