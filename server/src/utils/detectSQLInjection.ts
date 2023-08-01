import { NextFunction, Request, Response } from "express";
import SQLInjectionService from "../services/SQLInjectionService";
import { config } from "../config";
import ApiError from "../exceptions/ApiErrorException";

export const detectSQLInjection = async (content: any, next: NextFunction) => {
  const sqlInjectionService = new SQLInjectionService(
    config.sql_injection_api_url
  );
  for (let key in content) {
    const response = await sqlInjectionService.isSqlInjectionQuery(
      content[key]
    );

    if (response) {
      return next(new ApiError(`Sql Injection in Field ${key}`, 400));
    }

  }
  return next();
};
