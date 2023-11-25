export interface ApplicationConfiguration {
  baseApiUrl: string;
  nodeApiVersionUrl: string;
  apiRouters: ApiRouters;
}

export interface ApiRouters {
  registerUser: string;
  requestZohoOauthUrl: string;
  getZohoAccessToken: string;
}
