const bycrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const AdminModel=require("../models/adminModel");
const adminModel=new AdminModel();

class Login {

    async login(req, res) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ errors: errors.array() });
            }
            const admin = await  adminModel.getAdminByEmail(req.body.email);
            if(admin.length === 0){
                return res.status(404).json({
                    errors:[
                        {error : "email is not found"},
                    ],
                })
            }
            const checkPassword =await bycrypt.compare(req.body.password,admin[0].password);
            if(!checkPassword){
                return res.status(404).json({
                    errors:[
                        {error : "password is not found"},
                    ],
                })
            }
            return res.status(200).json("success");
        }catch(err){
            res.status(404).json(err);
        }
    }

}
module.exports = Login;