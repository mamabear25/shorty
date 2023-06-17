import React from 'react';

function Intro() {
  return (
    <div className="bg-gray-100 text-gray-800 p-8">
        <div className='container mx-auto mt-6'>
            <h1 className='text-gray-700 font-bold md:text-xl text-xl'>Introducing the simple and fast URL shortener <span className='text-brand md:text-2xl'>Scissors!</span></h1>
            <div className='mt-4 md:flex gap-4 font-medium'>
                <div className='bg-gray-800 text-gray-100 p-8 rounded mb-4'>
                    <p>
                        With our ShortURL service, you can easily shorten long links from Instagram, Facebook, YouTube, Twitter, LinkedIn, 
                        WhatsApp, TikTok, blogs, and websites. Say goodbye to lengthy URLs and enjoy a more concise and shareable link.
                    </p>
                </div>
                <div className='bg-gray-500 text-gray-100 p-4 rounded mb-4 hidden md:block'>
                    <p>
                        Using our user-friendly interface, simply paste the long URL into the provided field and click the "Shorten" button. In an instant, you'll 
                        receive a shortened URL that you can easily copy and share across various platforms, including websites, chat applications, and emails.
                    </p>
                </div>
                <div className='bg-gray-200 text-gray-900 p-4 rounded'>
                    <p>
                        You can use the shortened links anywhere, our shortened URLs are versatile and
                        adaptable. Experience the convenience of our ShortURL service today and simplify your link sharing process.
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Intro;
