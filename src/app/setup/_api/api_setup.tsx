import http from "@/app/_components/http";

export const AddSymbol = async (props: any) => {
  const symbolValue = props.symbolValue;
  await http
    .post(`${"/api/v1/watchlist/save"}`, null, {
      params: { symbolValue },
    })
    .then((res: any) => {
      //Todo load Symbol Data
    });
};

export const LoadSymbolData = async (props: any) => {
  await http.get(`${"/api/v1/watchlist/load"}`).then((res: any) => {
    //Todo return Symbol Data
  });
};
