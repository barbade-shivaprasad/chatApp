const userModel = require("../models/user");

class userService{
    static getSocId=async(remail)=>{

        try{
            let pipeline = [{$match:{email:remail}},{$project:{_id:0,socId:1}}]
            let res = await userModel.aggregate(pipeline);
            return res[0].socId;
        }
        catch(err){
            return 0;
        }
    }
}

module.exports = userService;