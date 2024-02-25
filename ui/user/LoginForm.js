"use client";

import Link from "next/link";
import { SubmitButton } from "./SubmitButton";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userLogin } from "@/actions/user/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const LoginForm = () => {
    const [state, loginAction] = useFormState(userLogin, null);
    const router = useRouter();

    useEffect(() => {
        if (state?.status !== 200) {
            toast.error(state?.message, {
                position: "top-right",
                autoClose: 1800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                    document.getElementById("loginForm").reset();
                },
            });
        }
        else if (state?.status === 200) {
            toast.success(state?.message, {
                position: "top-right",
                autoClose: 800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                onClose: () => {
                    document.getElementById("loginForm").reset();
                    router.replace("/");
                },
            });
        }
    }, [state]);

    return (
        <>
            <div className="min-h-screen">
                <ToastContainer />
                <div className="flex flex-col min-h-full justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center justify-center">
                        <Image src="/logo.svg" alt="logo" height={10} width={10}
                            style={{ width: "4rem" }}
                            priority={true}
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login to your Account</h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action={loginAction} className="space-y-6" id="loginForm">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50" />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                    <div className="text-sm">
                                        <Link href={"/forgotpassword"} className="font-semibold text-blue-600 hover:text-blue-500" >
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50" />
                                </div>
                            </div>

                            <div>
                                <SubmitButton title="Log in" size="full" />
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Donot have an acccount? &nbsp;
                            <Link href={"/signup"} className="font-semibold leading-6 text-blue-600 hover:text-blue-500" >
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default LoginForm;