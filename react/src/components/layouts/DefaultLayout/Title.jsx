
export default function Title({ title, children }) {
    return (
        <div className="bg-slate-300 h-20 px-40 py-5 flex justify-between relative -mx-20  ">
            <p className="text-3xl font-semibold">{title}</p>
            {children}
        </div>
    )
}
