const UserModel = require('../model/usersModel')

exports.createNewUserController = async (req,res)=>{
    try{
        const {name ,email, password} = req.body; 
        if(!name || !email || !password){ throw new Error('all fields are mandatory')}
        const newUser = await UserModel.create({
            
            name ,email, password
        })
        res.status(201).json({UserAddedResponse:newUser})
    }
    catch(err){
        //console.log(`error ${err} in creating new user. caught in line 13 usercontroller`)
        res.status(500).json({error:err})
    }
}








//Login Page Controller
exports.authenticateUserController = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are mandatory" });
      }
      const user = await UserModel.findOne({ where: { email } });
      if (user) {
        await bcrypt.compare(password, user.password, (hasherr, hashresponse) => {
          if(hasherr){
            return res.status(500).json({ success:false,message: "Something went wrong in authentication" });
          }
          if (hashresponse == true) {
            return res.status(200).json({ user, message: "User Logged in successfully" });
          } 
          else if(hashresponse == false) {
            return res.status(401).json({ message: "User not authorized. Password Incorrect." });
          }
        });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  };