import React from 'react';

function Sidebar() {
  const sidebarStyles = {
    backgroundColor: 'gray-700',
    color: 'white',
    padding: '20px',
  };

  return (
    <div className="sidebar bg-gray-800 w-[20%] h-screen" style={sidebarStyles}>
      <h2>Resource Management System</h2>
      <ul className='mt-[20%]'>
      <li className='mt-[5%] font-semibold border-b border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer'>
    <a className="nav-link active" aria-current="page" href="#">Photograph</a>
  </li>
  <li className='mt-[5%] font-semibold border-b border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer'>
    <a className="nav-link active" aria-current="page" href="#">Resume Headline</a>
  </li>
  <li className='mt-[5%] font-semibold border-b border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer'>
    <a className="nav-link active" aria-current="page" href="#">Key Skills</a>
  </li>
  <li className='mt-[5%] font-semibold border-b border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer'>
    <a className="nav-link active" aria-current="page" href="#">IT Skills</a>
  </li>
  <li className='mt-[5%] font-semibold border-b border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer'>
    <a className="nav-link active" aria-current="page" href="#">Profile Summary</a>
  </li>
  <li className='mt-[5%] font-semibold border-b border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer'>
    <a className="nav-link active" aria-current="page" href="#">Relevant Experience</a>
  </li>
  <li className='mt-[5%] font-semibold border-b border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer'>
    <a className="nav-link active" aria-current="page" href="#">Total Experience</a>
  </li>
  <li className='mt-[5%] font-semibold border-b border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer'>
    <a className="nav-link active" aria-current="page" href="#">Resume Headline</a>
  </li>
  <li className='mt-[5%] font-semibold border-b border-gray-300 py-2 hover:bg-violet-100 hover:text-gray-900 cursor-pointer'>
    <a className="nav-link active" aria-current="page" href="#">Resume</a>
  </li>
        
      </ul>
    </div>
   
  );
}

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        {/* Main content goes here */}
      </div>
    </div>
  );
}

export default App;
