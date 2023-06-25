// import React, { useState, useEffect } from 'react';
// import { useCookies } from 'react-cookie';
// import UserHistory from './components/History';
// import Header from './components/Header';
// import Intro from './components/Intro';
// import API_URL from './components/config';
// import QRCode from 'qrcode.react';

// // Function to validate URL format
// const isValidURL = (url) => {
//   try {
//     new URL(url);
//     return true;
//   } catch (error) {
//     return false;
//   }
// };

// function App() {
//   const [url, setUrl] = useState('');
//   const [userHistory, setUserHistory] = useState([]);
//   const [isCopied, setIsCopied] = useState(false);
//   const [shortUrl, setShortUrl] = useState('');
//   const [cookies, setCookies] = useCookies(['userIdentifier']);
//   const [customAliasInput, setCustomAliasInput] = useState('');
//   const [isQRCodeGenerated, setIsQRCodeGenerated] = useState(false);
//   const [error, setError] = useState(null); // Error state for URL validation
//   const [isLoading, setIsLoading] = useState(false);
//   const [result, setResult] = useState(null);

//   const handleCopy = () => {
//     navigator.clipboard
//       .writeText(result)
//       .then(() => {
//         setIsCopied(true);
//         setTimeout(() => setIsCopied(false), 2000);
//       })
//       .catch((error) => {
//         console.error('Failed to copy:', error);
//       });
//   };

//   const fetchUserHistory = async () => {
//     try {
//       const response = await fetch(`${API_URL}/api/history`, {
//         credentials: 'include', // Include credentials in the request
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setUserHistory(data.history);
//       } else {
//         // Handle error
//       }
//     } catch (error) {
//       console.log('Error fetching user history:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUserHistory();
//   }, []);

//   const handleShorten = async () => {
//     // Check if the URL is valid
//     if (!isValidURL(url)) {
//       setError('Invalid URL');
//       return;
//     }
  
//     setError(''); // Clear any previous error
//     setIsLoading(true);
  
//     try {
//       const response = await fetch(`${API_URL}/api/shorten`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ url, customAlias: customAliasInput }), // Include the custom alias in the request body
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         setResult(data.shortUrl);
//         setUserHistory([...userHistory, { id: data.id, userIdentifier: cookies.userIdentifier, shortUrl: data.shortUrl, originalUrl: url }]);
//         setUrl('');
//         setCustomAliasInput('');
//       } else if (response.status === 429) {
//         setError('Too many trials, try again in 15 minutes');
//       } else if (response.status === 409) {
//         setError('Custom domain already taken. Please choose a different one.');
//       } else {
//         setError('Failed to create a shortened URL. Please try again.');
//       }
//     } catch (error) {
//       setError('Failed to create a shortened URL. Please try again.');
//     } finally {
//       // Reset loading state
//       setIsLoading(false);
//     }
//   };
  

//   const generateQRCode = () => {
//     setIsQRCodeGenerated(true);
//   };

//   const downloadQRCode = () => {
//     const canvas = document.querySelector('canvas');
//     const image = canvas.toDataURL('image/png');

//     const urlParts = url.split('/'); // Split the URL into parts
//     const fileName = `qrcode-${urlParts[urlParts.length - 1]}.png`; // Use the last part of the URL as the filename

//     const link = document.createElement('a');
//     link.href = image;
//     link.download = fileName;
//     link.click();
//   };

//   // useEffect(() => {
//   //   setCookies('userIdentifier', userHistory, { path: '/' });
//   // }, [userHistory, setCookies]);

//   useEffect(() => {
//     setCookies('userIdentifier', userHistory, { path: '/' });
//   }, [setCookies]);

//   return (
//     <div className="h-screen">
//       <Header />
//       <div>
//         <Intro />
//         <div className="flex flex-col justify-center items-center mt-8">
//           <div className="mb-10 ml-6 mr-6">
//             <div className="mb-2">
//               <p className="font-bold">Paste the URL to be shortened</p>
//             </div>
//             <input
//               className="h-10 w-full md:w-[300px] border border-gray-500 rounded-lg pl-4 mb-2 mr-2"
//               type="text"
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//               placeholder="URL"
//             />
//             <input
//               className="h-10 w-full md:w-[300px] border border-gray-500 rounded pl-4 mb-2"
//               type="text"
//               value={customAliasInput}
//               onChange={(e) => setCustomAliasInput(e.target.value)}
//               placeholder="Custom Domain (Optional)"
//             />
//             <button
//               className="font-bold bg-orange-600 text-gray-50 px-4 py-2 rounded-r hover:bg-blue-200 mb-2"
//               onClick={handleShorten}
//               disabled={isLoading}
//               >
//               {isLoading ? (
//                 <div className="flex items-center">
//                   <span className="mr-2">Loading...</span>
//                   <svg
//                     className="animate-spin h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 004 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zm10-5.28c0 2.485-.896 4.746-2.375 6.51l2.782 1.617A7.942 7.942 0 0020 12h-4zm-2-5.292C18.627 6 24 11.373 24 18h-4a7.96 7.96 0 00-2.625-5.73l-2.78 1.616zM5.625 5.73A7.96 7.96 0 004 12H0C0 5.373 5.373 0 12 0v4a7.963 7.963 0 00-6.375 5.73L5.625 5.73z"
//                     ></path>
//                   </svg>
//                 </div>
//               ) : (
//                 'Shorten'
//               )}
//             </button>
//             {isLoading && (
//               <p className="text-gray-500 mt-2">Loading...</p>
//             )}

//             {result && !isLoading && (
              
//               <div className="mt-4">
//                 <p className="font-bold">Shortened URL:</p>
//                 <span className="text-orange-600 bg-gray-100 p-2 rounded flex font-bold md:w-[250px]">
//                   {result}
//                   <div onClick={handleCopy} className="ml-2 text-sm">
//                     {isCopied ? (
//                       'Copied!'
//                     ) : (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 24 24"
//                         fill="gray"
//                         className="w-5 h-5"
//                       >
//                         <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
//                         <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
//                       </svg>
//                     )}
//                   </div>
//                 </span>
//                 <div className="mt-4">
//                   {!isQRCodeGenerated ? (
//                     <button
//                       className="font-bold bg-orange-600 text-gray-50 px-4 py-2 rounded-lg hover:bg-orange-700 mb-2"
//                       onClick={generateQRCode}
//                     >
//                       Generate QR Code
//                     </button>
//                   ) : (
//                     <>
//                       <QRCode value={shortUrl} size={128} />
//                       <div>
//                         <button
//                           className="font-bold bg-orange-600 mt-3 text-gray-50 px-6 py-1 rounded-lg hover:bg-orange-700 whitespace-nowrap"
//                           onClick={downloadQRCode}
//                         >
//                           Download
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}
//             {error && <p className="text-red-500 mt-2">{error}</p>}
//           </div>
//         </div>
//       </div>
//       <UserHistory userHistory={userHistory} />
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import UserHistory from './components/History';
import Header from './components/Header';
import Intro from './components/Intro';
import API_URL from "./components/config";
// import ShowAnalytics from './components/Analytics';
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
  
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
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