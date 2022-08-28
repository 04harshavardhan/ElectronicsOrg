import { useEffect, useState } from "react";

export default function useAlerts() {
  const [msg, setMsg] = useState("");
  const [visible, setVisiblity] = useState(false);

  function makeAlert(msg) {
    setMsg(msg);
    setVisiblity(() => true);
  }

  useEffect(() => {
    setTimeout(() => {
      if (visible) {
        setVisiblity(false);
      }
    }, 4000);
  });

  return { alert: { msg, visible }, makeAlert };
}
