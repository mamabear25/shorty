// import React, { useState, useEffect } from 'react';
// import { useCookies } from 'react-cookie';
// import UserHistory from './components/History';
// import Header from './components/Header';
// import Intro from './components/Intro';

// function App() {
//   const [url, setUrl] = useState('');
//   const [shortUrl, setShortUrl] = useState('');
//   const [userHistory, setUserHistory] = useState([]);
//   const [isCopied, setIsCopied] = useState(false);
//   const [cookies, setCookies] = useCookies(['userIdentifier']); // Retrieve the cookie

//   const handleCopy = () => {
//     navigator.clipboard.writeText(shortUrl)
//       .then(() => {
//         setIsCopied(true);
//         setTimeout(() => setIsCopied(false), 2000); // Reset copied status after 2 seconds
//       })
//       .catch((error) => {
//         console.error('Failed to copy:', error);
//       });
//   };

//   const fetchUserHistory = async () => {
//     try {
//       const response = await fetch('http://localhost:4001/api/history', {
//         headers: {
//           'Cookie': `userIdentifier=${cookies.userIdentifier}` // Pass the cookie with the request
//         }
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
//     // Fetch the user history when the component mounts
//     fetchUserHistory();
//   }, []);

//   const handleShorten = async () => {
//     const response = await fetch('http://localhost:4001/api/shorten', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ url }),
//     });
  
//     if (response.ok) {
//       const data = await response.json();
//       setShortUrl(data.shortUrl);
  
//       // Fetch the updated user history after shortening a URL
//       await fetchUserHistory(); // Make sure to await the function call
//     } else {
//       // Handle error
//     }
//   };

//   // Save user history in cookies
//   useEffect(() => {
//     setCookies('userIdentifier', userHistory, { path: '/' });
//   }, [userHistory, setCookies]);

  

//   return (
//     <div className='h-screen'>
//       <Header />
//       <div>
//         <Intro />
//         <div className='flex flex-col justify-center items-center mt-8'>
//           <div className='mb-10'>
//             <div className='mb-2 md:text-lg'>
//               <p className='font-bold'> Paste the URL to be shortened</p>
//             </div>
//             <input
//               className="h-10 md:w-[300px] border-2 border-gray-500 rounded-lg pl-4"
//               type="text"
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//             />
//             <button className="font-bold bg-orange-600 text-gray-50 px-4 py-2 rounded-lg hover:bg-blue-200" onClick={handleShorten}>Shorten</button>
//           </div>
//           <div className='mb-4'>
//             {shortUrl && (
//               <p className='font-bold'>
//                 Shortened URL:
//                 <span className='text-orange-600 bg-gray-100 p-2 rounded flex font-medium'>
//                   {shortUrl}
//                   <div onClick={handleCopy} className='ml-2 text-sm'>
//                   {isCopied ? 'Copied!' : 
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="w-5 h-5">
//                       <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
//                       <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
//                     </svg>
//                   }
//                 </div>
//                 </span>
//               </p>
//             )}
//           </div>
//         </div>
//         <UserHistory history={userHistory} />
//       </div>
//     </div>
//   );
// }

// export default App;









// Client-side code

import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import UserHistory from './components/History';
import Header from './components/Header';
import Intro from './components/Intro';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [userHistory, setUserHistory] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [cookies, setCookies] = useCookies(['userIdentifier']);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
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
      const response = await fetch('http://localhost:4001/api/history', {
        credentials: 'include' // Include credentials in the request
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
    const response = await fetch('http://localhost:4001/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
      credentials: 'include' // Include credentials in the request
    });
  
    if (response.ok) {
      const data = await response.json();
      setShortUrl(data.shortUrl);
      await fetchUserHistory();
    } else {
      // Handle error
    }
  };

  useEffect(() => {
    setCookies('userIdentifier', userHistory, { path: '/' });
  }, [userHistory, setCookies]);

  return (
    <div className='h-screen'>
      <Header />
      <div>
        <Intro />
        <div className='flex flex-col justify-center items-center mt-8'>
          <div className='mb-10'>
            <div className='mb-2 md:text-lg'>
              <p className='font-bold'> Paste the URL to be shortened</p>
            </div>
            <input
              className="h-10 md:w-[300px] border-2 border-gray-500 rounded-lg pl-4"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button className="font-bold bg-orange-600 text-gray-50 px-4 py-2 rounded-lg hover:bg-blue-200" onClick={handleShorten}>Shorten</button>
          </div>
          <div className='mb-4'>
            {shortUrl && (
              <p className='font-bold'>
                Shortened URL:
                <span className='text-orange-600 bg-gray-100 p-2 rounded flex font-medium'>
                  {shortUrl}
                  <div onClick={handleCopy} className='ml-2 text-sm'>
                  {isCopied ? 'Copied!' : 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="w-5 h-5">
                      <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
                      <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
                    </svg>
                  }
                </div>
                </span>
              </p>
            )}
          </div>
        </div>
        <UserHistory history={userHistory} />
      </div>
    </div>
  );
}

export default App;
