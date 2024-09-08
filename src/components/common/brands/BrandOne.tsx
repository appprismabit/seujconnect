"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useState, useEffect } from "react";

import cabage from "@/assets/img/vegitables/cabage.png";
import cauliflower from "@/assets/img/vegitables/culiflower.png";
import onion from "@/assets/img/vegitables/onion.png";
import potato from "@/assets/img/vegitables/onion.png";
import tomato from "@/assets/img/vegitables/tomato.png";

const brand_data: StaticImageData[] = [
  cabage,
  cauliflower,
  onion,
  potato,
  tomato,
];

const BrandOne = ({ style }: any) => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString());
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className={`brand-area ${style ? "brand-area-two" : ""}`}>
      <div className="container-fluid">
        <div className="container text-center">
          <h6 className="text-white">
            Market Prices as on :: {currentTime.toLocaleString()}{" "}
          </h6>
        </div>

        <Marquee className="marquee_mode" pauseOnHover={false} play={!isPaused}>
          {brand_data.map((item, i) => (
            <div
              key={i}
              className="brand__item"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <Link href="#">
                <Image src={item} alt="brand" width={50} />
              </Link>
              <h4 className="text-white">Rs. 50</h4>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default BrandOne;
