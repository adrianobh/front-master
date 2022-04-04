import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";

import { requestUsers } from '../../services/ReportsService';

const RequestMonth = ({ active }) => {
    const [data, setData] = useState([])
    useEffect(() => {
        async function getReport() {
            const response = await requestUsers();
            let data_format = response.data.map((item) => {
                return [item.name, parseInt(item.Valor)]
            })
            data_format.unshift(['Comprador', 'Valor']);
            setData(data_format);
        }
        getReport();
    }, [active])

    const options = {
        title: "Maiores compradores",
        curveType: "function",
        legend: { position: "bottom" },
    };

    return (
        <>
            {data && data.length > 0 && active == 'uncontrolled-tab-example-tab-users' &&

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