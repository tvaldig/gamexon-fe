import React, { useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { usePagination } from "@table-library/react-table-library/pagination";
import {
  useRowSelect,
  SelectTypes,
  CellSelect,
  HeaderCellSelect,
} from "@table-library/react-table-library/select";
import gamesData from "./games_test.json";
import { getRecommendation } from "../../api/game";
import "./game.css";

// Your GameSection component
const GameSection = () => {
  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [similarGames, setSimilarGames] = useState([]); // Store similar games
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const selectedGameRef = useRef(null);

  const data = { nodes: gamesData };
  const filteredGames = data.nodes.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  const theme = useTheme([getTheme(), {
    HeaderRow: `background-color: #1B0167; color: white;`,
    Row: `
      &:nth-of-type(odd) { background-color: #d2e9fb; }
      &:nth-of-type(even) { background-color: #eaf5fd; }
      &:hover { background-color: #f1f1f1; }
      cursor: pointer;
    `,
  }]);

  const pagination = usePagination(data, {
    state: { page: 0, size: 50 },
    onChange: (action, state) => console.log("Pagination:", action, state),
  });

  const select = useRowSelect(
    { nodes: filteredGames },
    {
      onChange: (action, state) => {
        const selectedIds = action.payload.id;
        const selectedGame =
          filteredGames.find((game) => game.id === selectedIds) || null;
        setSelectedGame(selectedGame);

        if (selectedGameRef.current) {
          selectedGameRef.current.scrollIntoView({ behavior: 'smooth' });
        }

        // Fetch similar games when a new game is selected
        if (selectedGame) {
          fetchSimilarGames(selectedGame.id);
        }
      },
    },
    {
      buttonSelect: SelectTypes.SingleSelect,
    }
  );

  const handleSubmit = () => {
    if (selectedGame) {
      navigate("/menu", { state: { selectedGameId: selectedGame.id } });
    } else {
      alert("Please select a game before submitting!");
    }
  };

  const fetchSimilarGames = async (gameid) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("idToken")
      const similarGameTitles = await getRecommendation(token, gameid);
      setSimilarGames(similarGameTitles); 
    } catch (error) {
      console.error("Error fetching similar games:", error);
    }
    setLoading(false);
  };

  return (
    <div className="game-section">
      <h1 className="section-title">Select a Game</h1>

      <div className="search-section">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Title"
          className="search-input"
        />
        <button
          type="button"
          onClick={() => console.log("Search initiated:", search)}
          className="search-button"
        >
          Search
        </button>
      </div>

      <div className="table-wrapper">
        <Table
          data={{ nodes: filteredGames }}
          theme={theme}
          pagination={pagination}
          select={select}
          layout={{ fixedHeader: true }}
        >
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCellSelect />
                  <HeaderCell>ID</HeaderCell>
                  <HeaderCell>Title</HeaderCell>
                  <HeaderCell>Genre</HeaderCell>
                  <HeaderCell>Release Year</HeaderCell>
                  <HeaderCell>Price per Day</HeaderCell>
                  <HeaderCell>Rating</HeaderCell>
                </HeaderRow>
              </Header>
              <Body>
                {tableList.map((game) => (
                  <Row key={game.id} item={game}>
                    <CellSelect item={game} />
                    <Cell>{game.id}</Cell>
                    <Cell>{game.title}</Cell>
                    <Cell>{game.genre}</Cell>
                    <Cell>{game.release_year}</Cell>
                    <Cell>{game.price_per_day}</Cell>
                    <Cell>{game.rating}</Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </div>

      <div className="pagination-section">
        <div className="bottom-divider">
          <p>Total Pages: {pagination.state.getTotalPages(filteredGames)}</p>
          <div className="page-buttons">
            {pagination.state.getPages(filteredGames).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => pagination.fns.onSetPage(index)}
                className={`page-button ${
                  pagination.state.page === index ? "active" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <button onClick={handleSubmit} className="continue-button">
          Continue
        </button>
      </div>

      {selectedGame && (
        <div>
          <h2 className="selected-title">Selected Game:</h2>
          <p className="selected-text">Title: {selectedGame.title}</p>
        </div>
      )}

      {selectedGame && (
        <div className="similar-games">
          <h2 className="similar-title">Similar Games you might try..</h2>
          {loading ? (
            <p>Loading similar games...</p>
          ) : (
            <ul>
              {similarGames.length > 0 ? (
                similarGames.map((title, index) => (
                  <li key={index}>
                    <p className="selected-text">{title}</p>
                  </li>
                ))
              ) : (
                <p>No similar games found.</p>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default GameSection;
