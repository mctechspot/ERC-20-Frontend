import { CgSpinnerTwoAlt } from "react-icons/cg";
import { LoadSpinnerType } from "@/app/types/LoadSpinner"

export default function LoadSpinner({colour, size}: LoadSpinnerType) {
    return (
        <>
            <div className={`text-${colour} text-[${size.toString()}px] \
            flex justify-center items-center`}>
                <CgSpinnerTwoAlt className={`spin`} />
            </div>
        </>
    );
}