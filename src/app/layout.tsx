"use client";

import "./globals.css";
import { useState } from "react";
import { Inter } from "next/font/google";
import Sidebar from "./_components/sidebar";
import { ThemeProvider, createTheme } from "@mui/material";
import { Box, Card, CardContent } from "@mui/material";
import "devextreme/dist/css/dx.light.css";

const inter = Inter({ subsets: ["latin"] });

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen"   >
          <div className="flex">
            <ThemeProvider theme={darkTheme}>
              <Sidebar show={showSidebar} setter={setShowSidebar} />
              <div className="bg-[#191A19] flex flex-col flex-grow w-screen md:w-full min-h-screen">
                <div className="m-5" style={{ height: "100%" }}>
                  <Box color="white" sx={{ height: "100%" }}>
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
              </div>
            </ThemeProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
