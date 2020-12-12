import React, { useEffect, useState } from 'react'
import { Pie, defaults } from 'react-chartjs-2'

const PieChart = (props) => {
    
    const [legend,setLegend] = useState(null)
    const [value,setValue] = useState(null)
    const [color,setColor] = useState(null)

    useEffect(()=>{
        // setColor(props.data.obj.color)
        // setLegend(props.data.obj.legend)
        // setValue(props.data.obj.raw_data)
    },[])

    // if(legend === null && value === null && color === null){
    //     return <div>Loading</div>
    // }

    return (
        <div>
        <Pie
            data={{
            labels: props.data.obj.legend,
            datasets: [
                {
                data: props.data.obj.raw_data,
                backgroundColor: props.data.obj.color,
                borderColor: props.data.obj.color,
                borderWidth: 1,
                },
            ],
            }}
            height={200}
            width={300}
            options={{
            maintainAspectRatio: false,
            title:{
                display: true,
                text: props.data.obj.title,
                position: "bottom"
            },
            legend:{
                position:"right"
            }
            }}
        />
        </div>
    )
}

export default PieChart