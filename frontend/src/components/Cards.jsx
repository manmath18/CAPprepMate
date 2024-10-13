import React from "react";
import SCard from "./SCard";
import { Link } from "react-router-dom";

const Cards = () => {
    const user=true;
  return (
    <div>
      <div class="bg-blue-400 py-14">
        <h1 class="mt-8 text-center text-5xl text-white font-bold">
          Our Features & Services.
        </h1>
        <div class="md:flex md:justify-center md:space-x-8 md:px-14">
          <div class="mt-16 py-4 px-4 bg-whit w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
            <div class="w-sm">
              <img
                class="w-64"
                src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/a17abde8d83650a582a28432/users-with-speech-bubbles-vector_53876-82250.jpg"
                alt=""
              />
              <div class="mt-4 text-[#8148e2] text-center">
                <h1 class="text-xl font-bold">College Prediction</h1>
                <p class="mt-4 text-gray-600">
                Predict the best-fit colleges based on rank and percentile analysis.
                </p>
                {
                    !user ? <Link to="/signup"><button class="mt-8 mb-4 py-2 px-14 rounded-full bg-[#8148e2] text-white tracking-widest hover:bg-green-500 transition duration-200">
                    MORE
                  </button></Link> : <Link to="/collegep"><button class="mt-8 mb-4 py-2 px-14 rounded-full bg-[#8148e2] text-white tracking-widest hover:bg-green-500 transition duration-200">
                  MORE
                </button></Link>
                }
              </div>
            </div>
          </div>

          <div class="mt-16 py-4 px-4 bg-whit w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
            <div class="w-sm">
              <img
                class="w-64"
                src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/3b242447f922540fbe750cab/fdf.jpg"
                alt=""
              />
              <div class="mt-4 text-[#8148e2] text-center">
                <h1 class="text-xl font-bold">Rank Prediction</h1>
                <p class="mt-4 text-gray-600">
                Predict rank based on student performance and available data.
                </p>
                <Link to="/signup"><button class="mt-8 mb-4 py-2 px-14 rounded-full bg-[#8148e2] text-white tracking-widest hover:bg-green-500 transition duration-200">
                  MORE
                </button></Link>
              </div>
            </div>
          </div>
          <div class="mt-16 py-4 px-4 bg-whit w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
            <div class="w-sm">
              <img
                class="w-64"
                src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/8cc47b39e719570b996d9879/dsds.jpg"
                alt=""
              />
              <div class="mt-4 text-[#8148e2] text-center">
                <h1 class="text-xl font-bold">Marks to Percentile Prediction</h1>
                <p class="mt-4 text-gray-600">
                Convert marks to percentile for better evaluation.
                </p>
                <Link to="/signup"><button class="mt-8 mb-4 py-2 px-14 rounded-full bg-[#8148e2] text-white tracking-widest hover:bg-green-500 transition duration-200">
                  MORE
                </button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
