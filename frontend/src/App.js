import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import UserHistory from './components/History';
import Header from './components/Header';
import Intro from './components/Intro';
import API_URL from "./components/config";
import dns from 'dns';
import QRCode from 'qrcode.react';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [userHistory, setUserHistory] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [cookies, setCookies] = useCookies(['userIdentifier']);
  const [urlId, setUrlId] = useState(null); // State for storing the URL ID
  const [customAliasInput, setCustomAliasInput] = useState('');
  const [isQRCodeGenerated, setIsQRCodeGenerated] = useState(false);
  const [error, setError] = useState(null); // Error state for URL validation

  const handleCopy = () => {
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
      });
  };

  const fetchUserHistory = async () => {
    try {
      const response = await fetch(`${API_URL}/api/history`, {
        credentials: 'include', // Include credentials in the request
      });

      if (response.ok) {
        const data = await response.json();
        setUserHistory(data.history);
      } else {
        // Handle error
      }
    } catch (error) {
      console.log('Error fetching user history:', error);
    }
  };

  useEffect(() => {
    fetchUserHistory();
  }, []);

  const handleShorten = async () => {
    // Validate the URL
    const isValidUrl = isValidURL(url);
    if (!isValidUrl) {
      setError('Invalid URL');
      return;
    }
  
    setError(null); // Clear any previous error
  
    try {
      const response = await fetch(`${API_URL}/api/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, customAlias: customAliasInput }), // Include the custom alias in the request body
        credentials: 'include', // Include credentials in the request
      });
  
      if (response.ok) {
        const data = await response.json();
        setShortUrl(data.shortUrl);
        setIsQRCodeGenerated(false);
        await fetchUserHistory();
  
        // Extract the URL ID from the short URL
        const regex = /http:\/\/[^/]+\/(.+)/;
        const match = data.shortUrl.match(regex);
        if (match) {
          setUrlId(match[1]);
        }
      } else if (response.status === 429) {
        setError('Too many trials, try again in 15 minutes');
      } else {
        setError('Failed to create a shortened URL. Please try again.'); // Set error message for other API request failures
      }
    } catch (error) {
      setError('Failed to create a shortened URL. Please try again.'); // Set error message for network errors
    }
  };
  
  
  // Function to validate URL format
  const isValidURL = async (url) => {
    const urlPattern = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w\u0080-\u00ff@\/#?&-=]+)?$/i;
    const match = url.match(urlPattern);
  
    if (!match) {
      return false; // Invalid URL format
    }
  
    const host = match[2]; // Extract the host from the URL
    return new Promise((resolve) => {
      dns.lookup(host, (err) => {
        if (err) {
          resolve(false); // Invalid host
        } else {
          resolve(true); // Valid URL
        }
      });
    });
  };
  

  const generateQRCode = () => {
    setIsQRCodeGenerated(true);
  };

  const downloadQRCode = () => {
    const canvas = document.querySelector('canvas');
    const image = canvas.toDataURL('image/png');
    
    const urlParts = url.split('/'); // Split the URL into parts
    const fileName = `qrcode-${urlParts[urlParts.length - 1]}.png`; // Use the last part of the URL as the filename
  
    const link = document.createElement('a');
    link.href = image;
    link.download = fileName;
    link.click();
  };

  useEffect(() => {
    setCookies('userIdentifier', userHistory, { path: '/' });
  }, [userHistory, setCookies]);

  return (
    <div className="h-screen">
      <Header />
      <div>
        <Intro />
        <div className="md:flex flex-col justify-center items-center mt-8">
          <div className="mb-10">
            <div className="mb-2">
              <p className="font-bold">Paste absolute URL to be shortened</p>
            </div>
            <input
              className="h-10 md:w-[300px] border border-gray-500 rounded-lg pl-4 mr-4"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Url" 
            />
            <input
              className="h-10 md:w-[200px] border border-gray-500 pl-4 rounded-l-lg text-sm"
              type="text"
              value={customAliasInput}
              onChange={(e) => setCustomAliasInput(e.target.value)}
              placeholder="Custom Domain (Optional)" // Add a placeholder for the input field
            />
            <button
              className="font-bold bg-orange-600 text-gray-50 px-4 py-2 rounded-r hover:bg-blue-200"
              onClick={handleShorten}
            >
              Shorten
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message if present */}
          </div>
          <div className="mb-4">
            {shortUrl && (
              <div>
                <p className="font-bold">Shortened URL:</p>
                <span className="text-orange-600 bg-gray-100 p-2 rounded flex font-medium">
                  {shortUrl}
                  <div onClick={handleCopy} className="ml-2 text-sm">
                    {isCopied ? (
                      'Copied!'
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="gray"
                        className="w-5 h-5"
                      >
                        <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
                        <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
                      </svg>
                    )}
                  </div>
                </span>
                <div className="mt-4">
                  {!isQRCodeGenerated ? (
                    <button
                      className="font-bold bg-orange-600 text-gray-50 px-4 py-2 rounded-lg hover:bg-orange-700"
                      onClick={generateQRCode}
                    >
                      Generate QR Code
                    </button>
                  ) : (
                    <>
                      <QRCode value={shortUrl} size={128} />
                      <div>
                        <button
                          className="font-bold bg-orange-600 mt-3 text-gray-50 px-6 py-1 rounded-lg hover:bg-orange-700 whitespace-nowrap"
                          onClick={downloadQRCode}
                        >
                          Download
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <UserHistory history={userHistory} />
        {/* {urlId && <ShowAnalytics urlId={urlId} />} */}
      </div>
    </div>
  );
}

export default App;

