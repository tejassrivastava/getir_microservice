import { Request, Response, Router } from "express";
import logger from "../../logger/logger";
import dayjs from "dayjs";
import formatParser from "dayjs/plugin/customParseFormat";
import recordsServices from "../services/records.services";
dayjs.extend(formatParser);


const validateDate = (date: string) => {
    if (dayjs(date, "YYYY-MM-DD", true).isValid()) {
      return true;
    } else {
      return false;
    }
  };

const getRecords =  async(req:any,res:any,next:any) => {
    
   
        logger.info("In records.controller.ts", req.body);
      
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const minCount = req.body.minCount;
        const maxCount = req.body.maxCount;
      
        if (!validateDate(startDate)) {
          return res.status(400).json({
            msg: "startDate format is invalid",
          });
        }
      
        if (!validateDate(endDate)) {
          return res.status(400).json({
            code: 400,
            msg: "endDate format is invalid",
          });
        }
      
        if (!minCount) {
          return res.status(400).json({
            code: 400,
            msg: "minCount is missing",
          });
        }
        if (typeof minCount !== "number") {
          return res.status(400).json({
            code: 400,
            msg: "minCount should be an positive integer",
          });
        }
      
        if (!maxCount) {
          return res.status(400).json({
            code: 400,
            msg: "maxCount is missing",
          });
        }
      
        if (typeof maxCount !== "number") {
          return res.status(400).json({
            code: 400,
            msg: "maxCount should be an positive integer",
          });
        }
        try {
          let recordsResponse = await recordsServices.getUsers(startDate ,endDate,minCount,maxCount);
          if (recordsResponse) {
            return res.status(200).json({
              code: 0,
              msg: "Success",
              records: recordsResponse,
            });
          }
        } catch (err: any) {
          console.error(err.message);
          return res.status(500).json({
            code: 500,
            msg: "Internal Server error " + err.message,
          });
        }
      }









export default {getRecords};