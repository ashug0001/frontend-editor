import { useEffect, useState } from "react";

export default function useMediaQuery(queryInput) {
  let query = queryInput;
  query = query.replace(/^@media( ?)/m, "");

  const supportMatchMedia =
    typeof window !== "undefined" && typeof window.matchMedia !== "undefined";

  const matchMedia = supportMatchMedia ? window.matchMedia : null;
  const defaultMatches = false;

  const [match, setMatch] = useState(() => {
    if (supportMatchMedia) {
      return matchMedia(query).matches;
    }

    return defaultMatches;
  });

  useEffect(() => {
    let active = true;

    if (!supportMatchMedia) {
      return undefined;
    }

    const queryList = matchMedia(query);

    const updateMatch = () => {
      if (active) {
        setMatch(queryList.matches);
      }
    };
    updateMatch();

    queryList.addListener(updateMatch);

    return () => {
      active = false;
      queryList.removeListener(updateMatch);
    };
  }, [query, matchMedia, supportMatchMedia]);

  return match;
}
