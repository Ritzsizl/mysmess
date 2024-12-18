import { resend } from "@/lib/resend";

import VerificationEmail from "../../emails/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";
import { log } from "console";

export async function sendVerficationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'yonboarding@send.dev',
            to: email,
            subject: 'Mystry message | Verification code',
            react: VerificationEmail({username, otp: verifyCode}),
          });
        return {success: true, message: 'Verification Email sent successfully'}
    } catch (emailError) {
        console.log("Error Sending Verification Email", emailError)
        return {success: false, message: 'Failed to send verification email'}
        
    }
}

