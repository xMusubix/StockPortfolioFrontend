import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MdDelete } from "react-icons/md";

const WatchlistTable = (props: any) => {
  const datas = props.datas;
  return (
    <TableContainer sx={{ minHeight: 700, maxHeight: 700 }}>
      <Table
        stickyHeader
        aria-label="sticky table"
        sx={{
          "& .MuiTableCell-root": {
            padding: "0px !important",
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell align="center">Market</TableCell>
            <TableCell align="center">Symbol</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.map((data: any) => (
            <TableRow
              key={data.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell align="center">{data.market}</TableCell>
              <TableCell align="center">{data.symbol}</TableCell>
              <TableCell align="center">
                <IconButton aria-label="delete">
                  <MdDelete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WatchlistTable;
