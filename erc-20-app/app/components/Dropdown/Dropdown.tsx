"use client"
import { useEffect, useState } from "react"
import { DrowdownContentProps, DrowdownContentType } from "@/app/types/Dropdown"

export default function Dropdown({dropdownOptions}: any) {
    console.log("ttt", dropdownOptions);

    const [showDropdownOptions, setShowDropdownOptions] = useState<boolean>(false);

    /*const dropdownOptions: DrowdownContentProps[] = [
        {
            "key": "One",
            "value": "1"
        },
        {
            "key": "Two",
            "value": "2"
        },
        {
            "key": "Three",
            "value": "3"
        }
    ];*/
    const [currentOption, setCurrentOption] = useState<DrowdownContentProps>(dropdownOptions[0]);

    return (
        <>
            <div className={`relative grid max-w-[450px]`}>

                {/* Dropdown Header */}
                <div className={`grid max-w-[450px] p-2 border border-solid border-purple-mid rounded`}>
                    <button type={"button"} className={`text-left`}
                        onClick={() => setShowDropdownOptions(!showDropdownOptions)}>{currentOption.key}</button>
                </div>

                {/* Dropdown Options */}
                {showDropdownOptions ? (
                    <>
                        <div className={`grid max-w-[450px] bg-purple-standard border border-solid border-purple-mid rounded absolute top-[42px] left-0 right-0`}>
                            {dropdownOptions.map((option: DrowdownContentProps, index: number) => {
                                return (
                                    <button key={`dropdown-option-container-${index + 1}`}
                                        type={"button"} className={`text-left p-2 block hover:bg-purple-mid`}
                                        onClick={() => {setCurrentOption(option); setShowDropdownOptions(false);}}>
                                        {option.key}
                                    </button>
                                )
                            })}
                        </div>
                    </>
                ) : ("")}
            </div>
        </>
    );
}