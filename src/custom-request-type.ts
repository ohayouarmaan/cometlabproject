import { Request } from "express";

export default interface INewRequest extends Request {
   user?: string;
};
