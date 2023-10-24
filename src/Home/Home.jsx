import React from "react";

export default function Home() {
  const name = localStorage.getItem("username");
  return <div>Hello {name}</div>;
}
