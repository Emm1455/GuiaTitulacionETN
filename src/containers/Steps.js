import React from "react";
import StepInfo from "../components/StepInfo";

function Steps({ data }) {
  const list = data?.map((value) => {
    return (
      <StepInfo
        key={value.number}
        title={`${value.number}. ${value.text}`}
        type={value.type}
        steps={value.content}
        areThereSteps={value.content.length > 0}
      />
    );
  });

  return <>{list}</>;
}

export default Steps;
