'use client';

import { setCookie } from "cookies-next";
import { useState } from "react";

interface Props {
    defaultTapSelected?: number;
    numOptions?: number;
}

export const TabBar = ({defaultTapSelected=1, numOptions=4}:Props) => {
    const [ selected, setSelected ] = useState(defaultTapSelected);
    const tabOptions = Array.from({length:numOptions}, (_, i) => i);

    const changeTap = (tap:number) => {
        setSelected(tap);
        setCookie('selectedTap', tap.toString());
    }
    return (
        <div className={`grid w-full ${'grid-cols-4'} space-x-2 rounded-xl bg-gray-200 p-2`}>
            {tabOptions.map(option => (
                <div key={option}>
                    <input 
                        type="radio" 
                        id={option.toString()} 
                        className="peer hidden" 
                        checked={selected === option}
                        onChange={() => {}}
                    />
                    <label 
                        onClick={() => changeTap(option)}
                        className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                        {option+1}
                    </label>
                </div>
            ))}
        </div>
    );
}