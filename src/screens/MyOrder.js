import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:8080/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })
    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>

                    {orderData !== {} ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :
                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                                                                {/* <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <hr></hr>
                                                                    <div className='container w-100 p-0' style={{ height: "128px" }}>
                                                                        <span className='m-1'>จำนวน&nbsp;:&nbsp;&nbsp;&nbsp;{arrayData.qty}<br /></span>
                                                                        <span className='m-1'>ขนาด&nbsp;:&nbsp;&nbsp;&nbsp;{arrayData.size}<br /></span>
                                                                        <span className='m-1'>วันที่&nbsp;:&nbsp;&nbsp;&nbsp;{data}<br /></span>
                                                                        <span className='m-1'>ราคา&nbsp;:&nbsp;&nbsp;&nbsp;{arrayData.price}&nbsp;&nbsp;&nbsp;บาท<br /></span>
                                                                        <div className=' d-inline ms-1 h-100 w-20 fs-5' >
                                                                            หมายเลขออเดอร์&nbsp;:&nbsp;&nbsp;&nbsp;{arrayData.orderNumber}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div>

            <Footer />
        </div>
    )
}