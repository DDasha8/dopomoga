import {validationResult} from "express-validator";

export default (req,res, next)=>{
    const errors = validationResult(req)
    if(errors.isEmpty())
        return res.stats(400).json(errors.array())
    next()
}