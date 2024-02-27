import http from "@/app/_components/http";

export const LoadSymbolList = async (setDatas: any) => {
  await http.get(`${"/api/v1/watchlist/get-symbol"}`).then((res: any) => {
    setDatas(res.data);
  });
};

export const LoadTrcList = async (setDatas: any) => {
  await http.get(`${"/api/v1/trc"}`).then((res: any) => {
    setDatas(res.data);
  });
};

export const LoadAssetsList = async (setDatas: any) => {
  await http.get(`${"/api/v1/assets/load"}`).then((res: any) => {
    setDatas(res.data);
  });
};

export const LoadSummaryAssetsData = async (setDatas: any) => {
  await http.get(`${"/api/v1/assets/summary"}`).then((res: any) => {
    setDatas(res.data);
  });
};
export const LoadDashboardData = async (setDatas: any) => {
  await http.get(`${"/api/v1/assets/dashboard"}`).then((res: any) => {
    setDatas(res.data);
  });
};

export const SaveTrc = async (data: any, onSuccess: any) => {
  await http.post(`${"/api/v1/trc"}`, data, {}).then((res: any) => {
    onSuccess();
  });
};

export const SaveAssets = async (data: any, onSuccess: any) => {
  const symbolList = data;
  await http
    .post(`${"/api/v1/assets/save"}`, symbolList, {})
    .then((res: any) => {
      onSuccess();
    });
};

export const UpdateTarget = async (
  assetsId: any,
  target: any,
  onSuccess: any
) => {
  await http
    .put(`${"/api/v1/assets/update-target"}`, null, {
      params: {
        id: assetsId,
        target: target,
      },
    })
    .then((res: any) => {
      onSuccess();
    });
};

export const DeleteTrc = async (id: any, onDeleteSuccess: any) => {
  await http
    .delete(`${"/api/v1/trc"}`, {
      params: { id },
    })
    .then((res: any) => {
      onDeleteSuccess();
    });
};

export const LoadTrsList = async (marketSymbol: any, setDatas: any) => {
  if (marketSymbol) {
    await http
      .get(`${"/api/v1/trs/get-by-symbol"}`, {
        params: { marketSymbol },
      })
      .then((res: any) => {
        setDatas(res.data);
      });
  }
};

export const SaveTrs = async (data: any, onSuccess: any) => {
  await http.post(`${"/api/v1/trs"}`, data, {}).then((res: any) => {
    onSuccess();
  });
};

export const DeleteTrs = async (
  id: any,
  marketSymbol: any,
  onDeleteSuccess: any
) => {
  await http
    .delete(`${"/api/v1/trs"}`, {
      params: { id, marketSymbol },
    })
    .then((res: any) => {
      onDeleteSuccess();
    });
};
