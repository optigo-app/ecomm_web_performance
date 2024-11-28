import { useState, useEffect } from "react";
import axios from "axios";

const useInstagramPosts = (username) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const options = {
        method: "GET",
        url: "https://instagram-scraper-2022.p.rapidapi.com/ig/posts_username/",
        params: { user: username },
        headers: {
          "x-rapidapi-key":
            "9b4829df0amsheec54efddc4fb1cp1f1bdajsne8e7b56c8b4e",
          "x-rapidapi-host": "instagram-scraper-2022.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setPosts(
          response.data?.data
            ?.xdt_api__v1__feed__user_timeline_graphql_connection?.edges
        );
      } catch (error) {
        // console.error("Error fetching posts:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [username]);

  return { posts, loading, error };
};

export default useInstagramPosts;
