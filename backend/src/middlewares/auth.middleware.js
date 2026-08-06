import jwt from "jsonwebtoken";
 

export const authUser =(req , res,next) => {
   const token = req.cookies.token ;

   if(!token){
    return res.status(401).json({
        success: false,
        message: "Unauthorized access. Please log in.",
        err:"no token provided"
    });
   }

   try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET );   
    req.user = decoded;
    next();
 
   }catch(error){
    
        return res.status(401).json({
            success: false,
            message: "Unauthorized access. Invalid token.",
            err:"invalid token"
        });
    
}
}