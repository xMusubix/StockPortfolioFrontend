import http from "@/app/_components/http";

export const LoadDashboard = async (setDatas: any) => {
  await http.get(`${"/api/v1/dashboard"}`).then((res: any) => {
    setDatas(res.data);
  });
};
