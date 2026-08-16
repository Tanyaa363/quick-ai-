import { neon } from "@neondatabase/serverless";

const dbUrl = process.env.DATABASE_URL;

const isInvalidUrl =
  !dbUrl ||
  dbUrl.includes("localhost:5432") ||
  dbUrl.includes("user:password@localhost") ||
  dbUrl.includes("your_database_url");

const getSqlInstance = () => {
  if (isInvalidUrl) {
    const errorFn = (...args) => {
      throw new Error(
        "Database Error: DATABASE_URL is missing or using an unconfigured placeholder in server/.env. Please configure a valid Neon database URL from https://neon.tech."
      );
    };
    errorFn.query = errorFn;
    return errorFn;
  }

  const sqlClient = neon(dbUrl);

  // Return a proxy that catches low-level network errors and wraps them with helpful messages
  const handler = {
    apply(target, thisArg, argArray) {
      try {
        const result = sqlClient(...argArray);
        if (result && typeof result.catch === "function") {
          return result.catch((err) => {
            if (
              err.message &&
              (err.message.includes("fetch failed") ||
                err.message.includes("ECONNREFUSED") ||
                err.message.includes("Error connecting to database"))
            ) {
              throw new Error(
                "Database Connection Failed: Unable to connect to Neon PostgreSQL. Please check your DATABASE_URL in server/.env and ensure your database is active."
              );
            }
            throw err;
          });
        }
        return result;
      } catch (err) {
        throw err;
      }
    },
    get(target, prop, receiver) {
      if (prop === "query") {
        return async (...args) => {
          try {
            return await sqlClient.query(...args);
          } catch (err) {
            if (
              err.message &&
              (err.message.includes("fetch failed") ||
                err.message.includes("ECONNREFUSED") ||
                err.message.includes("Error connecting to database"))
            ) {
              throw new Error(
                "Database Connection Failed: Unable to connect to Neon PostgreSQL. Please check your DATABASE_URL in server/.env and ensure your database is active."
              );
            }
            throw err;
          }
        };
      }
      return Reflect.get(target, prop, receiver);
    },
  };

  return new Proxy(sqlClient, handler);
};

const sql = getSqlInstance();

export default sql;


