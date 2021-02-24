import { get } from "axios";

export const getKingdomInfo = async (id) => {
  const res = await get(`http://127.0.0.1:5000/api/v1/kingdoms/${id}/summary`);
  return res.data;
};

export const getKingdoms = async () => {
  const res = await get("http://127.0.0.1:5000/api/v1/kingdoms");
  return res.data;
};
