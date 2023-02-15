import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

import duckAnimation from "../static/groovyWalk.json";

const GroovyWalk = () => {
  const anime = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: anime.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: duckAnimation,
    });
    return () => lottie.stop();
  }, []);
  return <div style={{ height: 500 }} ref={anime}></div>;
};

export default GroovyWalk;
