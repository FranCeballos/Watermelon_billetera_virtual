import React from "react";
import SectionWrapper from "../UI/Wrappers/SectionWrapper";
import ActivityList from "./ActivityList";

const ActivityContainer = (props) => {
  return (
    <SectionWrapper title=" RECENT ACTIVITY" styles={{ padding: "10px" }}>
      <ActivityList />
    </SectionWrapper>
  );
};

export default ActivityContainer;
