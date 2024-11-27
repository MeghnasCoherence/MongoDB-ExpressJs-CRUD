import UserModels from "../models/User.js"

const Createuser=async(req,res)=>{
    try {
    const {name,lastname,email,phone}=req.body

    const NewUser=new UserModels({
        name,lastname,email,phone
    })
    await NewUser.save()
    res.status(200).json({success:true,Message:'User Created Successfully',NewUser})
    } catch (error) {
        res.status(500).json({success:false,Message:'Internal Server Error',NewUser})

    }
}

//read api
const GetUser=async(req,res)=>{
    try {
        const user=await UserModels.find()
        if(!user){
            return res.status(404).json({success:false,message:'User not found'})
        }
        res.status(200).json({success:true,user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:'Internal server error'})
    }
}

//update api

const UpdateUser=async(req,res)=>{
    try {
        const UserId=req.params.id;
        const updatedUser=await UserModels.findByIdAndUpdate(UserId,req.body,{new:true})

        if(!updatedUser){
            return res.status(404).json({success:false,message:"User not found"})
        }

        res.status(200).json({success:true,message:"user updated successfully",updatedUser})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}

//Delete Api

const DeleteUser=async(req,res)=>{
    try {
        const UserId=req.params.id
        const deletedUser=await UserModels.findByIdAndDelete(UserId)
        if(!deletedUser){
            return res.status(404).json({success:false,message:"User not found"})
        }

        res.status(200).json({success:true,message:'User deleted successfully'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}

export {Createuser,GetUser,UpdateUser,DeleteUser}