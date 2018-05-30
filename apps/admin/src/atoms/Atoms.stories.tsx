import React from "react";
import { BrowserRouter } from "react-router-dom";

import { storiesOf } from "@storybook/react";
import { text, boolean, select } from "@storybook/addon-knobs/react";
import backgrounds from "@storybook/addon-backgrounds";
import { withKnobs } from "@storybook/addon-knobs/react";

import Badge from "./Badge";
import Button from "./Button";
import ChatMedia from "./ChatMedia";
import ChatMessage from "./ChatMessage";
import Dropdown from "./Dropdown";
import Filter from "./Filter";
import Input from "./Input";
import Panel from "./Panel";

import { blue, brown, green, lightBlue, pink, white } from "styles/colors";

const Stories = storiesOf("Atoms", module)
  .add("Badge", () => (
    <Badge text={text("Text", "hello")} rounded={boolean("rounded", false)} />
  ))
  .add("Button", () => (
    <Button white={boolean("white", false)}>
      {text("Button Text", "Proceed to Ride")}
    </Button>
  ))
  .add("ChatMedia", () => (
    <ChatMedia
      title={text("Title", "Tres & Tanya's Story")}
      url={text(
        "URL",
        "https://soundcloud.com/bedstuyrestocorp/tres-tanyas-story"
      )}
      image={text(
        "Image",
        "https://i1.sndcdn.com/artworks-000311861322-omp1pm-t500x500.jpg"
      )}
    />
  ))
  .add("ChatMessage", () => (
    <ChatMessage
      type={select("Type", ["sent", "received"], "sent")}
      text={text(
        "Text",
        "Hi hi! How's it going with finishing your task? Text DONE, HELP, or STILL WORKING"
      )}
      from={text("From", "Roo")}
      color={pink}
    />
  ))
  .add("Dropdown", () => (
    <Dropdown title="Dropdown">
      <p>Dropdown content. Click title to hide.</p>
    </Dropdown>
  ))
  .add("Input", () => <Input rounded={boolean("Rounded", false)} />)
  .add("Filter", () => (
    <Filter
      categories={[
        { name: "Debt", active: boolean("Debt: active", false), color: pink },
        {
          name: "Budget",
          active: boolean("Budget: active", false),
          color: brown
        },
        {
          name: "Credit",
          active: boolean("Credit: active", false),
          color: blue
        },
        {
          name: "Saving",
          active: boolean("Saving: active", false),
          color: green
        }
      ]}
    />
  ))
  .add("Panel", () => (
    <Panel shadow={boolean("with shadow", false)}>This is a panel</Panel>
  ));

export default Stories;
