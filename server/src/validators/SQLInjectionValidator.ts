import { NextFunction, Request, Response } from "express";

import { detectSQLInjection } from "../utils/detectSQLInjection";

class SQLInjectionValidation {
  async queryContentValidation(req: Request, _: Response, next: NextFunction) {
    // const { query } = req;

    // return await detectSQLInjection(query, next);
  }

  async paramsContentValidation(req: Request, _: Response, next: NextFunction) {
    // const { params } = req;

    // return await detectSQLInjection(params, next);
  }

  async bodyContentValidation(req: Request, _: Response, next: NextFunction) {
    // const { body } = req;

    // return await detectSQLInjection(body, next);
  }
}

const sqlInjectionValidation = new SQLInjectionValidation();
export default sqlInjectionValidation;
