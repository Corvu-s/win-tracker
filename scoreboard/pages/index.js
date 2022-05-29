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
  const [selectedGame, setSelectedGame] = useState(games[0]);
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [records, setRecrods] = useState(state.records);
  const [standings, setStandings] = useState([]);
  function GameDropdown() {
    return (
      <div className=" top-16 w-72">
        <Listbox value={selectedGame} onChange={setSelectedGame}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selectedGame}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {games.map((game, gameIdx) => (
                  <Listbox.Option
                    key={gameIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={game}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {game}
                        </span>
                        {selected ? (
                          <span className=" inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    );
  }

  function PeopleDropdown() {
    return (
      <div className=" top-16 w-72">
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selectedPerson}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {people.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person}
                        </span>
                        {selected ? (
                          <span className=" inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    );
  }

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
        <p className="text-xl font-semibold">Choose a game and a winner</p>
        <div className="flex">
          {GameDropdown()}
          {PeopleDropdown()}
          <Button onPress={() => submitWin()}>Submit</Button>
        </div>
      </div>
      <div>
        <p className="text-xl font-semibold">player records</p>
        <Button onPress={() => getReccords()}>Get Reccords</Button>
        {displayRecrods()}
      </div>
      <div>
        <p className="text-xl font-semibold">Game Standings</p>
        <Button onPress={() => getStandings()}>Get Standings</Button>
        {displayStandings()}
      </div>
    </div>
  );
}
