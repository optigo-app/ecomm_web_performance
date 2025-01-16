import { useEffect, useState } from "react";

const UseNewsletter = (USER_EMAIL) => {
  const [NEWSLETTER_API, setNEWSLETTER_API] = useState(null);
  const [Message, setMessage] = useState({
    loading: false,
    status: null,
  });
  useEffect(() => {
    const store_init = JSON?.parse(sessionStorage?.getItem("storeInit")) ?? {};
    const value = store_init?.newslatter;
    setNEWSLETTER_API(value);
  }, []);


  const HandleFormSubmit = async () => {
    setMessage({
      loading: true,
      status: "...loading",
    });
    try {
      const response = await fetch(NEWSLETTER_API + USER_EMAIL);
      const results = await response.text();
      const msg = "Already Subscribed.";
      console.log(results , "msg")
      if (response.ok || response.status === 200) {
        if (results === msg) {
          setMessage({
            loading: false,
            status: results,
          });
        } else {
          setMessage({
            loading: false,
            status: results,
          });
        }
        return results;
      }
    } catch (error) {
      setMessage({
        loading: false,
        status: error,
      });
      return error;
    } finally {
      setMessage({
        loading: true,
        status: "...loading",
      });
    }
  };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setMessage({
//         loading: false,
//         status: "",
//       });
//     }, 4000);

//     return () => clearTimeout(timer);
//   }, [Message]);

  return {
    onsubmit: HandleFormSubmit,
    status: Message,
  };
};

export default UseNewsletter;
