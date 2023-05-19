const conn = require("../connection");
const util = require("util");

class AdminAuth{

    async auth(req,res,next){
        const query = util.promisify(conn.query).bind(conn);
        const {token}= req.headers;
        const admin =await query("select * from admin where token = ?",[token]);
        if(admin[0]){
            next();
        }else{
            res.status(403).json({
                message :"you are not authorized to access this route "
            });
        }
    }

}

module.exports=AdminAuth;
