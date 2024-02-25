"use client";

// import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import { useFormStatus } from "react-dom";


export function SubmitButton({ title, size }) {
    const { pending } = useFormStatus();
    // const pathname = usePathname();

    return (
        <>
            <button
                type="submit"
                className={` "flex justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                ${size === "fit" ? "w-fit" : "w-full"}
                `}
                disabled={pending}
            >
                <p
                    className={` ${pending === true ? "hidden" : ""} `}
                >
                    {title}
                </p>
                <div className={` ${pending === true ? "flex justify-center items-center" : "hidden"}  `}>
                    <p className="mr-2">
                        Please wait...
                    </p>
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white">
                    </div>
                </div>
            </button>
        </>
    );
}

SubmitButton.propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired
};
