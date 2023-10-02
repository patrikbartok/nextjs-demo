import { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { gray } from "~/designSystem";
import { Like } from "./Like";

type CardProps = {
  title?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">;
export const Card: FC<CardProps> = ({ title, children, style = {}, ...props }) => {
  return (
    <div
      style={{
        width: 600,
        maxWidth: "100%",
        margin: "0 auto",
        padding: 20,
        background: gray[100],
        borderRadius: 10,
        border: `1px solid ${gray[200]}`,
        ...style,
      }}
      {...props}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: 18, lineHeight: 1, color: gray[950], fontWeight: 500 }}>{title}</p>
        <Like />
      </div>
      <div style={{ marginTop: "1vw", fontSize: 15, color: gray[800] }}>{children}</div>
    </div>
  );
};
