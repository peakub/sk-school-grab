import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import Carousal from '../components/Carousal'

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCategory_x, setFoodCategory_x] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:10000/api/foodData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();

        setFoodItem(response[0]);
        setFoodCategory_x(response[1]);
        //console.log(response[0], response[1]);
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <div> <Navbar /> </div>
            <div> <div id="carouselExampleControls" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>

                <div className="carousel-inner" id="carousel">
                    <div className='carousel-caption' style={{ zIndex: "10" }}>
                        <div className="container-fluid">
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://img.kapook.com/u/pirawan/Cooking1/panang.jpg" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://img.wongnai.com/p/1920x0/2017/01/25/0d7f0a191cf84dc9b7e034274210ef05.jpg" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://img.wongnai.com/p/1920x0/2017/04/17/d73b50a638f34a8fa914b0d92f5de015.jpg" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div> </div>
            <div className='container'>
                {
                    foodCategory_x !== []
                        ? foodCategory_x.map((data) => {
                            return (<div className='row mb-3'>
                                <div key={data._id} className='fs-3 m-3'>
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {foodItem !== []
                                    ?
                                    foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card foodItem = {filterItems}
                                                        options={filterItems.options[0]}
                                                    ></Card>
                                                </div>
                                            )
                                        }
                                        ) : <div> No Such Data Found </div>}
                            </div>
                            )
                        })
                        : ""
                }
            </div>
            <div> <Footer /> </div>
        </div>
    )
}
