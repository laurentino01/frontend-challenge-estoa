import { useEffect, useState } from "react";

export async function getStaticProps() {
  const res = await fetch("https://swapi.dev/api/people/");
  const data = await res.json();
  const peoples = data.results;

  return {
    props: {
      peoples,
    },
  };
}

export default function Home({ peoples }) {
  async function getRes(reference) {
    const res = await fetch(reference);
    const data = await res.json();
    const result = data.name || data.title;

    return result;
  }

  useEffect(() => {
    peoples.map((people) => {
      for (let key in people) {
        if (key === "species") {
          let speciesUrl = people[key].length !== 0 ? people[key][0] : null;
          if (speciesUrl !== null) {
            getRes(speciesUrl).then((data) => {
              people[key] = data;
            });
          }
        }

        if (key === "films") {
          let listFilms = [];
          let arrFilms = people[key];
          arrFilms.map((filmUrl) => {
            getRes(filmUrl).then((film) => {
              listFilms.push(film);
              people[key] = listFilms;
            });
          });
        }
      }
    });
  }, []);

  return (
    <>
      <ul>
        {peoples.map((people) => (
          <li className="mb-5">
            <h2>{people.name}</h2>
            <p>{people.species}</p>
            {people.films.map((film) => (
              <li>{film}</li>
            ))}
          </li>
        ))}
      </ul>
      <h1>teste</h1>
    </>
  );
}
