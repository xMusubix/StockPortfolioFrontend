import { Card, CardContent, Divider, Grid, Stack } from "@mui/material";
import { OtherDetails, ReturnDetails, ReturnDetailsNoText } from "./details";

export const TotalHolding = (props: any) => {
  const data = props.data;
  return (
    <Grid
      container
      spacing={3}
      sx={{
        width: "100%",
        placeSelf: "center",
      }}
    >
      <Grid
        item
        xs={8}
        alignItems="center"
        textAlign="center"
        sx={{ placeSelf: "center" }}
      >
        <p className="text-[40px] font-semibold">
          $
          {data.totalUsd.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <Divider
          orientation="horizontal"
          sx={{ borderBottom: "3px solid #8B8B8B" }}
        />
        <p className="text-[40px] font-semibold">
          ฿
          {data.totalThb.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p className="text-[16px]">Total Holdings</p>
      </Grid>
      <Grid
        item
        xs={4}
        alignItems="center"
        textAlign="center"
        sx={{ placeSelf: "center" }}
      >
        <Stack>
          <ReturnDetailsNoText
            percent={data.usdPercent}
            value={data.usdValue}
            type="usd"
          />
          <Divider
            orientation="horizontal"
            sx={{ borderBottom: "3px solid #8B8B8B" }}
          />
          <ReturnDetailsNoText
            percent={data.thbPercent}
            value={data.thbValue}
            type="thb"
          />
          <p className="text-[16px]">Total Return</p>
        </Stack>
      </Grid>
    </Grid>
  );
};
export const SummeryOtherDetails = (props: any) => {
  const data = props.data;
  return (
    <Grid
      container
      spacing={5}
      sx={{
        width: "100%",
        placeSelf: "center",
      }}
    >
      <Grid item xs={3} alignItems="center" textAlign="center">
        <Card
          sx={{
            textAlign: "center",
            backgroundColor: "#232423",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              placeContent: "center",
            }}
          >
            <ReturnDetails
              percent={data.dailyPercent}
              value={data.dailyValue}
              text="Daily Return"
              type="usd"
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3} alignItems="center" textAlign="center">
        <Card
          sx={{
            textAlign: "center",
            backgroundColor: "#232423",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              placeContent: "center",
            }}
          >
            <OtherDetails
              value={data.annualDividendYield}
              text={["Estimate", "Annual Dividend Yield"]}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3} alignItems="center" textAlign="center">
        <Card
          sx={{
            textAlign: "center",
            backgroundColor: "#232423",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              placeContent: "center",
            }}
          >
            <OtherDetails value={data.avgExRate} text={["Avg. Ex Rate"]} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3} alignItems="center" textAlign="center">
        <Card
          sx={{
            textAlign: "center",
            backgroundColor: "#232423",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              placeContent: "center",
            }}
          >
            <OtherDetails value={data.exRate} text={["Exchange Rate"]} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
