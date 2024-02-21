import { useMediaQuery } from '@react-hook/media-query'


export default function TableMobile({ head, body }) {

    const tableHeight = useMediaQuery('(max-height:900px)');

    return (
        <div className="text-white rounded h-[380px] w-full overflow-auto">
            {body.map((items, key) => (
                <section key={items} className="border-b odd:bg-slate-500 even:bg-slate-400">
                    {items.map((item, key) => (
                        <div key={key} className="text-sm flex  items-center px-2 gap-x-2 py-1">
                            <h6 className="min-w-[100px] font-semibold">{head[key].name}</h6>
                            {Array.isArray(item) ? (
                                <div className="flex items-center gap-2">
                                    {item.map((subItem, subIndex) => (
                                        <span key={subIndex}>{subItem}</span>
                                    ))}
                                </div>
                            ) : item}
                        </div>
                    ))}
                </section>
            ))}
        </div>
    )
}
