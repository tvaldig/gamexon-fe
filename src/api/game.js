const API_URL = 'https://gamexoncafe-fxdhfkaudag3eka2.southeastasia-01.azurewebsites.net/';

export const getAllGames = async (token) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/games`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch games');
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

export const getRecommendation = async (token, gameid) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/recommendations/${gameid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }
  
      const data = await response.json();
  
      const titles = data.map((game) => game.title);
  
      return titles;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  };

  // Fetch game details by game ID
export const getGamebyId = async (token, game_id) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/games/${game_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch game details');
      }
  
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error fetching game details:', error);
      throw error;
    }
  };
  
  // Fetch game price by game ID
  export const getGamePricebyId = async (token, game_id) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/games/price/${game_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch game price');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching game price:', error);
      throw error;
    }
  };
  
  