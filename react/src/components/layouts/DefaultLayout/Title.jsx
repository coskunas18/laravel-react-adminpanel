import { useMediaQuery } from '@react-hook/media-query'



export default function Title({ title, children }) {
    const isMobile = useMediaQuery('(min-width:800px)');
    return (
        <>
            <div className="bg-slate-300 h-20 md:px-40 py-5 flex justify-between relative md:-mx-20  ">
                <p className="text-3xl font-semibold">{title}</p>
                {children}
            </div>

        </>
    )
}
