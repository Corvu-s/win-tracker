import { React } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../state/AppContext";
import { Card, Grid, Text, Divider, Button, Row } from "@nextui-org/react";

export default function GameDetails({ data }) {
  const router = useRouter();
  return (
    <div>
      <Button onPress={() => router.push("/")}>Back</Button>
      <p>Game Details for {data.gameName}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { game } = context.query;

  const data = { gameName: game };
  return {
    props: { data }, // will be passed to the page component as props
  };
}
