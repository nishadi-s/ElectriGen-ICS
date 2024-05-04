import React from "react";

const Welcome = () => {
  return (
    <div>
      <form>
        <input type="file" accept="image/*"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Welcome;
