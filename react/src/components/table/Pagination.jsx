import { MdSkipNext } from "react-icons/md";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";


export default function Pagination({ meta, current_page, per_page, perPageHandle, next, prev, last, begin }) {


    return (

        <div className="flex items-center h-[50px]">
            <div className="p-3">
                <label className="text-white" htmlFor="">Rows per page: </label>
                <select value={per_page} className="rounded" onChange={(e) => perPageHandle(e.target.value)}>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                    <option value={30}>30</option>
                </select>
            </div>
            <div className="flex justify-center p-4 text-white gap-3 mx-auto">

                <div
                    className={`${current_page !== 1 ? `cursor-pointer select-none hover:ring-1 scale-x-[-1]
                    hover:ring-slate-600 rounded-full hover:bg-white/10` : 'scale-x-[-1] opacity-35 pointer-events-none'} `}
                    onClick={begin}>
                    <MdSkipNext size={28} />
                </div>



                <div className={`${current_page > 1 ? `cursor-pointer select-none hover:ring-1
                    hover:ring-slate-600 rounded-full hover:bg-white/10` : 'opacity-35 pointer-events-none '} `}
                    onClick={prev}>
                    <MdOutlineNavigateBefore size={28} />
                </div>



                <div className={`${current_page !== meta.last_page ? `cursor-pointer select-none hover:ring-1
                    hover:ring-slate-600 rounded-full hover:bg-white/10` : 'opacity-35  pointer-events-none '} `} onClick={next}>
                    <MdOutlineNavigateNext size={28} />
                </div>



                <div className={`${current_page !== meta.last_page ? `cursor-pointer select-none hover:ring-1
                    hover:ring-slate-600 rounded-full hover:bg-white/10` : 'opacity-35 pointer-events-none'} `} onClick={last}>
                    <MdSkipNext size={28} />
                </div>


            </div>
            <div className="text-white p-3">
                <p>{meta.from} - {meta.to} of {meta.total}  </p>
            </div>
        </div >


    )
}
