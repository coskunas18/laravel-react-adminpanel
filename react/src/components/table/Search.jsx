
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";

export default function Search({ onSearch }) {

    const [searching, setSearching] = useState('');

    useEffect(() => {
        onSearch(searching)
    }, [searching]);

    return (
        <div className='flex justify-center gap-4 w-full py-4 relative'>
            <div className='w-full flex items-center'>
                <input type='text'
                    value={searching}
                    onChange={(e) => setSearching(e.target.value)}
                    placeholder='Search...'
                    className='border border-gray-400 bg-slate-400 rounded px-8 py-1 placeholder-slate-700
                  text-gray-800 opacity-90  outline-none' />
                <IoMdSearch size={25} className='text-gray-700 opacity-50 absolute mx-2' />
            </div>
        </div>
    )
}
