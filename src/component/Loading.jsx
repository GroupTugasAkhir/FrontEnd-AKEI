import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

class Loading extends Component {
    render() { 
        return (
            <div style={{height:'100vh'}} className='d-flex justify-content-center align-items-center'>
                <Loader type="Grid" color="#72ceb8" height={100} width={100} />
            </div>
          );
    }
}
 
export default Loading;