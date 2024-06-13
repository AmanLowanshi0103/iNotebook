// Middleware for converting the token id to 
const jwt = require('jsonwebtoken');
const SignJWT="Test123" // creating the signature for the jasonwebtoken to convert data in the token

const fectchuser= (req,res,next)=>
{
    const token=req.header("token")// taking token from the header of the request
    if(!token)
    {
        res.status(401).send({err:"please authenticate withthe help of valid token"})// sedning the bad request when invalid token has been used by the user 
    }
    try {
        const data=jwt.verify(token,SignJWT)// extracting the ID of the user from the Jasonweb token
        // console.log(data)
        req.user=data.user // Assigning the ID = rquest user
        // console.log(data.user)
        next();
    } catch (error) {
        res.status(401).send({err:"please authenticate withthe help of valid token"}) 
        }
}

module.exports=fectchuser;