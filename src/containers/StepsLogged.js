import React from "react";
import StepInfoLogged from "../components/StepInfoLogged";

function StepsLogged({ data, checked, setChecked }) {
  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const list = data?.map((value) => {
    return (
      <StepInfoLogged
        key={value.number}
        title={`${value.number}. ${value.text}`}
        type={value.type}
        steps={value.content}
        areThereSteps={value.content.length > 0}
        handleToggle={() => handleToggle(value.number)}
        isChecked={checked.indexOf(value?.number) !== -1}
      />
    );
  });

  return <>{list}</>;
}

export default StepsLogged;
