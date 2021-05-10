import React, {useEffect, useState} from 'react';
import {Line} from "react-chartjs-2";



const LineChart = (props) => {

    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);

    useEffect( () => {
        console.log('props updated');
        console.log(props)
        setLabels(props.labels);
        setData(props.data);
    }, [props])

    return (
        <Line
            data={{
                labels: labels,
                datasets: [
                    {
                        type: "line",
                        label: "Active Pleasant",
                        fill: false,
                        lineTension: 0.45,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 0.5,
                        data: data[0]
                    }, {
                        type: "line",
                        label: "Active Unpleasant",
                        fill: false,
                        lineTension: 0.45,
                        backgroundColor: 'rgba(90,20,20,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 0.5,
                        data: data[1]
                    }, {
                        type: "line",
                        label: "Inactive Unpleasant",
                        fill: false,
                        lineTension: 0.45,
                        backgroundColor: 'rgba(0,10,80,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 0.5,
                        data: data[2]
                    }, {
                        type: "line",
                        label: "Inactive Pleasant",
                        fill: false,
                        lineTension: 0.45,
                        backgroundColor: 'rgba(0,150,0,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 0.5,
                        data: data[3]
                    }, {
                        type: "line",
                        label: "No Face",
                        fill: false,
                        lineTension: 0.45,
                        backgroundColor: 'rgba(128,128,128,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 0.5,
                        data: data[4]
                    }
                ]
            }}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    enabled: true
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 10
                            }
                        }
                    ]
                }
            }}/>)
}


export default LineChart;