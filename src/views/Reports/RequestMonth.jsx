import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";

import { requestMonth } from '../../services/ReportsService';

const RequestMonth = ({ active }) => {
    const [data, setData] = useState([])
    useEffect(() => {
        async function getReport() {
            const response = await requestMonth();
            let data_format = response.data.map((item) => {
                return [item.Mês, parseInt(item.Valor)]
            })
            data_format.unshift(['Mês', 'Valor']);
            setData(data_format);
        }
        getReport();
    }, [active])

    const options = {
        title: "Relátorio por mês",
        curveType: "function",
        legend: { position: "bottom" },
    };

    return (
        <>
            {data && data.length > 0 && active === 'uncontrolled-tab-example-tab-mês' &&

                <Chart
                    chartType="Line"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                />

            }
        </>
    );
};

export default RequestMonth;