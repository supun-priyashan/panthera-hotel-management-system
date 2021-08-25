import React, {Fragment, useEffect, useState} from "react";

// reactstrap components
import {
    Button,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
} from "reactstrap";

// core components
import RestaurantPageHeader from "components/Headers/RestaurantPageHeader.js";
import IndexNavbar from "components/Navbars/IndexNavbar";
import TransparentFooter from "components/Footers/TransparentFooter";
import IndexHeader from "../../components/Headers/IndexHeader";
import RoomsHeader from "../../components/Headers/RoomsHeader";
import axios from "axios";

function RestaurantsPage() {
    const [firstFocus, setFirstFocus] = useState(false);
    const [lastFocus, setLastFocus] = useState(false);

    const [restaurants,setRestaurants] = useState([]);

    useEffect(() => {
        document.body.classList.add("landing-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("landing-page");
            document.body.classList.remove("sidebar-collapse");
        };
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/restaurants').
        then((response) => {
            if(response.data.success) {
                console.log(response.data.restaurants);
                setRestaurants(response.data.restaurants.map((item) => ({
                    id: item._id,
                    header: item.restaurantName,
                    description: item.caption,
                    longDescription: item.description,
                    image: 'http://localhost:8080/uploads/'+item.image,
                })));
                setRestaurants(response.data.restaurants);
                setTimeout(() => console.log(restaurants.length),5000)
            } else{
                alert('An error occurred while retrieving data');
                console.log(response.data.error);
            }
        })
    },[])

    return (
        <>
            <IndexNavbar />
            <div className="wrapper">
                <RestaurantPageHeader />
                <div className="section section-about-us">
                    <Container>
                        <Row>
                            <Col className="ml-auto mr-auto text-center" md="60">
                                <h2 className="title">Restaurants</h2>
                                <div className={'container'}>
                                    {restaurants.length > 0 && restaurants.map((item,index)=>{
                                        return(
                                            <Fragment key={index}>

                                                <div className="card" style={{
                                                    width: "20rem",
                                                    margin: "25px 25px 25px 25px",
                                                }} >
                                                    <img className="card-img-top" src={'http://localhost:8080/uploads/'+item.image}  alt="Restaurant image"/>
                                                    <div className="card-body">
                                                        <p className="card-text">{item.restaurantName}</p>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        )
                                    })}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <TransparentFooter/>
            </div>
        </>
    );
}

export default RestaurantsPage;