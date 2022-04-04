import React, { useState } from 'react';
import { Tabs, Tab } from "react-bootstrap";

import RequestMonth from "./RequestMonth";
import BiggestButers from './BiggestButers';
import BiggestSellers from './BiggestSellers';
const Reports = () => {
    const [active, setActive] = useState('uncontrolled-tab-example-tab-mês');
    return (
        <Tabs
        defaultActiveKey="mês"
        id="uncontrolled-tab-example"
        className="mb-3"
        onClick={(e) => setActive(e.target.id)}
      >
        <Tab eventKey="mês" title="Venda por mês">
            <RequestMonth active={active} />
        </Tab>
        <Tab eventKey="users" title="Maiores compradores">
            <BiggestButers active={active} />
        </Tab>
        <Tab eventKey="facilitador" title="Maiores vendedores">
            <BiggestSellers active={active} />
        </Tab>
      </Tabs>
    );
};

export default Reports;