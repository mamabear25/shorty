// import React, { useState } from 'react';
// import Link from '../assets/link.jpg';
// import ShowAnalytics from './Analytics';
// import { toDataURL } from 'qrcode';

// const UserHistory = ({ history }) => {
//     const [qrCode, setQRCode] = useState(null);

//     const generateQRCode = async (url) => {
//         try {
//         const qrCodeDataUrl = await toDataURL(url);
//         setQRCode(qrCodeDataUrl);
//         } catch (error) {
//         console.error('QR Code generation failed:', error);
//         }
//     };

//     const downloadQRCode = () => {
//         const link = document.createElement('a');
//         link.href = qrCode;
//         link.download = 'qrcode.png';
//         link.click();
//     };

//     return (
//         <div>
//             <div className="text-center mt-4">
//                 <h2 className="md:text-xl text-lg font-bold mb-4 bg-brand md:w-[140px] w-[100px] mx-auto p-2 text-gray-50 rounded-xl">
//                     History
//                 </h2>
//                 {history.length > 0 ? (
//                     <table className="w-[900px] mx-auto divide-y divide-gray-200">
//                         <thead >
//                             <tr className='text-center font-bold'>
//                                 <th className="px-6 py-3 bg-gray-100 text-xs text-gray-800 uppercase tracking-wider">
//                                     Shortened URL
//                                 </th>
//                                 <th className="px-6 py-3 bg-gray-100 text-xs text-gray-800 uppercase tracking-wider">
//                                     Original URL
//                                 </th>
//                                 <th className="px-6 py-3 bg-gray-100 text-xs text-orange-500 uppercase tracking-wider">
//                                     Analytics
//                                 </th>
//                                 <th className="px-6 py-3 bg-gray-100 text-xs text-gray-800 uppercase tracking-wider">
//                                     QR Code
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {history.map((item, index) => (
//                                 <tr key={index}>
//                                     <td className="px-6 py-4 whitespace-nowrap">{item.shortUrl}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{item.originalUrl.slice(0,50)}...</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <ShowAnalytics urlId={item.id} />
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <button
//                                             className="text-blue-500 hover:underline"
//                                             onClick={() => generateQRCode(item.shortUrl)}
//                                         >
//                                             Generate QR Code
//                                         </button>
//                                         {qrCode && (
//                                             <button
//                                                 className="ml-2 text-blue-500 hover:underline"
//                                                 onClick={downloadQRCode}
//                                             >
//                                                 Download QR Code
//                                             </button>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p className="text-gray-500">You haven't shortened any links yet</p>
//                 )}
//             </div>
//             <img src={Link} alt="link" className="md:w-[200px] w-[100px]" />
//         </div>
//     );
// };

// export default UserHistory;



import React, { useState } from 'react';
import Link from '../assets/link.jpg';
import ShowAnalytics from './Analytics';
import { toDataURL } from 'qrcode';

const UserHistory = ({ history }) => {
    const [qrCode, setQRCode] = useState(null);

    const generateQRCode = async (url) => {
        try {
        const qrCodeDataUrl = await toDataURL(url);
        setQRCode(qrCodeDataUrl);
        } catch (error) {
        console.error('QR Code generation failed:', error);
        }
    };

    const downloadQRCode = () => {
        const link = document.createElement('a');
        link.href = qrCode;
        link.download = 'qrcode.png';
        link.click();
    };

    return (
        <div>
            <div className="text-center mt-4">
                <h2 className="md:text-xl text-lg font-bold mb-4 bg-brand md:w-[140px] w-[100px] mx-auto p-2 text-gray-50 rounded-xl">
                    History
                </h2>
                {history.length > 0 ? (
                    <table className="w-[900px] mx-auto divide-y divide-gray-200">
                        <thead >
                            <tr className='text-center font-bold'>
                                <th className="px-6 py-3 bg-gray-100 text-xs text-gray-800 uppercase tracking-wider">
                                    Shortened URL
                                </th>
                                <th className="px-6 py-3 bg-gray-100 text-xs text-gray-800 uppercase tracking-wider">
                                    Original URL
                                </th>
                                <th className="px-6 py-3 bg-gray-100 text-xs text-orange-500 uppercase tracking-wider">
                                    Analytics
                                </th>
                                <th className="px-6 py-3 bg-gray-100 text-xs text-gray-800 uppercase tracking-wider">
                                    QR Code
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {history.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.shortUrl}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.originalUrl.slice(0,50)}...</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <ShowAnalytics urlId={item.id} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            className="text-blue-500 hover:underline"
                                            onClick={() => generateQRCode(item.shortUrl)}
                                        >
                                            Generate QR Code
                                        </button>
                                        {qrCode && (
                                            <button
                                                className="ml-2 text-blue-500 hover:underline"
                                                onClick={downloadQRCode}
                                            >
                                                Download QR Code
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">You haven't shortened any links yet</p>
                )}
            </div>
            <img src={Link} alt="link" className="md:w-[200px] w-[100px]" />
        </div>
    );
};

export default UserHistory;


