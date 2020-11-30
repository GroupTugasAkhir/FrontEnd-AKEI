import React, { useState } from 'react';

const Tesing = () => {
    const [address, setAddress] = useState('')


    return ( 
        <div>
            Input alamat
            <input className='mt-3' type="text" placeholder='Enter address' />
            <button className='mt-3 btn btn-primary'>get geocode</button>
        </div>
    );
}
 
export default Tesing;