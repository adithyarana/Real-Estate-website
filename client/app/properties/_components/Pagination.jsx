import React from 'react'

const Pagination = ({currentPage, totalpage, onpageChange}) => {


    const generatepagenumber=()=>{

        // this function only show the 10 pages at a time
        const visiblepages=10;
        let start=Math.max(1,currentPage-Math.floor(visiblepages/2));
        let end=Math.min(totalpage,currentPage+Math.floor(visiblepages/2));

        const pages=[];

        for(let i=start;i<=end;i++){
            pages.push(i);
        }

        return pages;
    }

  return (
    <div className='justify-center flex items-center gap-2 '>
        <button 
        className='bg-green-600 font-body text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-x-2 hover:bg-green-700 transition cursor-pointer'
        onClick={()=>onpageChange(currentPage-1)} disabled={currentPage===1}>Previous</button>

        {generatepagenumber().map((page)=>(
            <button key={page} className='bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-x-2 hover:bg-green-700 transition cursor-pointer' 
            onClick={()=>onpageChange(page)}>{page}</button>
        ))}

        <button 
        className='bg-green-600 text-white font-body px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-x-2 hover:bg-green-700 transition cursor-pointer'
        onClick={()=>onpageChange(currentPage+1)} disabled={currentPage===totalpage}>Next</button>
    </div>
  )
}

export default Pagination