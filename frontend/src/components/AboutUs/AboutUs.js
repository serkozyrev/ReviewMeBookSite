import React from "react";
import MemberItem from "./MemberItem";

import Title from "../style/Title";

import "./AboutUs.css";

const AboutUs = () => {
  const memberArr = [
    {
      name: "Elisa Ng Li",
      content:
        "Hello, This is Elisa! I am one of the developers of this application. I was in charge of some of the frontend and backend code. Also, I was the team leader but everybody help and contribute to the project.\nFun Facts:\nWhen I am not coding, I usually spend my time sleeping and watching movies!",
      image: `${process.env.PUBLIC_URL}/images/bee.png`,
    },
    {
      name: "Hyun Ji Lee",
      content:
        "Hi! I'm Jane (Hyun Ji) Lee. I participated in this project as a lead developer. We helped each other a lot to complete this project. I had lots of fun while we were spending time as a team! I participated in setups, implementing frontend and backend. In my free time, I love watching videos and reading books!",
      image: `${process.env.PUBLIC_URL}/images/koala.png`,
    },
    {
      name: "Krupa Kirtikumar Shah",
      content:
        "Hello, I am Krupa. I contributed to the development of this application. I hope you find it useful. If you need to reach out to any of us just contact us.\nFun Facts:\nI can not function without coffee. In my free time, I just binge-watch Netflix shows and sleep.",
      image: `${process.env.PUBLIC_URL}/images/rabbit.png`,
    },
    {
      name: "Sergey Kozyrev",
      content:
        "Hello, my name is Sergey. I am a developer who likes to do frontend most of the time than work with the backend, but always accepts challenges. Besides coding, I like to spend time watching some movies, shows and eat sweets.",
      image: `${process.env.PUBLIC_URL}/images/toucan.png`,
    },
  ];
  return (
    <div className="container mt-5">
      <div className="text-center">
        <Title name="About Us" />
        <h4>Meet our team of developers! </h4>
      </div>

      <div className="mt-4">
        {memberArr.map((member, index) => (
          <MemberItem
            key={index}
            name={member.name}
            content={member.content}
            image={member.image}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
