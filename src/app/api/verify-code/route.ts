import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();
    try {
       const {username, code} =  await request.json();
       const decodedusername = decodeURIComponent(username)
       const user = await UserModel.findOne({username: decodedusername}) 
       if(!user){
           return Response.json({
               success: false,
               message: "User not found"
           }, {status: 500})
       }
       const isCodeValid = user.verifyCode === code
       const isCCodeNotExpired =  new Date(user.verifyCodeExpiry) > new Date()
       if(isCodeValid && isCCodeNotExpired){
        user.isVerified = true
        await user.save()
        return Response.json({
            success: true,
            message: "Account verified successfully"
        }, {status: 200})
    }
    else if(!isCCodeNotExpired)
     {
        return Response.json({
            success: false,
            message: "Verification code expired"
        }, {status: 500})}
        else{
            return Response.json({
                success: false,
                message: "Incorrect Verification Code"
            }, {status: 500})

        }
        
    } catch (error) {
        console.log("Error verifying user", error);
        return Response.json({
            success: false,
            message: "Error verifying user"
        }, {status: 500})
    }
}