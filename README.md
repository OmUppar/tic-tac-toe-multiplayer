# 🎮 Tic-Tac-Toe Multiplayer (Nakama + React)

A real-time multiplayer Tic-Tac-Toe game built using **React** (frontend) and **Nakama** (backend with server-authoritative matches).

---

## 🚀 Features

- Real-time multiplayer gameplay
- Server-authoritative game logic
- Match creation and joining
- Turn-based system (X / O)
- Persistent connection using WebSockets

---

## 🏗️ Architecture

### Frontend

- React.js
- Nakama JS Client (`@heroiclabs/nakama-js`)
- WebSocket-based real-time updates

### Backend

- Nakama game server
- CockroachDB (database)
- Docker-based setup
- Server-authoritative match handler

---

## ⚙️ Setup & Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/tic-tac-toe-multiplayer.git
cd tic-tac-toe-multiplayer
```

---

### 2️⃣ Start Backend (Nakama + DB)

```bash
cd backend
docker-compose up --build
```

✔ Services:

- Nakama → http://localhost:7350
- CockroachDB → http://localhost:8081

---

### 3️⃣ Start Frontend

```bash
cd frontend
npm install
npm start
```

App runs at:

```
http://localhost:3000
```

---

## 🎯 How Multiplayer Works

1. User connects to Nakama using device authentication
2. A match is created or joined
3. Players click on grid → move sent to server
4. Server validates move and updates board
5. Updated state is broadcast to all players
6. UI updates in real-time

---

## 🔌 API / Server Configuration

### Nakama Client Config

```js
const client = new Client("defaultkey", "127.0.0.1", "7350");
```

### Match Handler

- `matchInit` → Initialize game state
- `matchJoin` → Add players
- `matchLoop` → Process moves
- `broadcastMessage` → Send updated state

---

## 🧪 How to Test Multiplayer

### Method 1: Two Tabs

- Open app in 2 browser tabs
- Both join same match
- Play turns alternately

### Method 2: Two Devices

- Open app on different systems
- Ensure same Nakama server
- Play real-time
- Server-authoritative model prevents cheating
- Stateless frontend (UI only reflects server)
- WebSocket used for real-time sync
- Docker ensures consistent backend setup

---

## 🛠️ Future Improvements

- Add player matchmaking queue
- Add game restart
- Add score tracking
- Add UI enhancements
