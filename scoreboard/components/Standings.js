import React from "react";
import { Fragment, useState, useContext, useEffect } from "react";
import { useAppContext } from "../state/AppContext";
import { useRouter } from "next/router";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Card, Grid, Text, Divider, Button, Row } from "@nextui-org/react";
export default function Rankings() {
  const [standings, setStandings] = useState([]);

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
  return <div>Rankings</div>;
}
