import { useState, useEffect } from "react";
import axios from "axios";
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("InstagramPostsDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("posts")) {
        db.createObjectStore("posts", { keyPath: "username" });
      }
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
  });
};

const getPostsFromDB = async (username) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("posts", "readonly");
    const store = transaction.objectStore("posts");
    const request = store.get(username);

    request.onsuccess = () => {
      resolve(request.result ? request.result.data : null);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

const savePostsToDB = async (username, posts) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("posts", "readwrite");
    const store = transaction.objectStore("posts");
    const request = store.put({ username, data: posts });

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

const useInstagramPosts = (username) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const cachedPosts = await getPostsFromDB(username);
        if (cachedPosts) {
          setPosts(cachedPosts);
          setLoading(false);
          return;
        }

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

        const response = await axios.request(options);
        const fetchedPosts =
          response.data?.data?.xdt_api__v1__feed__user_timeline_graphql_connection?.edges;

        if (fetchedPosts) {
          setPosts(fetchedPosts);
          await savePostsToDB(username, fetchedPosts);
        }
      } catch (error) {
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
