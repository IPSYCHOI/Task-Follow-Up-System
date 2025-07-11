export const validateKeys=(keys)=>{
    return (req,res,next)=>{
        const allKeys=Object.keys(req.body)
        const notUsedKeys=allKeys.filter(k=>!keys.includes(k))
        if (notUsedKeys.length>0){
            return res.status(400).json({
                message:`key/s [ ${notUsedKeys.join(`-`)} ] is not allowed`
            })
        }
        next()
    }
}