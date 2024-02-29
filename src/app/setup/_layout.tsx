import { Box, Card, CardContent } from "@mui/material";

export const metadata = {
  title: "Setup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="m-5">
      <Box color="white">
        <Card
          sx={{
            marginBottom: "20px",
            borderRadius: 2,
            height: "100%",
            backgroundColor: "#171817",
          }}
        >
          <CardContent>{children}</CardContent>
        </Card>
      </Box>
    </div>
  );
}
