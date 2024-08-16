import React from "react";

interface Props {
  setCategorical: (categorical: string) => void;
}

const CategoricalSelector: React.FC<Props> = ({ setCategorical }) => {
  return (
    <div>
      <h2>Select Category</h2>
      <button onClick={() => setCategorical("9")}>General Knowledge</button>
      <button onClick={() => setCategorical("10")}>Entertainment: Books</button>
      <button onClick={() => setCategorical("18")}>Science: Computer</button>
      <button onClick={() => setCategorical("17")}>Science & Nature</button>
      <button onClick={() => setCategorical("23")}>History</button>
      <button onClick={() => setCategorical("24")}>Politics</button>
    </div>
  );
};

export default CategoricalSelector;
