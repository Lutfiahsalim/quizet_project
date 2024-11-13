import React from "react";
import "../style/category.scss";

import { Icon } from "@iconify/react";
import type { SVGProps } from "react";

export function CilArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="black"
        d="m359.873 121.377l-22.627 22.627l95.997 95.997H16v32.001h417.24l-95.994 95.994l22.627 22.627L494.498 256z"
      ></path>
    </svg>
  );
}

interface Props {
  setCategorical: (categorical: string) => void;
}

const CategoricalSelector: React.FC<Props> = ({ setCategorical }) => {
  return (
    <div className="category-content">
      <h2>Choose the category</h2>
      <div className="button-area">
        <div className="wrap-button">
          <button onClick={() => setCategorical("10")}>
            <h3>Entertainment: Books</h3>
            <div className="play-wrap">
              <p>Start Now </p>
              <Icon icon="cil:arrow-right" width="25" height="25" style={{}} />
            </div>
          </button>
        </div>
        <div className="wrap-button">
          <button onClick={() => setCategorical("9")}>
            <h3>General Knowledge</h3>
            <div className="play-wrap">
              <p>Start Now </p>
              <Icon icon="cil:arrow-right" width="25" height="25" style={{}} />
            </div>
          </button>
        </div>
        <div className="wrap-button">
          <button onClick={() => setCategorical("18")}>
            <h3>Science: Computer</h3>
            <div className="play-wrap">
              <p>Start Now </p>
              <Icon icon="cil:arrow-right" width="25" height="25" style={{}} />
            </div>
          </button>
        </div>
        <div className="wrap-button">
          <button onClick={() => setCategorical("17")}>
            <h3>Science & Nature</h3>
            <div className="play-wrap">
              <p>Start Now </p>
              <Icon icon="cil:arrow-right" width="25" height="25" style={{}} />
            </div>
          </button>
        </div>
        <div className="wrap-button">
          <button onClick={() => setCategorical("23")}>
            <h3>History</h3>
            <div className="play-wrap">
              <p>Start Now </p>
              <Icon icon="cil:arrow-right" width="25" height="25" style={{}} />
            </div>
          </button>
        </div>
        <div className="wrap-button">
          <button onClick={() => setCategorical("24")}>
            <h3>Politics</h3>
            <div className="play-wrap">
              <p>Start Now </p>
              <Icon icon="cil:arrow-right" width="25" height="25" style={{}} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoricalSelector;
