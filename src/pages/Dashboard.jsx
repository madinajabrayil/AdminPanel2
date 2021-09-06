import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Chart from "react-apexcharts";
import statusCards from "../assets/JsonData/status-card-data.json";
import StatusCard from "../components/StatusCard/StatusCard";
import Table from '../components/Table/Table';
import Badge from '../components/Badge/Badge';
import ThemeAction from '../redux/actions/ThemeAction'

const chartOptions = {
    series:[{
        name:"Online Customers",
        data:[40,70,20,90,36,80,30,91,60]
    },{
        name:"Store Customers",
        data:[40,30,70,80,40,16,40,20,51,10]
    }],
    options:{
        color:['#6ab04c','#2980b9'],
        chart:{
            background:'transparent'
        },
        dataLabels:{
            enabled:false
        },
        stroke:{
            curve:'smooth'
        }, 
        xaxis:{
            categories:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep']
        },
        legend:{
            position:'top'
        },
        grid:{
            show:false
        }
    }
}

const topCustomers = {
    head:[
        'user',
        'total orders',
        'total spending'
    ],
    body:[
        { 
            "username":"john doe",
            "order":"490",
            "price":"$12,289"
            
        }, { 
            "username":"fank iva",
            "order":"370",
            "price":"$10,182"
            
        }, { 
            "username":"eva say",
            "order":"276",
            "price":"$18,283"
            
        }, { 
            "username":"david laym",
            "order":"427",
            "price":"$19,198"
            
        },{ 
            "username":"antohny baker",
            "order":"172",
            "price":"$28,198"
            
        }
    ]
}

const  renderCustomerHead = (item,index) => (
    <th key={index}>{item}</th>
)

const renderCustomerBody = (item,index) => (
    <tr key={index}>
        <td>{item.username}</td>
        <td>{item.order}</td>
        <td>{item.price}</td>
    </tr>
)


const latestOrders ={
    header:[
        "order id",
        "user",
        "total price",
        "date",
        "status"
    ],
    body:[
        {
            id:"#001711",
            user:"john doe",
            date:"17 Jun 2021",
            price:"$900",
            status:"shipping"
        },
        {
            id:"#001712",
            user:"fank iva",
            date:"01 May 2021",
            price:"$760",
            status:"paid"
        },
        {
            id:"#001713",
            user:"eva say",
            date:"09 Jan 2021",
            price:"$456",
            status:"pending"
        },
        {
            id:"#001714",
            user:"david laym",
            date:"10 Mar 2021",
            price:"$342",
            status:"refund"
        },
        {
            id:"#001715",
            user:"antohny baker",
            date:"22 Jun 2021",
            price:"$870",
            status:"paid"
        }
    ]
}

const orderStatus={
    "shipping":"primary",
    "paid":"success",
    "refund":"danger",
    "pending":"warning"

}

const renderOrderHead = (item,index) =>(
    <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) =>(
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.user}</td>
        <td>{item.price}</td>
        <td>{item.date}</td>
        <td>
            {/* <span>{item.status}</span> */}
            <Badge type={orderStatus[item.status]} content={item.status}/>
        </td>
    </tr>
)
const Dashboard = () => {

    const themeReducer = useSelector(state => state.ThemeReducer.mode)

    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(ThemeAction.getTheme())
    })

    return (
        <div>
            <h2 className="page-header">Dashboard</h2>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        {
                            statusCards.map((item,index)=>(
                                <div className="col-6" key={index}>
                                    {/* {item.title} */}
                                    <StatusCard
                                        icon={item.icon}
                                        count={item.count}  
                                        title={item.title}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="col-6">
                    <div className="card full-height">
                        <Chart
                            options={themeReducer === 'theme-mode-dark' ? {
                                    ...chartOptions.options,
                                    theme:{mode:'dark'}
                            } : {
                                    ...chartOptions.options,
                                    theme:{mode:'light'}
                            }} 
                            series={chartOptions.series}
                            type='line'
                            height='100%'/>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <h3>top costumers</h3>
                        </div>
                        <div className="card-body">
                            <Table
                                headData = {topCustomers.head}
                                renderHead = {(item,index)=> renderCustomerHead(item,index)}
                                bodyData = {topCustomers.body}
                                renderBody = {(item,index)=> renderCustomerBody(item,index)}/>
                        </div>
                        <div className="card-footer">
                            <Link to='/'>view all</Link>
                        </div>
                    </div>
                </div>
                <div className="col-8"> 
                    <div className="card">
                        <div className="card-header">
                            <h3>latest orders</h3>
                        </div>
                        <div className="card-body">
                            <Table
                                headData = {latestOrders.header}
                                renderHead = {(item,index)=>renderOrderHead(item,index)}
                                bodyData={latestOrders.body}
                                renderBody = {(item,index)=>renderOrderBody(item,index)}/>
                        </div>
                        <div className="card-footer">
                            <Link to='/'>view all</Link>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    )
}


export default Dashboard;