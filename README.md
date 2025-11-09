# Word Cloud Generator

A full-stack application that generates word clouds from random words fetched from an external API. The frontend displays words with sizes based on their frequency and assigns each word a unique color.

## How It Works

### Font Size Scaling

The word cloud uses a simple scaling function to determine font sizes:

```typescript
const getFontSize = (count, minCount, maxCount) => {
  const minSize = 12;
  const maxSize = 64;
  if (maxCount === minCount) return minSize;
  const ratio = (count - minCount) / (maxCount - minCount);
  return minSize + (maxSize - minSize) * ratio;
};
```

**What this does:**
- Takes each word's frequency count
- Finds the minimum and maximum counts across all words
- Calculates where this word falls between min and max (the ratio)
- Maps that ratio to a font size between 12px and 64px
- Result: More frequent words get bigger font sizes

Example: If a word appears 100 times and the range is 10-100, it gets the maximum size (64px). A word appearing 10 times gets the minimum size (12px).

### Backend Batching and Concurrency

The backend fetches 6000 random words from an external API efficiently using batching and concurrency:

**Batching:**
- Instead of making 6000 individual requests, we split them into batches of 600
- This means 10 batches total (6000 ÷ 600 = 10)
- Reduces overhead and is easier to manage

**Concurrency:**
- Within each batch, all 600 requests run at the same time using `Promise.all()`
- We don't wait for one request to finish before starting the next
- This is much faster than doing them one by one

**Why this approach:**
- Making 6000 requests at once would overwhelm the system
- Making them one at a time would take forever
- Batches of 600 concurrent requests is a good balance
- Each batch completes before starting the next one

The result: We can fetch 6000 words in seconds instead of minutes.

## Running the Application

### Option 1: Docker (Recommended)

**Prerequisites:**
- Docker Desktop installed and running

**Steps:**

1. Navigate to the project directory:
```bash
cd E:\src
```

2. Start the application:
```bash
docker-compose up --build
```

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

4. To stop:
   - Press `Ctrl+C` in the terminal

### Option 2: Local Development

**Prerequisites:**
- Node.js 18 or higher installed
- npm installed

**Backend:**

1. Navigate to backend directory:
```bash
cd E:\src\word-cloud-gen-backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm run dev
```

The backend will run on http://localhost:3000

**Frontend:**

1. Open a new terminal and navigate to frontend directory:
```bash
cd E:\src\word-cloud-gen-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

## Using the Application

1. Open http://localhost:5173 in your browser
2. Click the "Get Words" button
3. Wait a few seconds while the backend fetches 6000 random words
4. The word cloud will display with:
   - Larger words appearing more frequently
   - Each word in a unique color
   - Words rotated horizontally or vertically

## Project Structure

```
E:\src\
├── word-cloud-gen-backend/     # Express API
│   ├── src/
│   │   ├── server.ts          # Main server file
│   │   └── services/
│   │       └── word-api.ts    # Word fetching logic
│   ├── Dockerfile
│   └── package.json
│
├── word-cloud-gen-frontend/    # React app
│   ├── src/
│   │   ├── App.tsx            # Main component
│   │   └── App.css            # Styles
│   ├── Dockerfile
│   └── package.json
│
└── docker-compose.yml          # Docker orchestration
```

## Technologies Used

- **Backend:** Node.js, Express, TypeScript
- **Frontend:** React, TypeScript, Vite
- **Containerization:** Docker, Docker Compose
- **External API:** https://random-word-api.vercel.app

## Features

- Fetches 6000 random words from external API
- Calculates word frequency
- Dynamic font sizing based on frequency
- Unique persistent color for each word
- Horizontal and vertical word rotation
- Responsive design
- Dockerized for easy deployment

