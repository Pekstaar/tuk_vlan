const Error = require('../models/ErrorModel');
const { getErrorMessage } = require("../middleware/errorMiddleWare");

const create=async(req,res,next)=>{
    let Error = new Error({error:req.body})

    try{
        let error = await Error.save();

        res.json(error)
    } catch (err){
        return res.status(400).json({
            error: getErrorMessage(err),
        })
    }
}

module.exports = { create };