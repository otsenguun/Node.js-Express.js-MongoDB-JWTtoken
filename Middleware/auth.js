const jwt = require('jsonwebtoken')
const User = require('../Model/userModel')

const auth = async(req, res, next) => {
    
    const token = 
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.cookies.token;

    // if(req.header('Authorization') == null){
    //    res.status(401).json({ error: 'Not authorized to access this resource' })
    // }
    // else{
    //     const token = req.header('Authorization').replace('Bearer ', '') 
    //     const data = jwt.verify(token, process.env.JWT_KEY)
        
    //     try {

    //         const user = await User.findOne({ _id: data._id, 'tokens.token': token })
    //         if (!user) {
    //             throw new Error()           
    //         }
    //         req.user = user
    //         req.token = token
    //         console.log('done');
    //         next()
    //     } catch (error) {
    //         res.status(401).send({ error: 'Not authorized to access this resource' })
    //     }
    // }

    console.log(token);

    if(!token){
        res.status(401).json({ error: 'Not authorized to access this resource' })
    }else{

        const data = jwt.verify(token, process.env.JWT_KEY)
        
        try {
            
            const user = await User.findOne({ _id: data._id, 'tokens.token': token })
            if (!user) {
                throw new Error()           
            }
            req.user = user
            req.token = token
            console.log('done');
            next()
        } catch (error) {
            res.status(401).send({ error: 'Not authorized to access this resource' })
        }
    }

}
module.exports = auth