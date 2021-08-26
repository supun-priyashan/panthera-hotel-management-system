import React, {Fragment, useEffect, useState} from "react";

// reactstrap components
import {
    Container,
    Row,
    Col,
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import TransparentFooter from "components/Footers/TransparentFooter";
import axios from "axios";
import HallsHeader from "../../components/Headers/HallsHeader";

function HallsPage() {

    const [halls,setHalls] = useState([]);

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
        axios.get('http://localhost:8080/halls').
        then((response) => {
            if(response.data.success) {
                console.log(response.data.halls);
                setHalls(response.data.halls.map((item) => ({
                    id: item._id,
                    hallName: item.hallName,
                    type: item.type,
                    height: item.height,
                    guests: item.guests,
                    space: item.space,
                    facilities: item.facilities.join(),
                    image: item.image,
                    price: item.price,
                    description: item.description,
                })));
                setTimeout(() => console.log(halls),5000)
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
                <HallsHeader />
                <div className="section section-about-us">
                    <Container>
                        <Row>
                            <Col className="ml-auto mr-auto text-center" md="60">
                                <h2 className="title">Reception Halls</h2>
                                <div className={'container'}>
                                    {halls.length > 0 && halls.map((item,index)=>{
                                        return(
                                            <Fragment key={index}>
                                                <div className="card" style={{
                                                    width: "20rem",
                                                    margin: "25px 25px 25px 25px",
                                                }} >
                                                    <img className="card-img-top" src={'http://localhost:8080/uploads/'+item.image}  alt="Room image"/>
                                                    <div className="card-body">
                                                        <p className="card-text">{item.hallName}</p>
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

export default HallsPage;
