interface IDetailTextProps {
    title: string,
    type: string,
    desc: string
}


const DetailText = ({title, type, desc}: IDetailTextProps ) => {
    return ( 
        <>
        <article className="px-5 flex flex-col gap-3 pb-10">
                <h1 className="font-bold text-2xl tracking-widest text-dark-green">{title}</h1>
                <h4 className="text-gray uppercase text-sm">{type}</h4>
                <p className="text-gray text-sm">{desc}</p>
            </article></>
     );
}
 
export default DetailText;