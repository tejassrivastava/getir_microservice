import logger from "../../logger/logger";
import recordsSchema from "../models/records.model";

const getUsers = async(startDate: string | number | Date,endDate: string | number | Date,minCount: any,maxCount: any) => {
    logger.info("In records.services.ts");
    try{
    let resp = await recordsSchema.aggregate([
            {
              $match: {
                createdAt: {
                  $gte: new Date(startDate),
                  $lt: new Date(endDate),
                },
              },
            },
            {
              $project: {
                _id: 0,
                key: 1,
                createdAt: 1,
                totalCount: { $sum: "$counts" },
              },
            },
      
            {
              $match: {
                totalCount: {
                  $gte: minCount,
                  $lt: maxCount,
                },
              },
            },
          ]);
      
          if (resp) {
            return resp;
          }
        } catch(error){
            throw Error('Error while DB Query')
        }
}

export default {getUsers}
