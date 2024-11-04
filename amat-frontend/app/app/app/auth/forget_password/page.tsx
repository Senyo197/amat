import Link from "next/link";
import Image from "next/image";
import logo from "../../_assets/logo.png";

export default function Forget_password () {
    return (
        <div className="mt-32 mb-32 flex justify-center text-blue-900">
            <div className="w-96">
                <div className='flex justify-center'>
                    <Image src={logo} alt='AMaT-HCL' className='w-24 mb-9'/>
                </div>
                <div className="mb-9 text-center">
                    <div className="font-extrabold text-2xl mb-2">Password Reset</div>
                    <div>Enter email address to reset password</div>
                </div>
                <form action='#' id="Forget_password" className="pb-10">
                    <label>Email Address</label><br/>
                    <input id="email" autoComplete="email" required type="email" placeholder="Enter your email address" name="email" className="border-solid border-2 rounded-md w-full mb-3 p-1 text-black text-sm"/><br/>
                </form>
                <div className="flex justify-center pb-24">
                    <button type="submit" form="Forget_password" value="Submit" className=" text-white p-1 rounded-lg w-full bg-blue-900">Reset Password</button>
                </div>
                <div className="flex justify-center mb-14 text-gray-500">Have an account? <Link href="/login" className="pl-1 text-blue-900 font-bold"> Sign In</Link></div>
            </div> 
        </div>
    )
}