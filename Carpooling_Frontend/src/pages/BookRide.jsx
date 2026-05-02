// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   MapPin,
//   Calendar,
//   Clock,
//   Users,
//   User,
//   UserRound,
//   MapPinned,
//   CarFront,
//   Phone,
//   Mail,
// } from "lucide-react";

// function BookRide() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [ride, setRide] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitted, setSubmitted] = useState(false);
//   const [bookingDetails, setBookingDetails] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const PORT=import.meta.env.VITE_API_URL

//   const [formData, setFormData] = useState({
//     start: "",
//     destination: "",
//     seats: 1,
//   });
  

//   useEffect(() => {
//     const fetchRideDetails = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `${PORT}/api/v1/book-ride/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setRide(response.data.ride);
//         setFormData({
//           start: response.data.ride.start,
//           destination: response.data.ride.destination,
//           seats: 1,
//         });
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch ride details.");
//         setLoading(false);
//       }
//     };

//     fetchRideDetails();
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.start === formData.destination) {
//       toast.error("Pickup and drop-off locations cannot be the same", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const formDataToSend = {
//         ...formData,
//         seats: parseInt(formData.seats, 10),
//       };
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         `${PORT}/api/v1/create-passenger-ride/${id}`,
//         formDataToSend,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
      

//       setBookingDetails(response.data.bookingDetails);
//       toast.success("Ride booked successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//       });

//       setFormData({
//         start: ride.start,
//         destination: ride.destination,
//         seats: "",
//       });
//       setSubmitted(true);
//     } catch (err) {
//       if (err.response && err.response.status === 403) {
//         toast.error("Cannot book your own ride", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       } else {
//         toast.error("Failed to book the ride. Please try again.", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }
//       console.error(err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="bg-red-50 text-red-600 p-4 rounded-lg shadow-sm">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   const pickupOptions = [ride.start, ...(ride.stops || [])];
//   const dropoffOptions = [...(ride.stops || []), ride.destination];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
//       <ToastContainer />
//       <div className="max-w-2xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//           Book Your Ride
//         </h1>

//         {submitted ? (
//           <div className="bg-white rounded-xl shadow-sm p-8 text-center">
//             <div className="mb-6">
//               <CarFront className="w-16 h-16 text-green-500 mx-auto mb-4" />
//               <p className="text-xl text-green-600 font-semibold">
//                 Thank you! Your ride has been booked successfully.
//               </p>
//             </div>
//             {bookingDetails && (
//               <div className="text-left mb-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                   Driver Contact Information
//                 </h3>
//                 <p className="flex items-center text-gray-600">
//                   <User className="w-5 h-5 mr-2 text-blue-500" />
//                   {bookingDetails.driverName}
//                 </p>
//                 <p className="flex items-center text-gray-600">
//                   <Phone className="w-5 h-5 mr-2 text-blue-500" />
//                   {bookingDetails.driverPhone}
//                 </p>
//                 <p className="flex items-center text-gray-600">
//                   <Mail className="w-5 h-5 mr-2 text-blue-500" />
//                   {bookingDetails.driverEmail}
//                 </p>
//                 <p className="text-sm text-gray-500 mt-2">
//                   You’ll receive an email with these details shortly.
//                 </p>
//               </div>
//             )}
//             <p className="text-red-600 font-medium mb-6">
//               Warning: Do not pay online before you reach your driver, as it may
//               lead to a scam.
//             </p>
//             <button
//               onClick={() => navigate("/")}
//               className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300"
//             >
//               Return to Home
//             </button>
//           </div>
//         ) : (
//           <>
//             {/* Ride Details Card */}
//             <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
//               <div className="p-6">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                   Ride Details
//                 </h2>
//                 <div className="space-y-4">
//                   {/* Route Information */}
//                   <div className="flex items-center space-x-2">
//                     <MapPin className="w-5 h-5 text-blue-500" />
//                     <div className="flex-1">
//                       <div className="text-sm text-gray-500">From</div>
//                       <div className="font-semibold text-gray-800">
//                         {ride.start}
//                       </div>
//                     </div>
//                     <div className="w-px h-8 bg-gray-200"></div>
//                     <div className="flex-1">
//                       <div className="text-sm text-gray-500">To</div>
//                       <div className="font-semibold text-gray-800">
//                         {ride.destination}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Stops */}
//                   {ride.stops && ride.stops.length > 0 && (
//                     <div className="mb-6">
//                       <div className="text-sm text-gray-500 mb-2">Stops</div>
//                       <div className="flex flex-wrap gap-2">
//                         {ride.stops.map((stop, index) => (
//                           <span
//                             key={index}
//                             className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
//                           >
//                             {stop}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Time and Date */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="flex items-center text-gray-600">
//                       <Calendar className="w-4 h-4 mr-2 text-blue-500" />
//                       <span>{ride.date}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <Clock className="w-4 h-4 mr-2 text-blue-500" />
//                       <span>{ride.time}</span>
//                     </div>
//                   </div>

//                   <div className="flex items-center text-gray-600">
//                     <Users className="w-4 h-4 mr-2 text-blue-500" />
//                     <span>{ride.seats} seats available</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Booking Form */}
//             <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//               <div className="p-6">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-6">
//                   Your Booking Details
//                 </h2>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="space-y-4">
//                     <div>
//                       <label
//                         htmlFor="start"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Pickup Location
//                       </label>
//                       <div className="relative">
//                         <MapPinned className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         <select
//                           id="start"
//                           name="start"
//                           value={formData.start}
//                           onChange={handleInputChange}
//                           className="pl-10 w-full rounded-lg border border-gray-200 bg-gray-50 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                           required
//                         >
//                           {pickupOptions.map((option, index) => (
//                             <option key={index} value={option}>
//                               {option}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="destination"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Drop-off Location
//                       </label>
//                       <div className="relative">
//                         <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         <select
//                           id="destination"
//                           name="destination"
//                           value={formData.destination}
//                           onChange={handleInputChange}
//                           className="pl-10 w-full rounded-lg border border-gray-200 bg-gray-50 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                           required
//                         >
//                           {dropoffOptions.map((option, index) => (
//                             <option key={index} value={option}>
//                               {option}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="seats"
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         Number of Seats
//                       </label>
//                       <div className="relative">
//                         <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                         <input
//                           type="number"
//                           id="seats"
//                           name="seats"
//                           value={formData.seats}
//                           onChange={handleInputChange}
//                           min="1"
//                           max={ride.seats}
//                           className="pl-10 w-full rounded-lg border border-gray-200 bg-gray-50 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
//                     disabled={isSubmitting}
//                   >
//                     <span>Confirm Booking</span>
//                     {isSubmitting && (
//                       <svg
//                         className="animate-spin h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
//                         ></path>
//                       </svg>
//                     )}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default BookRide;





import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  User,
  UserRound,
  MapPinned,
  CarFront,
  Phone,
  Mail,
} from "lucide-react";

function BookRide() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false); // NEW
  const PORT = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    start: "",
    destination: "",
    seats: 1,
  });

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${PORT}/api/v1/book-ride/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRide(response.data.ride);
        setFormData({
          start: response.data.ride.start,
          destination: response.data.ride.destination,
          seats: 1,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch ride details.");
        setLoading(false);
      }
    };

    fetchRideDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ─── Helper: load Razorpay script dynamically ───────────────────────────────
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true); // already loaded
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ─── Pay Offline: same as old handleSubmit ───────────────────────────────────
  const handleOfflineBooking = async () => {
    setIsSubmitting(true);
    try {
      const formDataToSend = {
        ...formData,
        seats: parseInt(formData.seats, 10),
      };
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${PORT}/api/v1/create-passenger-ride/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookingDetails(response.data.bookingDetails);
      toast.success("Ride booked successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setFormData({
        start: ride.start,
        destination: ride.destination,
        seats: "",
      });
      setSubmitted(true);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        toast.error("Cannot book your own ride", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error("Failed to book the ride. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pay Online: open Razorpay checkout 
  const handleOnlinePayment = async () => {
    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      toast.error("Failed to load payment gateway. Check your internet.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Step 1: Ask your backend to create a Razorpay order
      // YOUR BACKEND should return: { orderId, amount (in paise), currency, keyId }
      const orderRes = await axios.post(
        // `${PORT}/api/v1/orders/create-order${id}`,
        `${PORT}/api/v1/orders/create-order/${id}`,
        { seats: parseInt(formData.seats, 10) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { orderId, amount, currency, keyId } = orderRes.data.data;
      console.log(orderId, amount, currency, keyId )

      // Step 2: Open Razorpay popup
      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        order_id: orderId,
        name: "RideShare",
        description: `Ride from ${formData.start} to ${formData.destination}`,
        handler: async (paymentResponse) => {
          // Step 3: Payment done on Razorpay side → verify + book on your backend
          try {
            const verifyRes = await axios.post(
              `${PORT}/api/v1/verify-payment-and-book/${id}`,
              {
                ...formData,
                seats: parseInt(formData.seats, 10),
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            setBookingDetails(verifyRes.data.bookingDetails);
            toast.success("Payment successful! Ride booked.", {
              position: "top-right",
              autoClose: 3000,
            });
            setSubmitted(true);
          } catch (err) {
            toast.error(
              "Payment done but booking failed. Please contact support.",
              { position: "top-right", autoClose: 5000 }
            );
          }
        },
        prefill: {
          name: "",    // fill from your user profile if available
          email: "",
          contact: "",
        },
        theme: { color: "#3b82f6" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Could not initiate payment. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error(err);
    }
  };

  // ─── "Confirm Booking" click: validate then show payment options ─────────────
  const handleConfirmClick = () => {
    if (formData.start === formData.destination) {
      toast.error("Pickup and drop-off locations cannot be the same", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (!formData.seats || formData.seats < 1) {
      toast.error("Please select at least 1 seat", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    setShowPaymentOptions(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  const pickupOptions = [ride.start, ...(ride.stops || [])];
  const dropoffOptions = [...(ride.stops || []), ride.destination];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <ToastContainer />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Book Your Ride
        </h1>

        {submitted ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mb-6">
              <CarFront className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-xl text-green-600 font-semibold">
                Thank you! Your ride has been booked successfully.
              </p>
            </div>
            {bookingDetails && (
              <div className="text-left mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Driver Contact Information
                </h3>
                <p className="flex items-center text-gray-600">
                  <User className="w-5 h-5 mr-2 text-blue-500" />
                  {bookingDetails.driverName}
                </p>
                <p className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-2 text-blue-500" />
                  {bookingDetails.driverPhone}
                </p>
                <p className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-2 text-blue-500" />
                  {bookingDetails.driverEmail}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  You'll receive an email with these details shortly.
                </p>
              </div>
            )}
            <p className="text-red-600 font-medium mb-6">
              Warning: Do not pay online before you reach your driver, as it may
              lead to a scam.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300"
            >
              Return to Home
            </button>
          </div>
        ) : (
          <>
            {/* Ride Details Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Ride Details
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-500">From</div>
                      <div className="font-semibold text-gray-800">
                        {ride.start}
                      </div>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500">To</div>
                      <div className="font-semibold text-gray-800">
                        {ride.destination}
                      </div>
                    </div>
                  </div>

                  {ride.stops && ride.stops.length > 0 && (
                    <div className="mb-6">
                      <div className="text-sm text-gray-500 mb-2">Stops</div>
                      <div className="flex flex-wrap gap-2">
                        {ride.stops.map((stop, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                          >
                            {stop}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{ride.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{ride.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{ride.seats} seats available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Your Booking Details
                </h2>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="start"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Pickup Location
                      </label>
                      <div className="relative">
                        <MapPinned className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          id="start"
                          name="start"
                          value={formData.start}
                          onChange={handleInputChange}
                          className="pl-10 w-full rounded-lg border border-gray-200 bg-gray-50 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          required
                        >
                          {pickupOptions.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="destination"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Drop-off Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          id="destination"
                          name="destination"
                          value={formData.destination}
                          onChange={handleInputChange}
                          className="pl-10 w-full rounded-lg border border-gray-200 bg-gray-50 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          required
                        >
                          {dropoffOptions.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="seats"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Number of Seats
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          id="seats"
                          name="seats"
                          value={formData.seats}
                          onChange={handleInputChange}
                          min="1"
                          max={ride.seats}
                          className="pl-10 w-full rounded-lg border border-gray-200 bg-gray-50 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* ── PAYMENT SECTION ── */}
                  {!showPaymentOptions ? (
                    // Step 1: Show "Confirm Booking" button
                    <button
                      type="button"
                      onClick={handleConfirmClick}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300"
                    >
                      Confirm Booking
                    </button>
                  ) : (
                    // Step 2: Show two payment options
                    <div className="space-y-3">
                      <p className="text-center text-sm font-semibold text-gray-600 mb-1">
                        Choose Payment Method
                      </p>

                      {/* Pay Online */}
                      <button
                        type="button"
                        onClick={handleOnlinePayment}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        💳 Pay Online (Razorpay)
                      </button>

                      {/* Pay Offline */}
                      <button
                        type="button"
                        onClick={handleOfflineBooking}
                        disabled={isSubmitting}
                        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        🤝 Pay Offline (Pay Driver Directly)
                        {isSubmitting && (
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                            ></path>
                          </svg>
                        )}
                      </button>

                      {/* Go back */}
                      <button
                        type="button"
                        onClick={() => setShowPaymentOptions(false)}
                        className="w-full text-gray-400 hover:text-gray-600 text-sm underline pt-1"
                      >
                        ← Go back
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BookRide;