import { useMediaQuery, useMediaQueries } from '@react-hook/media-query'
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from "react-icons/ti";
import Pagination from './Pagination';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import { useState } from 'react';
import TableMobile from "./DefaultMobileTable";
export default function DefaultTable({ body, head, status, currentPage, perPage,
    meta, perPageHandle, next, prev, last, begin }) {

    const isMobile = useMediaQuery('(max-width:800px)');


    if (!body || body?.length === 0) {
        return (
            <div className="p-4 text-center text-2xl font-semibold text-slate-400">
                Gösterilecek veri bulunmuyor.
            </div>
        )
    }


    return (
        <div>
            {status == "loading" && (
                <div className=' mx-auto'>
                    <LoadingSpinner />
                </div>

            )}

            <div className={`${status == "success" ? '' : 'hidden h-auto'}`}>
                <div className="w-full rounded h-[600px] overflow-auto ">
                    {isMobile && <TableMobile head={head} body={body} />}
                    {!isMobile && (
                        <table className="w-full bg-slate-300 ">
                            <thead className="bg-slate-600 sticky top-0 ">
                                <tr>
                                    {head.map((h, key) => (
                                        <th width={h.width} className="text-left text-md text-white font-semibold p-3" key={key}>
                                            <div className="flex items-center gap-x-2">
                                                {h.name}
                                            </div>

                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {body && body.map((items, key) => (
                                    <tr key={key} className="group border-t border-slate-600 odd:bg-slate-400">
                                        {items.map((item, key) => (
                                            <td key={key} className="p-3 text-sm text-left group-hover:bg-slate-800
                                                    group-hover:cursor-pointer group-hover:text-white">{Array.isArray(item) ?
                                                    <div className="flex items-center gap-2">
                                                        {item}
                                                    </div> : item
                                                }</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {body && body.length === 0 && (
                        <div className="text-center w-full bg-slate-300 font-semibold text-2xl p-2">
                            Herhangi bir veri bulunamadı
                        </div>
                    )}
                </div>

            </div>
            <Pagination current_page={currentPage} per_page={perPage} meta={meta}
                perPageHandle={perPageHandle} next={next} prev={prev} last={last}
                begin={begin} />
        </div>
    )
}
