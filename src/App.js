import React, { useEffect, useState } from "react";
import { Client } from "@heroiclabs/nakama-js";

const client = new Client("defaultkey", "127.0.0.1", "7350");

function App() {
  const [socket, setSocket] = useState(null);
  const [matchId, setMatchId] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    const init = async () => {
      try {
        // ✅ Authenticate
        const session = await client.authenticateDevice(
          "device-" + Math.random()
        );

        const socket = client.createSocket();
        await socket.connect(session, true);

        setSocket(socket);
        setStatus("Connected. Finding match...");

        // ✅ MATCHMAKING (FIXED)
      let newMatchId;

      try {
        if (!window.localStorage.getItem("matchId")) {
          const match = await socket.createMatch("tic-tac-toe");
          newMatchId = match.match_id;
          window.localStorage.setItem("matchId", newMatchId);
          console.log("🆕 Created match:", newMatchId);
        } else {
          newMatchId = window.localStorage.getItem("matchId");
          console.log("🔁 Trying to join:", newMatchId);
        }

        await socket.joinMatch(newMatchId);

      } catch (err) {
        console.log("⚠️ Match expired. Creating new one...");

        const match = await socket.createMatch("tic-tac-toe");
        newMatchId = match.match_id;
        window.localStorage.setItem("matchId", newMatchId);

        await socket.joinMatch(newMatchId);
      }

      setMatchId(newMatchId);
      setStatus("Match Joined 🎮");

        // ✅ Listen for server updates
      socket.onmatchdata = (data) => {
        // ✅ Only process server broadcast (opCode 1)
        if (data.op_code !== 1) return;

        try {
          const decoded = new TextDecoder().decode(data.data);
          const state = JSON.parse(decoded);

          console.log("🔥 Server state:", state);

          if (state.board) {
            setBoard(state.board);
          }
        } catch (err) {
          console.error("Parsing error:", err);
        }
      };
      } catch (err) {
        console.error("❌ Init error:", err);
        setStatus("Error connecting ❌");
      }
    };

    init();
  }, []);

  // ✅ Handle click
  const handleClick = (index) => {
    if (!socket || !matchId) return;

    console.log("🖱️ Clicked:", index);

    const payload = new TextEncoder().encode(
      JSON.stringify({ position: index })
    );

    socket.sendMatchState(matchId, 1, payload);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Tic-Tac-Toe Multiplayer</h1>
      <p>{status}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {(board || []).map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: "100px",
              height: "100px",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;