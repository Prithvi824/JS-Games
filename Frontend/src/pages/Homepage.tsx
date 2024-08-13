import Details from "../components/details";
import Games from "../components/Games";

function Homepage() {
  const details = {
    heading: "What is Console?",
    para: "Console is a web app that enables two or more users to play games in real time. Users can easily navigate through the homepage, select a game, and either enter an existing room ID or create a new room. They can then share the room ID with friends and start playing games together in real time online.",
  };

  const gamesList = [
    { id: 1, name: "Tic Tac Toe", image: "ticTacToe.webp", rating: 4 },
    { id: 2, name: "Building this", image: "waiting.webp", rating: -1 },
    { id: 3, name: "Building this", image: "waiting.webp", rating: -1 },
    { id: 4, name: "Building this", image: "waiting.webp", rating: -1 },
    { id: 5, name: "Building this", image: "waiting.webp", rating: -1 },
    { id: 6, name: "Building this", image: "waiting.webp", rating: -1 },
    { id: 7, name: "Building this", image: "waiting.webp", rating: -1 },
    { id: 8, name: "Building this", image: "waiting.webp", rating: -1 },
    { id: 9, name: "Building this", image: "waiting.webp", rating: -1 },
    { id: 10, name: "Building this", image: "waiting.webp", rating: -1 },
    { id: 11, name: "Building this", image: "waiting.webp", rating: -1 },
  ];

  return (
    <section className="w-11/12 flex flex-col justify-center items-center">
      <Details heading={details.heading} para={details.para} />
      <Games gamesList={gamesList} />
    </section>
  );
}

export default Homepage;
