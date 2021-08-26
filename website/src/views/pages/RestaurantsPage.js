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
import { Link } from 'react-router-dom';

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
                            <Col className="ml-auto mr-auto text-center" md="100">
                                <h2 className="title">Restaurants</h2>
                            </Col>
                        </Row>
                    </Container>
                                <div className={'container'}>
                                    {restaurants.length > 0 && restaurants.map((item,index)=>{
                                        return(
                                            <Fragment key={index}>

                                                    <Container>
                                                        <div className="section-story-overview">
                                                            <Row>
                                                                <Col md="6">
                                                                    <div
                                                                        className="image-container"
                                                                        style={{
                                                                            backgroundImage:
                                                                                "url("+'http://localhost:8080/uploads/'+item.image+")",
                                                                        }}
                                                                    ></div>
                                                                </Col>
                                                                <Col md="5">
                                                                    <h3>
                                                                        {item.restaurantName}
                                                                    </h3>
                                                                    <h5>
                                                                        {item.caption}
                                                                    </h5>
                                                                    <p>
                                                                        {item.description}
                                                                    </p>
                                                                    <Link to={{
                                                                        pathname: '/foods',
                                                                        state: {
                                                                            restaurant: item.restaurantName,
                                                                        },
                                                                    }} >
                                                                    <Button
                                                                        style={{
                                                                            float: 'center',
                                                                            marginTop: '10px',
                                                                            backgroundColor: '#5a2360',
                                                                            fontFamily: 'Josefin Sans'
                                                                        }}
                                                                        type = "submit">
                                                                        View Menus
                                                                    </Button>
                                                                    </Link>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Container>

                                            </Fragment>
                                        )
                                    })}
                                </div>

                </div>
                <TransparentFooter/>
            </div>
        </>
    );
}

export default RestaurantsPage;
