import React from 'react';

function Intro() {
  return (
    <div className="bg-gray-100 text-gray-800 p-8">
        <div className='container mx-auto mt-6'>
            <h1 className='text-gray-700 font-bold md:text-xl text-xl'>Introducing the simple and fast URL shortener <span className='text-brand md:text-2xl'>Scissors!</span></h1>
            <div className='mt-4 md:flex gap-4 font-medium'>
                <div className='bg-gray-800 text-gray-100 p-8 rounded mb-4'>
                    <p>
                        <span className='text-orange-300'>URL Shortening: </span> shorten long links from Instagram, Facebook, YouTube, Twitter, LinkedIn, 
                        WhatsApp, TikTok, blogs, and websites. Say goodbye to lengthy URLs and enjoy a more concise and shareable link.
                    </p>
                </div>
                <div className='bg-gray-500 text-gray-100 p-8 rounded mb-4 hidden md:block'>
                    <p>
                        <span className='text-orange-400'>Custom URLs: </span>
                        Scissor also allows users to customize their shortened URLs. Users can choose their own custom domain name and customize the URL to reflect their brand or content. This feature is particularly useful for individuals or small businesses who want to create branded links for their 
                    </p>
                </div>
                <div className='bg-gray-200 text-gray-900 p-10 rounded'>
                    <p>
                        <span className='text-orange-600'>QR Code Generation: </span>
                        Scissor allows you to generate QR codes for the shortened URLs. Simply download the QR code image and use it in your promotional materials and website.
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Intro;
