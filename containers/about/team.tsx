
import { TeamCard } from "@/components/UI/cards/teamCard";
import Heading from "@/components/UI/typography/heading";
import { TeamData } from "@/data/teamData";
import React from "react";

const Team = () => {
  return (
    <div className="mt-24">
      <Heading
        title=""
        highLightText="فريقنا في زاد"
        additionalStyles="mx-auto mb-12 w-fit"
      />

      <div className="cards-grid-3 gap-4 mx-auto mt-4">
        {TeamData.map(
          ({ image, name, profession, color, background }, index) => {
            return (
              <TeamCard
                key={index}
                image={image}
                name={name}
                profession={profession}
                color={color}
                background={background}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default Team;
