import { CancelToken, get } from "axios";

// export class ApiService {
//   constructor(url = "http://127.0.0.1:3000/") {
//     this.url = url;
//     this.cancelToken = CancelToken.source();
//   }

//   async httpGet(endpoint = "") {
//     this.cancelToken.cancel("Cancelled Ongoing Request");
//     this.cancelToken = CancelToken.source();
//     const response = await get(`${this.url}${endpoint}`, {
//       cancelToken: this.cancelToken.token,
//     });
//     return response.data;
//   }

//   getKingdoms() {
//     return this.httpGet("kingdoms");
//   }

//   getKingdomSummary(id) {
//     return this.httpGet(`kingdoms/${id}/summary`);
//   }
// }
export const getKingdoms = async () => {
  const res = await get("http://127.0.0.1:5000/api/v1/kingdoms");
  return res.data;
};
