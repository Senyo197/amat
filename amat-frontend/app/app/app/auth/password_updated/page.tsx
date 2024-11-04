import Link from "next/link";
import { FaCircleCheck } from "react-icons/fa6";
export default function Password_updated () {
    return (
        <div className="mt-32 mb-20 flex justify-center items-center h-96">
            <div className="text-center">
                <div className="flex justify-center text-green-500">
                    <FaCircleCheck className="size-16 mb-3"/>
                </div>
                <div className="font-serif italic font-bold mb-11">Password Updated!</div>
                <div className="font-serif">Your password has been changed successfully</div>
                <div className="font-serif">Use your new password to <Link href="/login" className="text-blue-900">Sign In</Link> </div>
                <div className="mt-9">
                    <Link href="/auth/login" className="bg-green-500 rounded-xl p-2 pr-8 pl-8">Sign In</Link>
                </div>
            </div>
        </div>
    )
}