export interface ApplicationConfiguration {
  baseApiUrl: string;
  apiVersionUrl: string;
  apiRouters: ApiRouters;
}

export interface ApiRouters {
  registerUser: string;
}
