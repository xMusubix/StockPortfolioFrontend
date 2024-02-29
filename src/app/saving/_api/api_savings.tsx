import http from "@/app/_components/http";

export const LoadTrSavingsList = async (setDatas: any) => {
  await http.get(`${"/api/v1/trsavings"}`).then((res: any) => {
    setDatas(res.data);
  });
};

export const LoadTrSavingsSummaryList = async (setDatas: any) => {
  await http.get(`${"/api/v1/trsavings/summary"}`).then((res: any) => {
    setDatas(res.data);
  });
};

export const SaveTrSavings = async (data: any, onSuccess: any) => {
  await http.post(`${"/api/v1/trsavings"}`, data, {}).then((res: any) => {
    onSuccess();
  });
};

export const DeleteTrSavings = async (id: any, onDeleteSuccess: any) => {
  await http
    .delete(`${"/api/v1/trsavings"}`, {
      params: { id },
    })
    .then((res: any) => {
      onDeleteSuccess();
    });
};
