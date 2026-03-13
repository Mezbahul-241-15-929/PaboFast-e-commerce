import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div>
            <nav className='flex justify-center bg-slate-600'>
                <ul className='flex justify-between w-1/2'>
                <Link href="/"><li>Home</li></Link>
                <Link href="/about"><li>About</li></Link>
                <Link href="/contact"><li>Contact</li></Link>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;