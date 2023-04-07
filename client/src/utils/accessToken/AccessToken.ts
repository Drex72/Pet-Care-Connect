class AccessToken {
  private accessToken: string;

  constructor() {
    this.accessToken = "";
  }

  getAccessToken() {
    return this.accessToken;
  }
  setAccessToken(newAccessToken: string) {
    this.accessToken = newAccessToken;
    return;
  }
}

const accessToken = new AccessToken();
export default accessToken;
