declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_AUTH: string;
    }
  }
}
