"use client"
import { Typewriter } from 'react-simple-typewriter';

function MyText() {
  return (
    <div className='text-2xl md:text-5xl lg:text-6xl z-10 mb-6'>
      <span className='text-base md:text-xl lg:text-2xl'>I am{' ,'}</span>
      <br />
      <span style={{ color: 'yellow', fontWeight: 'bold', marginLeft:-2 }}>
        <Typewriter
          words={['Lokesh Mondal','A Full Stack Developer', 'An UI/UX Designer', 'A Problem Solver']}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </span>
    </div>
  );
}
export default MyText