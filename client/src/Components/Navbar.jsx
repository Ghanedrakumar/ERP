import React from 'react'
const Navbar = () => {
    return (
        <div>
            <div className=" bg-slate-600 p-3">
                
                <div className='flex flex-row items-center justify-between text-white'>
                    {/* <span className='font-bold text-2xl '>Dashboard</span> */}
                    <img src="https://sindphanapublicschool.com/Assets/img/logo-2.png" alt="something wrong" className='w-13 h-13' />
                    <div className='font-bold text-2xl mr-5'>Hii User</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
