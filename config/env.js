const getDotEnvPath = (env) => {
    switch (env?.toUpperCase()) {
      case "TEST":
        return '.env.test';
      case "DEVELOPMENT":
        return ".env";
      default:
        return '.env.test';
    }
  }
  
  module.exports = getDotEnvPath;
  