import { Box, Card, CardContent, Stack } from "@mui/material";

export const SummarySavings = (props: any) => {
  return (
    <Box color="white" sx={{ display: "flex", justifyContent: "center" }}>
      <Stack spacing={3} direction="row">
        <Card
          sx={{
            backgroundColor: "#2E2F2E",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardContent>
            <Stack
              spacing={0}
              direction="row"
              textAlign="center"
              justifyContent="center"
            >
              <p className="text-[40px] font-normal">Total Savings :&nbsp;</p>
              <p className="text-[40px] font-normal">
                {props.summaryData
                  ? props.summaryData
                      .reduce(
                        (accumulator: any, item: any) =>
                          accumulator + item.amount,
                        0
                      )
                      .toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                  : null}
              </p>
            </Stack>
          </CardContent>
        </Card>
        {props.summaryData
          ? props.summaryData.map((item: any) => (
              <Card key={item.application} sx={{ backgroundColor: "#2E2F2E" }}>
                <CardContent>
                  <Stack spacing={0} direction="column" textAlign="center">
                    <p className="text-[30px] font-normal">
                      {item.application}
                    </p>
                    <p className="text-[20px] font-normal">
                      ฿
                      {item.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </Stack>
                </CardContent>
              </Card>
            ))
          : null}
      </Stack>
    </Box>
  );
};
