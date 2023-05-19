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
  const [charList, setCharList] = useState({});

  async function getSpecie(reference) {
    const res = await fetch(reference);
    const data = await res.json();
    const specieName = data.name;

    return specieName;
  }

  useEffect(() => {
    peoples.map((people) => {
      for (let key in people) {
        if (key === "species") {
          let speciesUrl = people[key].length !== 0 ? people[key][0] : null;
          if (speciesUrl !== null) {
            getSpecie(speciesUrl).then((data) => {
              people["species"] = data;
            });
          }
        }
      }

      console.log(people);
    });
  }, []);

  return (
    <>
      <ul>
        {peoples.map((people) => (
          <li>{people.species}</li>
        ))}
      </ul>
      <h1>teste</h1>
    </>
  );
}
