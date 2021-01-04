const jwt = require("jsonwebtoken");
exports.requireSignIn = (req, res, next) => {
    console.log(req.headers.authorization)
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        req.user = decoded;
       
    }else{
        return res.status(400).json({message:'Authorization Required'})
    }
    next()
   
   
}

exports.userMiddleware = (req, res, next) =>{
    if(req.user.role !=='user'){
        console.log(req.user)
        return res.status(400).json({message:"User Access Denied"})
    }
    next()
}

exports.adminMiddleware = (req, res, next) =>{
    if(req.user.role !=='admin'){
        console.log(req.user)
        return res.status(400).json({message:"Admin Access Denied"})
    }
    next()
}