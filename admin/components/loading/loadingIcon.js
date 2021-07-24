import { Player } from "@lottiefiles/react-lottie-player";

export default function Loading() {
  return (
    <Player
      background="black"
      speed="1"
      src="https://assets8.lottiefiles.com/datafiles/w8kbBwzPRk7sTCe/data.json"
      style={{ width: "60px", height: "60px" }}
      loop
      autoplay
    ></Player>
  );
}

{
  /* <Player
  autoplay
  loop
  src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
  style={{ height: "300px", width: "300px" }}
>
  <Controls visible={true} buttons={["play", "repeat", "frame", "debug"]} />
</Player>; */
}
