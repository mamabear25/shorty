// import React from 'react';
// import Link from '../assets/link.jpg';

// function UserHistory({ history }) {

//     return (
//         <div className='text-center mt-4 text-black'>
//             <h2 className="md:text-xl text-lg font-bold mb-4 bg-brand md:w-[140px] w-[100px] mx-auto p-2 text-gray-50 rounded-xl">History</h2>
//             {history.length > 0 ? (
//                 <ul className="space-y-2">
//                     {history.map((item, index) => (
//                         <li key={index} className="flex items-center">
//                             <span className="mr-2">{item.shortUrl}</span>
//                             <span className="text-gray-500">{item.originalUrl}</span>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p className="text-gray-500">You're yet to shorten your first link</p>
//             )}
//             <img src={Link} alt='link' className='md:w-[200px] w-[100px]' />
//         </div>
//     );
// }

// export default UserHistory;


import React from 'react';
import Link from '../assets/link.jpg';

function UserHistory({ history }) {
  return (
    <div className="text-center mt-4">
      <h2 className="md:text-xl text-lg font-bold mb-4 bg-brand md:w-[140px] w-[100px] mx-auto p-2 text-gray-50 rounded-xl">
        History
      </h2>
      {history.length > 0 ? (
        <ul className="space-y-2">
          {history.map((item, index) => (
            <li key={index} className="flex items-center">
              <span className="mr-2">{item.shortUrl}</span>
              <span className="text-gray-500">{item.originalUrl}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">You haven't shortened any links yet</p>
      )}
      <img src={Link} alt="link" className="md:w-[200px] w-[100px]" />
    </div>
  );
}

export default UserHistory;
