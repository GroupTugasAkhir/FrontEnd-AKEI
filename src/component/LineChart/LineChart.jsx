import React, { useEffect } from 'react';
import {Line} from 'react-chartjs-2';

const LineChart=(props)=>{

    
    useEffect(()=>{
        console.log(props.data)
    })

    if(props.data === null){
        return <div>Loadin</div>
    }

    const init = {
        labels: props.data.obj.labels,
        datasets: [
          {
            label: 'Transaction',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(109,109,109,.5)',
            borderWidth: 2,
            data: props.data.obj.data
          }
        ],
    }

    return (
        <div>
            <Line
            data={init}
            height={300}
            width={900}
            options={{
                title:{
                    display:true,
                    text:props.data.obj.title,
                    fontSize:20
                },
                legend:{
                    display:true,
                    position:'bottom'
                }
            }}
            />
        </div>
    );
}

export default LineChart