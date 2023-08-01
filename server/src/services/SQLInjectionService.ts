import axios from "axios";

class SQLInjectionService {
  private baseURL: string;
  private isSQLInjected: string;

  constructor(sqlInjectionApi: string) {
    this.baseURL = sqlInjectionApi;
    this.isSQLInjected = "SQL Injection";
  }

  async isSqlInjectionQuery(sentence: string) {
    const response = await axios.post<{ result: string }>(this.baseURL, {
      sentence,
    });

    if (response.data.result === this.isSQLInjected) {
      return true;
    }

    return false;
  }
}

export default SQLInjectionService;
