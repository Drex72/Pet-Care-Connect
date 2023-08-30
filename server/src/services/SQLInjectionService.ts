import axios from "axios";

class SQLInjectionService {
  private baseURL: string;
  private isSQLInjected: string;

  constructor(sqlInjectionApi: string) {
    this.baseURL = sqlInjectionApi;
    this.isSQLInjected = "SQL Injection";
  }

  async isSqlInjectionQuery(sentence: string) {
    console.log(sentence, 'sentency')
    const response = await axios.post<{ result: string }>(this.baseURL, {
      sentence,
    });
    console.log(response.data, sentence)

    if (response.data.result === this.isSQLInjected) {
      return true;
    }

    return false;
  }
}

export default SQLInjectionService;

async function fetchSqlInjection(sentence: string) {

  try {
    const response = await axios.post(
      "https://sqlinjection.onrender.com/v1/predict/",
      { sentence: sentence }
    );
    if (response.data.result === "SQL Injection") {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
}
