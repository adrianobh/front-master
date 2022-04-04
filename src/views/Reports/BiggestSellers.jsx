import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";

import { requestFacilitador } from '../../services/ReportsService';

const BiggestSellers = ({ active }) => {
    const [data, setData] = useState([])
    useEffect(() => {
        async function getReport() {
            const response = await requestFacilitador();
            let data_format = response.data.map((item) => {
                return [item.name, parseInt(item.Valor)]
            })
            data_format.unshift(['Vendedor', 'Valor']);
            setData(data_format);
        }
        getReport();
    }, [active])

    const options = {
        title: "Maiores Vendedores",
        curveType: "function",
        legend: { position: "bottom" },
    };

    return (
        <>
            {data && data.length > 0 && active === 'uncontrolled-tab-example-tab-facilitador' &&

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

export default BiggestSellers;