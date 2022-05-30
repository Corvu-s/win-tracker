import { React } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../state/AppContext";

export default function GameDetails({ gameTitle }) {
  console.log(gameTitle);
  return (
    <div>
      <p>Game Details for {gameTitle}</p>
    </div>
  );
}

export async function getStaticProps(context) {
  const { game } = context.query;

  return {
    props: { gameTitle: game }, // will be passed to the page component as props
  };
}
