import {
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ReturnDetailsNoText } from "./details";

const TableCellContent = ({ symbol, percent, value }: any) => (
  <Stack direction="row" spacing={0} alignItems="center">
    <p className="text-[18px]">{symbol}</p>
    <div style={{ width: 100 }}>
      <ReturnDetailsNoText
        percent={percent}
        value={value}
        type="usd"
        textSize={[16, 14]}
      />
    </div>
  </Stack>
);

export const GainTable = ({ data }: any) => {
  return (
    <TableContainer>
      <Table size="small">
        <TableBody>
          {data.map(({ title, tableData }: any, index: number) => (
            <TableRow
              key={title}
              sx={{
                borderBottom: index === 0 ? "2px solid #8B8B8B" : "unset", // Apply bottom border to the first row only
              }}
            >
              <TableCell
                sx={{
                  padding: "7px 20px 7px 0px",
                  borderBottom: "unset",
                }}
              >
                <p className="text-[20px] font-bold">{title}</p>
              </TableCell>
              {tableData.map(
                ({
                  symbol,
                  lastPriceChange,
                  lastPriceChangePercentage,
                }: any) => (
                  <TableCell
                    key={symbol}
                    sx={{ padding: "7px 7px", borderBottom: "unset" }}
                  >
                    <TableCellContent
                      symbol={symbol}
                      percent={lastPriceChangePercentage}
                      value={lastPriceChange}
                    />
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GainTable;
