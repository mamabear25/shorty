import React, { useState } from 'react';
import Link from '../assets/link.jpg';
import ShowAnalytics from './Analytics';
import { toDataURL } from 'qrcode';

const UserHistory = ({ history }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [qrCode, setQRCode] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const generateQRCode = async (url) => {
    try {
      const qrCodeDataUrl = await toDataURL(url);
      setQRCode(qrCodeDataUrl);
      setSelectedItem(url);
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

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div>
      <div className="text-center md:mt-[100px]">
        <button
          className="md:text-xl text-lg font-bold mb-4 mx-auto p-2 text-brand rounded-xl flex"
          onClick={toggleHistory}
        >
          {showHistory ? 'Hide History' : 'Show History'}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-2">
                <path fillRule="evenodd" d="M20.03 4.72a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 11.69l6.97-6.97a.75.75 0 011.06 0zm0 6a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06L12 17.69l6.97-6.97a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>
        </button>
        {showHistory && (
          <>
            {history.length > 0 ? (
              <table className="w-[900px] mx-auto divide-y divide-gray-200">
                <thead>
                  <tr className="text-center font-bold">
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
                        <td className="px-6 py-4 whitespace-nowrap">{item.originalUrl ? item.originalUrl.slice(0, 50) + '...' : ''}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <ShowAnalytics urlId={item.id} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {selectedItem === item.shortUrl && qrCode ? (
                            <>
                              <button className="ml-2 text-green-500 hover:underline" onClick={downloadQRCode}>
                                Download QR Code
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="text-brand hover:underline"
                                onClick={() => generateQRCode(item.shortUrl)}
                              >
                                Generate QR Code
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>
            ) : (
              <p className="text-gray-500">You haven't shortened any links yet</p>
            )}
          </>
        )}
      </div>
      <img src={Link} alt="link" className="md:w-[200px] w-[100px]" />
    </div>
  );
};

export default UserHistory;



