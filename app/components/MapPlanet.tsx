"use client";
import { useEffect, useState } from "react";

// A page's planet shows only when the visitor flew here from the homepage map. The galaxy
// writes the destination path to sessionStorage just before it navigates. Someone who
// arrives from a search result sees the same page without a planet, which would make no
// sense to them without the map.
export const MAP_ARRIVAL_KEY = "pv-map-arrival";

export default function MapPlanet({ planet, wide }: { planet: string; wide: boolean }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (sessionStorage.getItem(MAP_ARRIVAL_KEY) === window.location.pathname) setShow(true);
    } catch {}
  }, []);
  if (!show) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`ui-hero__planet${wide ? " ui-hero__planet--wide" : ""}`}
      src={`/galaxy/planets/${planet}.jpg`}
      alt=""
      aria-hidden="true"
      width={360}
      height={360}
    />
  );
}
