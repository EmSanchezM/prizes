import { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod";

const validate =
  (schema: ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: unknown) {
      if (e instanceof ZodError) {
        res.status(400).send(e.issues);
        return;
      }
      next(e);
    }
  };

export default validate;
