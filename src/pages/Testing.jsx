import React, { useRef, useState } from 'react';
import Axios from 'axios'
import {getDistance} from 'geolib'

const Tesing = () => {
    // const [addForm, setAddForm] = useState({
    //     address: useRef()
    // })

    const address = useRef()
    const [lati, setLatitude] = useState('')
    const [longi, setLongitude] = useState('')
    const [dist, setDist] = useState(0)

    const onGetAddress = () => {
        const data = address.current.value
        console.log(data)
        console.log(encodeURI(data))
        Axios.get('https://api.opencagedata.com/geocode/v1/json?',{
            params:{
                key: 'cdeab36e4fec4073b0de60ff6b595c70',
                q:encodeURI(data)
            }
        }).then(res=>{
            console.log(res.data.results[0])
            setLatitude(res.data.results[0].geometry.lat)
            setLongitude(res.data.results[0].geometry.lng)
            // console.log(res.data.results[0].geometry.lat)
            // console.log(res.data.results[0].geometry.lng)
            console.log(lati)
            console.log(longi)
            onGetDistance()
        }).catch(err=>{
            console.log(err)
        })
    }

    const onGetDistance=()=>{
        const distance = getDistance(
            { latitude: lati, longitude: longi },
            { latitude: -6.21462, longitude: 106.84513 }
            // { latitude: "51° 31' N", longitude: "7° 28' E" }
        )
        setDist(distance)
    }

    return ( 
        <div className='d-flex ml-3' style={{flexDirection:'column'}}>
            Input alamat
            <input className='mt-3' ref={address} type="text" placeholder='Enter address' />
            <button style={{width:400}} className='mt-3 mb-3 btn btn-primary' onClick={onGetAddress}>get geocode</button>
            Jarak anda : {dist} m
        </div>
    );
}
 
export default Tesing;