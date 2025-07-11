import { NotFoundError } from "../Errors/error.js";
export const notFound=(req,res,next)=>{
    next(new NotFoundError("That Route " +req.url+ "with method "+req.method+" not found"))
}
export default notFound