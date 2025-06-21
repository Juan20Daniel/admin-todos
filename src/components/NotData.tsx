import React from 'react'

interface Props {
    message: string;
}

export const NotData = ({message}:Props) => {
    return (
        <div className='w-full h-[300px] flex justify-center items-center bg-gray-100 rounded-2xl'>
            <p className='text-2xl text-gray-600'>{message}</p>
        </div>
    );
}
