import React from "react";

function Toolbar() {
  return (
    <div className='fixed top-2 py-2 px-3 z-50 w-full'>
      <div className='max-w-5xl m-auto h-full bg-gray-900 flex items-center p-4 rounded'>
        <input className='bg-gray-100 text-gray-400' type='range' />
      </div>
    </div>
  );
}

export default Toolbar;
