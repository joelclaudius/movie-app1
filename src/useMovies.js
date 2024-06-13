import { useState, useEffect } from "react";

const KEY = process.env.REACT_APP_IMDB_KEY;

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    callback?.();
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Error fetching movies");

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setError(null);
      } catch (err) {
        console.error(err.message);
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError(null);
      return;
    }

    // handleCloseMovie();
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
