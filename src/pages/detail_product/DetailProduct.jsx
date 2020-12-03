import React from 'react';
import Header from './../../component/header/Header'

import Testimg from './../../assets/mainregimg.jpg'

const DetailProduct = () => {

    return (
        <>
            <Header style={{backgroundColor: '#72ceb8'}}/>
            <div style={{marginTop: '80px', marginInline: '50px'}}>
                <div className='detailsection'>
                    <div className='det-left-side'>
                        <img src={Testimg} width='100%' height='100%' alt="productimg"/>
                    </div>
                    <div className='det-right-side'>
                        halo
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailProduct