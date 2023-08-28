import { NextFunction, Request, Response } from "express";
import SQLInjectionService from "../services/SQLInjectionService";
import { config } from "../config";
import ApiError from "../exceptions/ApiErrorException";

export const detectSQLInjection = async (content: any, next: NextFunction) => {
  const sqlInjectionService = new SQLInjectionService(
    config.sql_injection_api_url
  );
  for (let key in content) {
    if (typeof content[key] === "string") {
      const response = await sqlInjectionService.isSqlInjectionQuery(
        content[key]
      );

      if (response) {
        return next(new ApiError(`Sql Injection in Field ${key}`, 400));
      }
    }
  }
  return next();
};

export const detectSQLInjectionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query, params, body } = req;
  console.log(params, query, body);
  const sqlInjectionService = new SQLInjectionService(
    config.sql_injection_api_url
  );

  if (Object.keys(query).length === 0) {
    for (let key in query) {
      if (typeof query[key] === "string") {
        const response = await sqlInjectionService.isSqlInjectionQuery(
          query[key] as any
        );

        if (response) {
          return next(new ApiError(`Sql Injection in Field ${key}`, 400));
        }
      }
    }
  }

  if (Object.keys(params).length === 0) {
    for (let key in params) {
      if (typeof params[key] === "string") {
        const response = await sqlInjectionService.isSqlInjectionQuery(
          params[key] as any
        );

        if (response === true) {
          return next(new ApiError(`Sql Injection in Field ${key}`, 400));
        }
      }
    }
  }
  if (Object.keys(body).length === 0) {
    for (let key in body) {
      if (typeof body[key] === "string") {
        const response = await sqlInjectionService.isSqlInjectionQuery(
          body[key] as any
        );

        if (response) {
          return next(new ApiError(`Sql Injection in Field ${key}`, 400));
        }
      }
    }
  }
  return next();
};
