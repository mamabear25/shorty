// // Server-side code

// import express from 'express';
// import { nanoid } from 'nanoid';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';

// const app = express();
// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:3001',
//   credentials: true,
// }));
// app.use(cookieParser());

// const urlMap = new Map();

// app.post('/api/shorten', (req, res) => {
//   const { url } = req.body;
//   const id = nanoid(6);

//   // Store the user's identifier on their device (cookie)
//   res.cookie('userIdentifier', id, { httpOnly: true });

//   // Associate the shortened URL with the user's identifier
//   const userHistory = urlMap.get(id) || [];
//   urlMap.set(id, [...userHistory, url]);

//   res.json({ shortUrl: `http://${req.hostname}:${req.socket.localPort}/${id}` });
// });

// app.get('/api/history', (req, res) => {
//   const userIdentifier = req.cookies.userIdentifier;

//   const userHistory = urlMap.get(userIdentifier) || [];

//   // Modify the userHistory array to contain objects with shortUrl and originalUrl properties
//   const formattedHistory = userHistory.map(url => ({ shortUrl: url, originalUrl: url }));

//   res.json({ history: formattedHistory });
// });


// app.get('/:id', (req, res) => {
//   const { id } = req.params;
//   const url = urlMap.get(id);

//   if (url) {
//     res.redirect(301, url);
//   } else {
//     res.status(404).json({ error: 'Invalid URL' });
//   }
// });

// const PORT = 4001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// Server-side code
import express from 'express';
import { nanoid } from 'nanoid';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fs from 'fs';

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));
app.use(cookieParser());

const historyFile = 'history.json';

// Load the history from the file or initialize an empty array
let urlHistory = [];
try {
  const data = fs.readFileSync(historyFile, 'utf8');
  urlHistory = JSON.parse(data);
} catch (err) {
  console.error('Error loading history:', err);
}

app.post('/api/shorten', (req, res) => {
  const { url } = req.body;
  const id = nanoid(6);
  const userIdentifier = req.cookies.userIdentifier;

  // Associate the shortened URL with the user's identifier
  urlHistory.push({ id, userIdentifier, shortUrl: `http://${req.hostname}:${req.socket.localPort}/${id}`, originalUrl: url });

  // Save the updated history to the file
  fs.writeFile(historyFile, JSON.stringify(urlHistory), 'utf8', (err) => {
    if (err) {
      console.error('Error saving history:', err);
    }
  });

  res.json({ shortUrl: `http://${req.hostname}:${req.socket.localPort}/${id}` });
});

app.get('/api/history', (req, res) => {
  const userIdentifier = req.cookies.userIdentifier;

  // Retrieve the user's history from the stored history array
  const userHistory = urlHistory.filter(item => item.userIdentifier === userIdentifier);

  res.json({ history: userHistory });
});

app.get('/:id', (req, res) => {
  const { id } = req.params;

  // Find the URL data in the history array
  const urlData = urlHistory.find(item => item.id === id);

  if (urlData) {
    res.redirect(301, urlData.originalUrl);
  } else {
    res.status(404).json({ error: 'Invalid URL' });
  }
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
