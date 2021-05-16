
import React, { useState } from 'react';
import { Button, InputGroup, FormControl, Card, CardDeck } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import API from "../../utils/API";
import cloudy from '../../img/cloudy_light.png'
import snowing from '../../img/snowing_light.png'
import raining from '../../img/raining_light.png'
import storm from '../../img/storm_light.png'
import sunny from '../../img/sunny_light.png'
import min from '../../img/min_arrow.png'
import max from '../../img/max_arrow.png'


export class Home extends React.Component {
    state = {
        del: this.delCity,
        name: null,
        cityArray: [],
        data: null,
        cities: null,
        loading: false,
        newCity: ''
    }

    callWeatherApi = async (city = this.state.city) => {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=35f86ac52d386437b60a158ae39ac315&units=metric`);
        let body = await response.json();
        if (body.cod === 404) {
            throw Error(body.message);

        } else {
            this.setState({
                data: body,
                loading: false
            })
            return body;
        }
    };

    setCities = async () => {

        const { newCity } = this.state

        this._asyncRequest = await API.setCities(newCity)
        window.location.reload(false)



    }

    getCities = async () => {
        let data = await API.getCities()
        console.log(data)
        return data
    };

    

    async componentDidMount() {

        this._asyncRequestt = await this.getCities().then(
            res => {
                this._asyncRequestt = null;
                this.setState({ cities: res.data.city });
                this.setState({ name: res.data.user });
                console.log(this.state.name)




            }
        ).then(() => {
            this.state.cities.map(element => {
                this._asyncRequest = this.callWeatherApi(element).then(
                    data => {
                        this.setState({ loading: true })
                        this._asyncRequest = null;
                        this.setState({ data });
                        this.state.cityArray.push({
                            cityName: element,
                            description: this.state.data.weather[0].description,
                            main: this.state.data.weather[0].main,
                            temp: this.state.data.main.temp,
                            min: this.state.data.main.temp_min,
                            max: this.state.data.main.temp_max
                        });
                        console.log(this.state.cityArray)
                        console.log(this.state.cityArray.map(i => i.cityName))
                        this.setState({ loading: false })
                    }
                );
            })


        })
    }

    handleChange = (event) => {
        this.setState({
            newCity: event.target.value
        });

    };

    // delCity = (city) => {
    //     API.delCity(city)
    //     window.location.reload(false)

    // }

    disconnect = () => {
        API.logout();
        window.location = "/";
    };

    render() {
        
        
        async function delCity(city){
            let res = await API.delCity(city)
            window.location.reload(false)
           
        }

        const imgLoading = function (description) {
            if (description === "Clouds" || description === "Haze" || description === "Fog")
                return cloudy
            if (description === "Clear")
                return sunny
            if (description === "Rain" || description === "Drizzle")
                return raining
            if (description === "Storm")
                return storm
            if (description === "Snow")
                return snowing
        }

        return (

            <Container className="p-3">
                <Jumbotron>
                    <div><h3>Hi there, {this.state.name}, here's your weather info:</h3></div>
                    <div>
                        <CardDeck>
                            {this.loading === true ?
                                "loading"
                                :
                                this.state.cityArray.map(function (i) {
                                    return (
                                        <div key={i.cityName}>
                                            <Card>
                                                <Card.Img variant="top" />
                                                <Card.Body>
                                                    <Card.Title><h3>{i.cityName}</h3></Card.Title>
                                                    <Card.Text>
                                                        <div>{i.description}</div>
                                                        <img src={imgLoading(i.main)} height={150} alt="weather" />
                                                        <div>

                                                            <h2>{i.temp}ºC</h2>
                                                            <img src={min} height={10} alt="min" />{i.min}ºC
                                                                <tab></tab>
                                                            <img src={max} height={10} alt="max" />{i.max}ºC </div>
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer>
                                                    <Button
                                                        onClick={()=>{delCity(i.cityName)}} >Delete City
                                                        </Button>
                                                </Card.Footer>
                                            </Card>


                                        </div>
                                    )
                                })
                            }
                        </CardDeck>
                    </div>
                    <Jumbotron>
                        <InputGroup className="mb-3">

                            <InputGroup.Prepend>
                                <Button variant="outline-secondary"
                                    onClick={this.setCities} type="submit">Set City</Button>
                            </InputGroup.Prepend>
                            <FormControl
                                autoFocus
                                aria-describedby="basic-addon1"
                                value={this.state.newCity}
                                onChange={this.handleChange}
                                type="text" />
                        </InputGroup>
                        <Button onClick={this.disconnect} type="submit">Se déconnecter</Button>
                    </Jumbotron>
                </Jumbotron>
            </Container>
        )
    }
}