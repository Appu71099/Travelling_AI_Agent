import React from 'react'
import { useState } from 'react';
import { MapPin, Calendar, Heart, Plane, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
   
export default function TravellAgent() {

    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        location: '',
        duration: '',
        interests: []
    });



    const handelTextChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleInterestToggle = (interest) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };


    const handleSubmit = () => {


        console.log('Form Data Location:', formData.location === '');
        console.log('Form Data Duration:', formData.duration === '');
        console.log('Form Data Interests:', formData.interests.length <= 0);
        if (formData.location === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Location',
                text: 'Please select a location.',
                confirmButtonColor: '#6366f1'
            });
            return;
        }

        if (formData.duration === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Duration',
                text: 'Please select the duration.',
                confirmButtonColor: '#6366f1'
            });
            return;
        }

        if (formData.interests.length <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Interests',
                text: 'Please select at least one interest.',
                confirmButtonColor: '#6366f1'
            });
            return;
        }
        // if (formData.location && formData.duration && formData.interests.length > 0) {
        console.log('Travel Form Data:', formData);
        MySwal.fire({
            title: 'Confirm Your Plan 🚀',
            html: `
      <p><strong>Location:</strong> ${formData.location}</p>
      <p><strong>Duration:</strong> ${formData.duration} days</p>
      <p><strong>Interests:</strong> ${formData.interests.join(', ')}</p>
      <hr />
      <p>Are these your selections? Can I proceed to make the plan?</p>
    `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, proceed!',
            cancelButtonText: 'No, edit',
            customClass: {
                popup: 'animate__animated animate__fadeInDown'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // ✅ Proceed with planning
                console.log("Proceeding with plan...");

                localStorage.setItem('duration', formData.duration);
                localStorage.setItem('location', formData.location);
                localStorage.setItem('interests', JSON.stringify(formData.interests));


                navigate('/plans');


                // You can call your planning function here
            } else {
                // ❌ User wants to edit
                console.log("User chose to edit the plan.");
            }
        });
        // } else {
        //   alert('Please fill in all fields');
        // }
    };

    const interestOptions = [
        'Adventure Sports',
        'Culture & History',
        'Food & Cuisine',
        'Nature & Wildlife',
        'Beaches & Relaxation',
        'Museums & Art',
        'Nightlife & Entertainment',
        'Shopping',
        'Photography',
        'Local Festivals'
    ];


    return (


        // Fullscreen background with gradient (Main div)
        <div style={{
            height: '100%', width: '100%', overflow: 'hidden', position: 'relative',
            background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #ec4899 100%)'
        }}>


            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-6">

                        {/* Header */}
                        <div className="text-center py-5">
                            {/* <Plane className="mb-3" size={40} color="white" /> */}
                            <h1 className="display-4 fw-bold text-white mb-2">Travel Agent
                                <Plane className="mb-3" size={50} color="white" />
                            </h1>
                            <p className="lead text-white-50">Plan your perfect holiday</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="card shadow-sm border-0 rounded-4" style={{ width: '100%', maxWidth: '900px', margin: '0 auto', marginTop: '-50px' }}>
                <div className="card-body p-4 p-md-4">


                    <div className="mb-4">
                        <label className="form-label d-flex align-items-center fs-5 fw-semibold text-dark mb-3">
                            <MapPin className="me-2 text-primary" size={20} />
                            Destination
                        </label>
                        <input
                            type="text"
                            name="location"
                            className="form-control form-control-lg"
                            placeholder="Where would you like to go? (e.g., Paris, Tokyo, New York)"
                            value={formData.location}
                            onChange={handelTextChange}
                        />
                    </div>

                    {/* Duration Input */}
                    <div className="mb-4">
                        <label className="form-label d-flex align-items-center fs-5 fw-semibold text-dark mb-3">
                            <Calendar className="me-2" size={20} style={{ color: '#a855f7' }} />
                            Duration (Days)
                        </label>
                        <input
                            type="number"
                            className="form-control form-control-lg"
                            name="duration"
                            placeholder="How many days?"
                            min="1"
                            max="365"
                            value={formData.duration}
                            onChange={handelTextChange}

                        />
                    </div>

                    {/* Location Input */}


                    {/* Interests Selection */}
                    <div className="mb-4">
                        <label className="form-label d-flex align-items-center fs-5 fw-semibold text-dark mb-3">
                            <Heart className="me-2 ml-2" size={20} style={{ color: '#ec4899' }} />
                            Your Interests
                        </label>
                        {/* <p className="text-muted mb-3">Select all that interest you:</p> */}

                        <div className="row g-2 p-4">
                            {interestOptions.map((interest) => (
                                <div key={interest} className="col-12 col-md-6 col-lg-4">
                                    <button
                                        type="button"
                                        onClick={() => handleInterestToggle(interest)}
                                        className={`btn w-100 text-start p-3 border-2 ${formData.interests.includes(interest)
                                            ? 'btn-outline-primary border-primary bg-primary bg-opacity-10 text-primary'
                                            : 'btn-outline-secondary'
                                            }`}
                                        style={{
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <div
                                                className={`rounded-circle me-2 ${formData.interests.includes(interest)
                                                    ? 'bg-primary'
                                                    : 'border border-secondary'
                                                    }`}
                                                style={{
                                                    width: '16px',
                                                    height: '16px',
                                                    minWidth: '16px'
                                                }}
                                            >
                                                {formData.interests.includes(interest) && (
                                                    <div
                                                        className="bg-white rounded-circle mx-auto mt-1"
                                                        style={{
                                                            width: '8px',
                                                            height: '8px'
                                                        }}
                                                    ></div>
                                                )}
                                            </div>
                                            <span className="fw-medium">{interest}</span>
                                        </div>
                                    </button>
                                </div>
                            ))}
                        </div>


                        {formData.interests.length > 0 && (
                            <small className="text-muted d-block mt-2">
                                {formData.interests.length} interest{formData.interests.length !== 1 ? 's' : ''} selected
                            </small>
                        )}


                    </div>

                    <div className="text-center mb-4">
                        <button
                            onClick={handleSubmit}
                            // disabled={!formData.location || !formData.duration || formData.interests.length === 0}
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
                            <Search className="me-2" size={20} />
                            Plan My Trip
                        </button>
                    </div>


                    {(formData.location || formData.duration || formData.interests.length > 0) && (
                        <div className="bg-light rounded-3 p-3">
                            <h6 className="fw-semibold text-dark mb-2">Trip Summary:</h6>
                            <div className="small text-muted">
                                {formData.location && (
                                    <p className="mb-1"><strong>Destination:</strong> {formData.location}</p>
                                )}
                                {formData.duration && (
                                    <p className="mb-1"><strong>Duration:</strong> {formData.duration} days</p>
                                )}
                                {formData.interests.length > 0 && (
                                    <p className="mb-1"><strong>Interests:</strong> {formData.interests.join(', ')}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>









    )
}
