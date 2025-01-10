import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getMenuRecommendation, createOrder, createTransaction } from "../../api/cafe"; 
import { getGamebyId, getGamePricebyId } from "../../api/game"; 
import "./menu.css";

const MenuSection = () => {
  const { state } = useLocation();
  const selectedGameId = state?.selectedGameId; 
  const [formData, setFormData] = useState({
    gender: "",
    mood: "",
    activity: "",
    foodType: "",
    drinkType: "",
  });
  const [recommendations, setRecommendations] = useState({
    food: "",
    beverage: "",
  });
  const [gameDetails, setGameDetails] = useState({
    name: "",
    price: "",
  });
  const [totalAmount, setTotalAmount] = useState(0); 
  const [loading, setLoading] = useState(false);
  const [showPaymentButton, setShowPaymentButton] = useState(false); 

  // Load Midtrans Snap.js script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", "SB-Mid-client-fQtIw0AIa4ggiHUm");
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.toLowerCase() }));
  };

  const handleSubmit = async () => {
    if (!formData.gender || !formData.mood || !formData.activity || !formData.foodType || !formData.drinkType) {
      alert("Please fill in all the fields before submitting!");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("idToken");
    try {
      const menuResponse = await getMenuRecommendation(
        token,
        formData.gender,
        formData.mood,
        formData.foodType,
        formData.drinkType,
        formData.activity
      );

      setRecommendations({
        food: menuResponse.recommendations[0] || "No food recommended",
        beverage: menuResponse.recommendations[1] || "No beverage recommended",
      });

      if (selectedGameId) {
        const gameData = await getGamebyId(token, selectedGameId);
        const gamePriceData = await getGamePricebyId(token, selectedGameId);

        setGameDetails({
          name: gameData.title || "Unknown Game",
          price: gamePriceData.price_per_day || "Price not available",
        });

        const cafeAmount = 10000;
        const gameAmount = gamePriceData.price_per_day || 0;
        setTotalAmount(cafeAmount + gameAmount);
      }

      setShowPaymentButton(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleCheckout = async () => {
    setLoading(true);
    const token = localStorage.getItem("idToken");
    try {
      const orderData = {
        total_amount: totalAmount,
      };
      const orderResponse = await createOrder(token, orderData);
      const orderId = orderResponse.id;

      const transactionResponse = await createTransaction(token, orderId, selectedGameId);
      const transactionToken = transactionResponse.transaction_token;

      if (window.snap) {
        window.snap.pay(transactionToken, {
          onSuccess: (result) => {
            console.log("Payment Success:", result);
            alert("Payment successful! Your order has been placed.");
          },
          onPending: (result) => {
            console.log("Payment Pending:", result);
            alert("Payment is pending. Please complete the payment.");
          },
          onError: (result) => {
            console.error("Payment Error:", result);
            alert("Payment failed. Please try again.");
          },
          onClose: () => {
            console.log("Payment popup closed without completing the payment.");
            alert("Payment process was closed.");
          },
        });
      } else {
        console.error("Midtrans Snap.js not loaded properly.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to create order or transaction.");
    }
    setLoading(false);
  };

  return (
    <div className="menu-section">
      <h1 className="section-title">Recommended Food & Beverages for you</h1>
      <div className="form-section">
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select name="gender" id="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="mood">Mood:</label>
          <select name="mood" id="mood" value={formData.mood} onChange={handleChange}>
            <option value="">Select</option>
            {["happy", "loved", "focus", "chill", "sad", "scared", "angry", "neutral"].map((mood) => (
              <option key={mood} value={mood}>
                {mood}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="activity">Activity Level:</label>
          <select name="activity" id="activity" value={formData.activity} onChange={handleChange}>
            <option value="">Select</option>
            {["lightly_active", "moderately_active", "very_active", "extra_active", "sedentary"].map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="foodType">Food Type:</label>
          <select name="foodType" id="foodType" value={formData.foodType} onChange={handleChange}>
            <option value="">Select</option>
            <option value="main_course">Main Course</option>
            <option value="snack">Snack</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="drinkType">Drink Type:</label>
          <select name="drinkType" id="drinkType" value={formData.drinkType} onChange={handleChange}>
            <option value="">Select</option>
            <option value="coffee">Coffee</option>
            <option value="non-coffee">Non Coffee</option>
          </select>
        </div>
      </div>
      <div className="checkout-section">
        <button className="checkout-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {loading ? (
        <p>Loading recommendations...</p>
      ) : (
        <div className="recap-section">
          <h2 className="recap-title">Your Trolley</h2>
          <p><strong>Food:</strong> {recommendations.food}</p>
          <p><strong>Beverage:</strong> {recommendations.beverage}</p>
          {selectedGameId && (
            <>
              <p><strong>Game:</strong> {gameDetails.name}</p>
              <p className="game-price"><strong>Total Game Amount:</strong> {gameDetails.price}</p>
            </>
          )}
          {showPaymentButton && (
            <button className="checkout-button" onClick={handleCheckout}>
              Pay Now
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuSection;
