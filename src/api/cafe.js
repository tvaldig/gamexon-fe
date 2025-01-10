const API_URL = 'https://gamexoncafe-fxdhfkaudag3eka2.southeastasia-01.azurewebsites.net/';
export const getMenuRecommendation = async (token, gender, mood, foodType, drinkType, activityLevel) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/cafe/recommendation?gender=${gender}&mood=${mood}&food_type=${foodType}&drink_type=${drinkType}&activity_level=${activityLevel}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch cafe recommendation');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cafe recommendation:', error);
      throw error;
    }
  };
  

export const createOrder = async (token, orderData) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/cafe/orders/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(orderData), 
      });
  
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
  
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };
  
  export const createTransaction = async (token, orderId, gameId) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/cafe/transactions/?order_id=${orderId}&game_id=${gameId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }
  
      const data = await response.json();
      return data; // Return transaction details (e.g., token)
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  };
  