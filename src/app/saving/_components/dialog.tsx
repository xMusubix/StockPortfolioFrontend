import {
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { BootstrapDialog } from "../../_components/styled";
import { NumericFormatTHB } from "@/app/_utils/input_mask";
import { Transition } from "@/app/_utils/dialog_utils";
import { SaveTrSavings } from "../_api/api_savings";

export const AddSavingsTransactionDialog = (props: any) => {
  const [date, setDate] = useState<string | null>(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [type, setType] = useState("Deposit");
  const [application, setApplication] = useState("ttb");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState<number | string>();

  const saveTrc = () => {
    setAmount("");
    setNote("");
    SaveTrSavings(
      {
        date: date,
        type: type,
        amount: amount,
        application: application,
        note: note,
      },
      props.onSuccess
    );
  };

  useEffect(() => {
    setAmount("");
    setNote("");
  }, [props.SavingsDialogState]);

  return (
    <BootstrapDialog
      onClose={() => {
        props.setSavingsDialogState(false);
      }}
      aria-labelledby="customized-dialog-title"
      open={props.SavingsDialogState}
      TransitionComponent={Transition}
      fullWidth={true}
      maxWidth="sm"
      sx={{
        "& .MuiPaper-root": { borderRadius: "8px" },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <p className="text-[20px]">Add Savings</p>
      </DialogTitle>
      <DialogContent>
        <div className="mb-5">
          <Box
            sx={{
              display: "grid",
            }}
            alignItems="center"
            justifyContent="center"
          >
            <Stack spacing={3} alignItems="center" sx={{ marginTop: 2 }}>
              <Stack
                direction="row"
                spacing={3}
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <FormControl fullWidth>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="th"
                  >
                    <DesktopDatePicker
                      label="Exchange Date"
                      defaultValue={dayjs(new Date())}
                      onChange={(newDate) => {
                        const formatDate = newDate
                          ? dayjs(newDate).format("YYYY-MM-DD")
                          : "";
                        setDate(formatDate);
                      }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Type"
                    onChange={(event) => setType(event.target.value as string)}
                    defaultValue="Deposit"
                  >
                    <MenuItem value={"Deposit"}>Deposit</MenuItem>
                    <MenuItem value={"Withdraw"}>Withdraw</MenuItem>
                    <MenuItem value={"Interest"}>Interest</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack
                direction="row"
                spacing={3}
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <FormControl fullWidth>
                  <InputLabel id="Application">Application</InputLabel>
                  <Select
                    labelId="Application"
                    id="Application"
                    value={application}
                    label="Application"
                    onChange={(event) =>
                      setApplication(event.target.value as string)
                    }
                    defaultValue="ttb"
                  >
                    <MenuItem value={"ttb"}>ttb</MenuItem>
                    <MenuItem value={"LHB"}>LHB</MenuItem>
                    <MenuItem value={"Dime"}>Dime</MenuItem>
                    <MenuItem value={"Ketp"}>Ketp</MenuItem>
                    <MenuItem value={"KKP"}>KKP</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="standard">
                  <TextField
                    label="THB"
                    value={amount}
                    onChange={(event) =>
                      setAmount(
                        isNaN(parseFloat(event.target.value))
                          ? ""
                          : event.target.value
                      )
                    }
                    name="numberformat"
                    id="thb"
                    InputProps={{
                      inputComponent: NumericFormatTHB as any,
                    }}
                    variant="outlined"
                  />
                </FormControl>
              </Stack>
              <FormControl fullWidth variant="standard">
                <TextField
                  label="Note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  name="note"
                  id="note"
                  variant="outlined"
                />
              </FormControl>
              <div style={{ widows: 100, justifySelf: "center" }}>
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
                  onClick={saveTrc}
                >
                  Add Transaction
                </Button>
              </div>
            </Stack>
          </Box>
        </div>
      </DialogContent>
    </BootstrapDialog>
  );
};
