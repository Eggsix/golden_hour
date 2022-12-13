import { useState, useEffect } from "react";
import { useSunDataInterface } from "../interfaces/hooks/useSundata.interface";

const useSunData = ({ longitude, latitude }: useSunDataInterface) => {
  const [resource, setResource] = useState({});
  
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const response = await (await fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`, { signal : controller.signal })).json();
        setResource(response);
      } catch(err) {
        console.log(err)
      }
    })();
    return () => controller.abort();
  }, [longitude, latitude]);

  return resource;
};

export default useSunData