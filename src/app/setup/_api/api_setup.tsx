import http from "@/app/_components/http";

export const AddSymbol = async (
  symbol: any,
  setSymbol: any,
  setDialog: any,
  setDialogMessage: any,
  setWatchlistDatas: any,
  setSectorDatas: any
) => {
  try {
    await http
      .post(`${"/api/v1/watchlist/save"}`, null, {
        params: { symbol },
      })
      .then((res: any) => {
        LoadSymbolData(setWatchlistDatas);
        LoadSectorData(setSectorDatas);
        setDialogMessage("Success");
        setDialog(true);
        setSymbol("");
      })
      .catch((error: any) => {
        setDialogMessage(
          error.response.status !== 400 ? "Unknown Error" : error.response.data
        );
        setDialog(true);
      });
  } catch (error: any) {
    setDialogMessage("Unknown Error");
    setDialog(true);
  }
};

export const LoadSymbolData = async (setDatas: any) => {
  await http.get(`${"/api/v1/watchlist/load"}`).then((res: any) => {
    setDatas(res.data);
  });
};

export const LoadSectorData = async (setDatas: any) => {
  await http.get(`${"/api/v1/industry/load"}`).then((res: any) => {
    setDatas(res.data);
  });
};

export const DeleteSymbol = async (id: any, onComplete: any) => {
  await http
    .delete(`${"/api/v1/watchlist"}`, {
      params: { id },
    })
    .then((res: any) => {
      onComplete();
    });
};
