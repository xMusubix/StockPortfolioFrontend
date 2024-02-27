import http from "@/app/_components/http";

export const LoadTrsavingList = async (setDatas: any) => {
  await http.get(`${"/api/v1/trsaving"}`).then((res: any) => {
    setDatas(res.data);
  });
};

export const LoadTrsavingSummaryList = async (setDatas: any) => {
  await http.get(`${"/api/v1/trsaving/summary"}`).then((res: any) => {
    setDatas(res.data);
  });
};

export const SaveTrsaving = async (data: any, onSuccess: any) => {
  await http.post(`${"/api/v1/trsaving"}`, data, {}).then((res: any) => {
    onSuccess();
  });
};

export const DeleteTrsaving = async (id: any, onDeleteSuccess: any) => {
  await http
    .delete(`${"/api/v1/trsaving"}`, {
      params: { id },
    })
    .then((res: any) => {
      onDeleteSuccess();
    });
};
