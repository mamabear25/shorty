// import React, { useState, useEffect } from 'react';
// import API_URL from "./config";

// function ShowAnalytics({ urlId }) {
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // ...

// useEffect(() => {
//   const fetchAnalytics = async () => {
//     try {
//       const response = await fetch(`${API_URL}/api/analytics/${urlId}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch analytics');
//       }
//       const data = await response.json();
//       setAnalyticsData(data.analytics);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error fetching analytics:', error);
//     }
//   };

//   fetchAnalytics();
// }, [urlId]);

// if (isLoading) {
//   return <p>Loading analytics...</p>;
// }

// if (!analyticsData) {
//   return <p>No analytics data available</p>;
// }

// // ...


//   return (
//     <div>
//       {/* <h2>Analytics for URL: {urlId}</h2> */}
//       <p className='text-orange-500'>Clicks: {analyticsData.clicks}</p>
//       <h3>Sources:</h3>
//       <ul>
//         {Object.entries(analyticsData.sources).map(([source, count]) => (
//           <li key={source}>
//             <p>{source}: {count}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ShowAnalytics;






import React, { useState, useEffect } from 'react';
import API_URL from './config';

function ShowAnalytics({ urlId }) {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ...

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`${API_URL}/api/analytics/${urlId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch analytics');
        }
        const data = await response.json();
        setAnalyticsData(data.analytics);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, [urlId]);

  if (isLoading) {
    return <p>Loading analytics...</p>;
  }

  if (!analyticsData || !analyticsData.sources) {
    return <p>No analytics data available</p>;
  }

  // ...

  return (
    <div>
      {/* <h2>Analytics for URL: {urlId}</h2> */}
      <p className="text-orange-500">Clicks: {analyticsData.clicks}</p>
      <h3>Sources:</h3>
      {Object.entries(analyticsData.sources).length > 0 ? (
        <ul>
          {Object.entries(analyticsData.sources).map(([source, count]) => (
            <li key={source}>
              <p>
                {source}: {count}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No sources found</p>
      )}
    </div>
  );
}

export default ShowAnalytics;



// import React, { useState, useEffect } from 'react';
// import API_URL from "./config";

// function ShowAnalytics({ urlId }) {
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // ...

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const response = await fetch(`${API_URL}/api/analytics/${urlId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch analytics');
//         }
//         const data = await response.json();
//         setAnalyticsData(data.analytics);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching analytics:', error);
//       }
//     };

//     fetchAnalytics();
//   }, [urlId]);

//   if (isLoading) {
//     return <p>Loading analytics...</p>;
//   }

//   if (!analyticsData || !analyticsData.sources) {
//     return <p>No analytics data available</p>;
//   }

//   // ...

//   return (
//     <div>
//       {/* <h2>Analytics for URL: {urlId}</h2> */}
//       <p className='text-orange-500'>Clicks: {analyticsData.clicks}</p>
//       <h3>Sources:</h3>
//       <ul>
//         {Object.entries(analyticsData.sources).map(([source, count]) => (
//           <li key={source}>
//             <p>{source}: {count}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ShowAnalytics;
