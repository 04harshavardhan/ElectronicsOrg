import React from "react";
import { useSpring, animated } from "react-spring";

export default function AlertBox({ alert }) {
  const style = useSpring({
    opacity: alert.visible ? 1 : 0,
  });

  return (
    <div className="alert-box">
      {alert.visible ? (
        <animated.div style={style} className="alert" role="alert">
          {alert.msg}
        </animated.div>
      ) : (
        ""
      )}
    </div>
  );
}
