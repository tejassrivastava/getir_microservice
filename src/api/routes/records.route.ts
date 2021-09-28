import { Request, Response, Router } from "express";
import logger from "../../logger/logger";
import  recordsSchema from "../models/records.model";
import dayjs from 'dayjs'
import formatParser from 'dayjs/plugin/customParseFormat'
dayjs.extend(formatParser)
const recordsRouter = Router();


const validateDate = (date:string) => {
  if(dayjs(date, 'YYYY-MM-DD', true).isValid()){
    return true;
  }else{
    return false;
  }
}

recordsRouter.post("/get", async (req, res) => {  
  logger.info("In posts.route.ts",req.body);
   
  const startDate =  req.body.startDate;
  const endDate = req.body.endDate;
  const minCount = req.body.minCount;
  const maxCount = req.body.maxCount;

  if(!validateDate(startDate)){
    return res.status(200).json({
      msg: "startDate format is invalid"
    });
  }

  if(!validateDate(endDate)){
    return res.status(400).json({
      code:400,
      msg: "endDate format is invalid"
    });
  }

  if(!minCount){
    return res.status(400).json({
      code:400,
      msg: "minCount is missing"
    });
  }

  if(!maxCount){
    return res.status(400).json({
      code:400,
      msg: "maxCount is missing"
    });
  }
  
    try {
      let resp = await recordsSchema.aggregate([{
        $match: {
            createdAt: {
              $gte: new Date(startDate), 
              $lt: new Date(endDate)
            }
        }
    }, { $project: { _id:0, key: 1, createdAt: 1, totalCount: { $sum: "$counts" } } },
    
    {
        $match: {
            totalCount: {
                $gte: minCount,
                $lt: maxCount,
    
            }
        }
    }
    ])
           
      
      if (resp) {
        return res.status(200).json({
          code:0,
          msg: "Success",
          records:resp
        });
      } 

       
      
    } catch (err:any) {
      console.error(err.message);
      return res.status(500).json(
        {
          code:500,
          msg: "Internal Server error " + err.message
        }
        );
    }
  
});

export default recordsRouter;
