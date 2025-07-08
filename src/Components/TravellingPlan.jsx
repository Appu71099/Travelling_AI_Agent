import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Blocks } from 'react-loader-spinner';

export default function TravellingPlan() {

    const [itineraryData, setItineraryData] = useState({});
    const [days, setDays] = useState([]);
    const [currency, setCurrency] = useState("");
    const [totalCost, setTotalCost] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true);
        const requestData = {
            destination: localStorage.getItem('location'),
            days: localStorage.getItem('duration'),
            interests: JSON.parse(localStorage.getItem('interests'))
        };

        axios.post('https://travellingagentservice-production.up.railway.app/api/travel-plan', requestData)
            .then(response => {
                if (response && response.data && response.data.itinerary) {
                    console.log('Itinerary data fetched successfully:', response.data.itinerary);
                    setItineraryData(response);

                    setDays(response.data.itinerary.days);
                    console.log('Days:', response.data.itinerary.days);
                    setCurrency(response.data.itinerary.currency);
                    console.log('Currency:', response.data.itinerary.currency);
                    setTotalCost(response.data.itinerary.totalCost);
                    console.log('Total Cost:', response.data.itinerary.totalCost);
                } else {
                    setError('No itinerary data found');
                }
            })
            .catch(err => {
                console.error('Error fetching itinerary:', err);
                setError('Failed to fetch itinerary data');
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);

    //     if (loading) {
    //     return (

    //     );
    //   }

    if (error) {
        return <div className="text-center text-danger mt-5">{error}</div>;
    }

    return (
        <div className="min-vh-100" style={{
            background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #ec4899 100%)'
        }}>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-6">

                        {/* Header */}
                        <div className="text-center py-5">
                            <h6 className="display-4 fw-bold text-white mb-3">Travel Plans</h6>
                            <p className="lead text-white mb-4">Explore our curated travel plans to make your journey unforgettable.</p>



                        </div>
                    </div>
                </div>
            </div>


            {loading ? (<div className="d-flex justify-content-center align-items-center" >
                <Blocks
                    height="80"
                    width="80"
                    color="#ffffff"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    visible={true}
                />
            </div>) : (<div className="card shadow-sm border-0 rounded-4" style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', marginTop: '-50px' }}>
                <div className="card-body p-4 p-md-4">

                    <h4 className="mb-4">🗓️ Daily Itinerary</h4>
                    {days?.map((day, idx) => (
                        <div key={idx} className="mb-4 border-bottom pb-3">
                            <h5>{day.day}</h5>
                            <h6>📍 {day.location}</h6>
                            <p>{day.about}</p>
                            <ul>
                                {day.activities.map((activity, i) => (
                                    <li key={i}>{activity}</li>
                                ))}
                            </ul>
                            <p><strong>Accommodation:</strong> {day.accommodation.hotelName} ({day.accommodation.type})</p>
                            <p><strong>Day Cost:</strong> Travel: {currency} {day.costs.travel}, Stay: {currency} {day.costs.accommodation}, Food: {currency} {day.costs.food}, <strong>Total:</strong> {currency} {day.costs.total}</p>
                        </div>
                    ))}


                    <h4 className="mt-4">💰 Trip Summary</h4>
                    <p><strong>Travel:</strong> {currency} {totalCost.travel}</p>
                    <p><strong>Accommodation:</strong> {currency} {totalCost.accommodation}</p>
                    <p><strong>Food:</strong> {currency} {totalCost.food}</p>
                    <p><strong>Total Per Person:</strong> <span className="fw-bold">{currency} {totalCost.totalPerPerson}</span></p>

                </div>


                <div className="d-flex justify-content-center align-items-center" style={{ padding: '20px' }}>
                    <button
                        className="download-btn"
                        style={{
                            width: "200px",
                            padding: "12px 20px",
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)", // modern gradient
                            color: "#fff",
                            fontWeight: "600",
                            fontSize: "16px",
                            border: "none",
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out"
                        }}
                        onMouseOver={(e) => {
                            e.target.style.transform = "scale(1.05)";
                            e.target.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.25)";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = "scale(1)";
                            e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                        }}
                    >
                        📄 Download Plan
                    </button>
                </div>

            </div>



            )}




        </div>
    )
}
