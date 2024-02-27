import {
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Slide,
  TextField,
  Theme,
  useTheme,
} from "@mui/material";
import { Box, Stack, styled } from "@mui/system";
import { IoIosRemoveCircle, IoMdAddCircle } from "react-icons/io";
import DataGrid, {
  Column,
  ColumnChooser,
  ColumnFixing,
  Item,
  LoadPanel,
  Scrolling,
  Toolbar,
} from "devextreme-react/data-grid";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect, useState } from "react";
import { TbArrowsExchange } from "react-icons/tb";
import { BootstrapDialog } from "@/app/_components/styled";
import http from "@/app/_components/http";
import { AddSymbol } from "../_api/api_setup";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AddWatchlistDialog = (props: any) => {
  const [dialog, setDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");

  const saveSymbol = () => {
    if (symbol !== "")
      AddSymbol(
        symbol,
        setSymbol,
        setDialog,
        setDialogMessage,
        props.setWatchlistDatas,
        props.setSectorDatas
      );
  };

  return (
    <div>
      <BootstrapDialog
        onClose={() => props.setAddWathclistDialogState(false)}
        aria-labelledby="customized-dialog-title"
        open={props.addWathclistDialogState}
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth="sm"
        sx={{
          "& .MuiPaper-root": { borderRadius: "8px" },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <p className="text-[20px]">Add Watchlist</p>
        </DialogTitle>
        <DialogContent>
          <div className="mb-5">
            <Box
              sx={{
                display: "grid",
                height: "150px",
              }}
              alignItems="center"
              justifyContent="center"
            >
              <TextField
                label="Symbol"
                variant="outlined"
                value={symbol}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setSymbol(event.target.value);
                }}
              />
              <div
                style={{
                  widows: 100,
                  justifySelf: "center",
                  marginTop: "20px",
                }}
              >
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
                  onClick={saveSymbol}
                >
                  Add Symbol
                </Button>
              </div>
            </Box>
          </div>
        </DialogContent>
      </BootstrapDialog>
      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
