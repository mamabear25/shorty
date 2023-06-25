import express from 'express';
import { nanoid } from 'nanoid';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import rateLimit from 'express-rate-limit';
import fs from 'fs';
import qrcode from 'qrcode';

const app = express();

app.use(cors({
  origin: 'https://scissorfrontend.onrender.com',
  credentials: true,
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://scissorfrontend.onrender.com');
  next();
});

// app.use(cors({
//   origin: 'http://localhost:3001',
//   credentials: true,
// }));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
//   next();
// });

app.use(express.json());
app.use(cookieParser());

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // limit each IP to 5 requests per windowMs
//   message: 'Too many requests from this IP, please try again later.',
// });

// app.use(limiter);

const historyFile = 'history.json';
const analyticsFile = 'analytics.json';

// Load the history from the file or initialize an empty array
let urlHistory = [];
try {
  const data = fs.readFileSync(historyFile, 'utf8');
  urlHistory = JSON.parse(data);
} catch (err) {
  console.error('Error loading history:', err);
}

// Load the analytics from the file or initialize an empty object
let urlAnalytics = {};
try {
  const data = fs.readFileSync(analyticsFile, 'utf8');
  urlAnalytics = JSON.parse(data);
} catch (err) {
  console.error('Error loading analytics:', err);
}

app.post('/api/shorten', async (req, res) => {
  const { url, customAlias } = req.body;
  const id = customAlias ? customAlias.trim() : nanoid(6);
  const userIdentifier = req.cookies.userIdentifier;

  // Generate QR code for the shortened URL
  const qrCodePath = `./public/qrcodes/${id}.png`; // Specify the path where QR codes will be stored

  try {
    await qrcode.toFile(qrCodePath, `http://${req.hostname}/${id}`); // Generate QR code and save it as a file
  } catch (error) {
    console.error('Error generating QR code:', error);
  }

  // Check if the custom alias is already in use
  const isAliasTaken = urlHistory.some((entry) => entry.id === id);
  if (isAliasTaken) {
    return res.status(409).json({ error: 'Custom alias is already taken.' });
  }

  // Associate the shortened URL with the user's identifier
  urlHistory.push({ id, userIdentifier, shortUrl: `http://${req.hostname}/${id}`, originalUrl: url });
  urlAnalytics[id] = { clicks: 0, sources: {} };

  // Save the updated history and analytics to the file
  fs.writeFile(historyFile, JSON.stringify(urlHistory), 'utf8', (err) => {
    if (err) {
      console.error('Error saving history:', err);
    }
  });
  fs.writeFile(analyticsFile, JSON.stringify(urlAnalytics), 'utf8', (err) => {
    if (err) {
      console.error('Error saving analytics:', err);
    }
  });

  res.json({ shortUrl: `https://${req.hostname}/${id}`, qrCode: `https://${req.hostname}/qrcodes/${id}.png` });

});



app.get('/', (req, res) => {
  res.status(200).send("Here's the homepage");
});

app.get('/api/history', (req, res) => {
  const userIdentifier = req.cookies.userIdentifier;

  // Retrieve the user's history from the stored history array
  const userHistory = urlHistory.filter(item => item.userIdentifier === userIdentifier);

  res.json({ history: userHistory });
});

app.get('/api/analytics/:id', (req, res) => {
  const { id } = req.params;

  // Find the analytics data for the specified URL ID
  const analytics = urlAnalytics[id];

  if (analytics) {
    res.json({ analytics });
  } else {
    // If the analytics data is not found, return an empty object
    res.json({ analytics: {} });
  }
});

app.get('/:id', (req, res) => {
  const { id } = req.params;

  // Find the URL data in the history array
  const urlData = urlHistory.find(item => item.id === id);

  if (urlData) {
    const analytics = urlAnalytics[id];
    analytics.clicks++;

    // Store the source of the click event
    const source = req.headers.referer || 'Direct';
    if (analytics.sources[source]) {
      analytics.sources[source]++;
    } else {
      analytics.sources[source] = 1;
    }

    // Save the updated analytics to the file
    fs.writeFile(analyticsFile, JSON.stringify(urlAnalytics), 'utf8', (err) => {
      if (err) {
        console.error('Error saving analytics:', err);
      }
    });

    res.redirect(301, urlData.originalUrl);
  } else {
    res.status(404).json({ error: 'Invalid URL' });
  }
});

app.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;

  // Find the URL data in the history array
  const urlData = urlHistory.find((item) => item.id === shortUrl);

  if (urlData) {
    const originalUrl = urlData.originalUrl;
    const analytics = urlAnalytics[shortUrl];

    // Increment the click count for the shortUrl in the analytics data
    if (analytics) {
      analytics.clicks++;
    } else {
      urlAnalytics[shortUrl] = {
        clicks: 1,
        sources: {},
      };
    }

    // Store the source of the click event
    const source = req.headers.referer || 'Direct';
    if (analytics && analytics.sources[source]) {
      analytics.sources[source]++;
    } else {
      if (analytics) {
        analytics.sources[source] = 1;
      }
    }

    // Save the updated analytics data
    fs.writeFile(analyticsFile, JSON.stringify(urlAnalytics), 'utf8', (err) => {
      if (err) {
        console.error('Error saving analytics:', err);
      }
    });

    // Determine the protocol to use based on the original URL
    const protocol = originalUrl.startsWith('https://') ? 'https' : 'http';

    // Redirect to the original URL using the appropriate protocol
    res.redirect(301, `${protocol}://${originalUrl}`);
  } else {
    res.status(404).json({ error: 'Invalid URL' });
  }
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
