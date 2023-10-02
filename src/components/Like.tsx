import { ComponentPropsWithoutRef, FC, useState } from "react";

type LikeProps = ComponentPropsWithoutRef<"div">;
export const Like: FC<LikeProps> = ({ style = {}, ...props }) => {
  const [active, setActive] = useState(Math.random() > 0.8);

  return (
    <div style={{ color: "white", ...style }} {...props}>
      <button
        style={{ cursor: "pointer", border: "none", background: "none", color: "red" }}
        onClick={() => setActive((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={active ? "red" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          style={{ width: 20, height: 20 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>
    </div>
  );
};
