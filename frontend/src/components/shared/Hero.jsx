import React from 'react'
import { ReactTyped } from 'react-typed'
import { Button } from '../ui/button'

const Hero = () => {
  return (
    <div>
      <div className="bg-white flex items-center mx-auto max-w-8xl my-12 gap-4" >
        <div className="w-1/2 mx-28">
          <div className="text-5xl font-bold mb-4 text-[#7032db]">
            Welcome to<br/>
            <span className="text-[#7032db] text-6xl">
              <ReactTyped
                strings={["CAPprepMate","College Predictor","Rank Prediction"]}
                typeSpeed={100}
                backSpeed={40}
                loop
                cursorChar="|"
                showCursor={true}
              />
            </span>
          </div>
          <p className="text-lg mb-6">
            Your Path to Success Starts Here: Predict, Rank,
            <br />
            and Choose Your Dream College!
          </p>
          <Button className="bg-[#3B71CA] text-white py-2 px-4 rounded hover:bg-cyan-600">
            Explore More...
          </Button>
        </div>
        <div className="w-3xl mt-6">
          <img
            src="https://media.licdn.com/dms/image/D5612AQEBe4P2riSSxg/article-cover_image-shrink_720_1280/0/1715427321785?e=2147483647&v=beta&t=T1KBBAzMlSq4koZZTbMY49LLsXpgLpK7KqdIHw0w98o"
            alt="illustration"
            className="w-200px h-200px rounded-full border-4 border-gray-300"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
