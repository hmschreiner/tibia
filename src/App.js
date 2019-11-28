import React, { useState, useEffect } from "react";
import Character from "./components/character";
import Backpack from "./components/backpack/backpack";
import Monster from "./components/monster";
import Skills from "./components/skills/skills";
import Battle from "./components/battle";
import Equipment from "./components/equipment";

import useInterval from "./hooks/setInterval";
import map from "./images/map.png";
import "./App.css";

function Sidebar(props) {
  return <div className="sidebar flex column">{props.children}</div>;
}

function App() {
  const [gold, setGold] = useState(1);
  const [idleGold, setIdleGold] = useState(0);
  const [skills, setSkills] = useState({ xp: 0, level: 1 });
  const [hp, setHP] = useState(100);
  const [characterDamage, setCharacterDamage] = useState(20);

  useInterval(() => {
    setGold(gold + idleGold);
  }, 5000);

  const onKillMonster = () => {
    const { xp, level } = skills;
    const newXp = xp + 10;

    setSkills({ xp: newXp, level: newLevel(newXp, level) });
    setGold(gold + 1);
  };

  const newLevel = (newXp, level) => {
    const lastXPdigits = newXp.toString().slice(newXp.toString().length - 2);

    // Everytime the xp ends with 00 means that user leveled up
    if (lastXPdigits === "00") {
      setCharacterDamage(characterDamage + level);
      return level + 1;
    }

    return level;
  };

  const attack = () => {
    const newHP = hp - characterDamage;

    if (newHP <= 0) {
      onKillMonster();
      setHP(100);
      return;
    }

    setHP(newHP);
  };

  return (
    <main className="App flex ">
      <div className="floor flex column">
        <Monster hp={hp} attack={attack} />
        <Character />
      </div>

      <Sidebar>
        <img height="190" alt="" src={map} />
        <Equipment />
        <Battle hp={hp} attack={attack} />
        <Skills xp={skills.xp} level={skills.level} />
        <Backpack gold={gold} />
      </Sidebar>
    </main>
  );
}

export default App;
