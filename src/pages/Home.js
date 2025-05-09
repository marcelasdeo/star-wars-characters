export default function Home({ characters }) {
  console.log('Personagens:', characters);
  return (
    <>
      <h1>Personagens de Star Wars</h1>
      <div>
        <ul>
          {characters.map((char) => (
            <li key={char.name}>{char.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}