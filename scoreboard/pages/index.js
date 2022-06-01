import { Fragment, useState, useContext, useEffect } from "react";
import { useAppContext } from "../state/AppContext";
import { useRouter } from "next/router";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

import { Card, Grid, Text, Divider, Button, Row } from "@nextui-org/react";

export default function Home() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  const games = [
    "Four Souls",
    "Munchkin",
    "Setlers of Catan",
    "Terraforming Mars",
    "Wingspan",
  ];
  const people = [
    "Luke",
    "Josh",
    "Chen",
    "Ryan",
    "Julian",
    "Giuliano",
    "Annastasia",
  ];
  const [records, setRecrods] = useState(state.records);
  const [standings, setStandings] = useState([]);

  async function submitWin() {
    const win = await fetch(
      `/api/SubmitWin?name=${selectedPerson}&game=${selectedGame}`,
      { method: "POST" }
    ).then((res) => res.json());
    if (win != undefined || win != null) {
      //console.log(win);
    }
  }
  async function getReccords() {
    const result = await fetch(`/api/GetReccords`, { method: "GET" }).then(
      (res) => res.json()
    );
    if (result != undefined || result != null) {
      //console.log(result);
      setRecrods(result);
    } else {
      console.log("something is not happening?");
    }
  }
  function getDate(date) {
    //removes alot of the extra time info
    let pos = date.indexOf("T");
    let formattedDate = date.substring(0, pos);
    //console.log(formattedDate);

    return formattedDate;
  }
  function getNameColour(name) {
    //returns the proper colour code for the record
  }
  function getGameColour(game) {
    //returns the proper colour code for the record
  }
  function displayRecrods() {
    if (records != null || records != undefined) {
      return (
        <div>
          {records.map((item, index) => (
            <div key={index} className="flex space-x-2">
              <p className="font-bold">{item.name}</p>
              <p> won</p>
              <p className="font-bold"> {item.game}</p>
              <p> on {getDate(item.date)}</p>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <p>No Records</p>
        </div>
      );
    }
  }
  async function getStandings() {
    const result = await fetch(`/api/GetStandings`, { method: "GET" }).then(
      (res) => res.json()
    );
    if (result != undefined || result != null) {
      //console.log(result);
      setStandings(result);
    } else {
      console.log("something is not happening?");
    }
  }
  function getRank(data, index) {
    // 0 == 1st
    // 1 == 2nd
    // 2 == 3rd
    if (data[index] != undefined) {
      if (data[index].name != undefined) {
        return data[index].name + " " + data[index]["COUNT(id)"] + " win(s)";
      }
    } else {
      return "";
    }
  }
  function handleGameClick(game) {
    console.log(game);
    router.push(`/GameDetails?game=${game}`);
  }
  function displayStandings() {
    if (standings != undefined || standings != null) {
      return (
        <div className="flex flex-wrap">
          {standings.map((item, index) => (
            <Card css={{ mw: "330px" }} key={index}>
              <Card.Header>
                <Text b>{item.name}</Text>
              </Card.Header>
              <Divider />
              <Card.Body css={{ py: "$10" }}>
                <Row>
                  <Text className="text-xl10">1st {getRank(item.data, 0)}</Text>
                </Row>
                <Row>
                  <Text className="text-xl3">2nd {getRank(item.data, 1)}</Text>
                </Row>
                <Row>
                  <Text className="text-xl2">3rd {getRank(item.data, 2)}</Text>
                </Row>
                <Row>
                  <Button onClick={() => handleGameClick(item.name)}>
                    Details
                  </Button>
                </Row>
              </Card.Body>
              <Divider />
            </Card>
          ))}
        </div>
      );
    } else {
      return <p>No Standings</p>;
    }
  }
  return (
    <div>
      <div>
        <h1 className="text-7xl font-bold">Gamepad</h1>
        <p>created by Luke Linigari</p>
      </div>
      <div>
        <p className="text-xl font-semibold">Game Standings</p>
        <Button onPress={() => getStandings()}>Get Standings</Button>
        {displayStandings()}
      </div>
      <div>
        <p className="text-xl font-semibold">player records</p>
        <Button onPress={() => getReccords()}>Get Reccords</Button>
        {displayRecrods()}
      </div>
    </div>
  );
}
