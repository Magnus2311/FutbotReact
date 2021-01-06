import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from "react";
import { SellDuration, SellPlayerDTO } from "../../../interfaces/Models";
import { post } from "../../../services/fetch/fetch";
import TextBox from "../../Common/Controls/TextBox";

const emptySell: SellPlayerDTO = {
  username: "",
  name: "",
  bidPrice: 0,
  binPrice: 0,
  duration: 0,
};

interface SellPlayerProps {
  username: string;
  visibility: boolean;
}

const SellPlayer: FunctionComponent<SellPlayerProps> = ({
  username,
  visibility,
}) => {
  const [sellPlayer, setSellPlayer] = useState({
    ...emptySell,
    username,
  });

  function handleSellPlayerChange(e: ChangeEvent<HTMLInputElement>) {
    setSellPlayer({ ...sellPlayer, [e.target.name]: e.target.value });
  }

  const handleSellPlayer = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    post("/api/selling", sellPlayer).catch((error) => console.log(error));
  };

  const handleDurationChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    debugger;
    setSellPlayer({
      ...sellPlayer,
      duration: (event.target.value as unknown) as SellDuration,
    });
  };

  return (
    <div
      style={{
        display: visibility ? "grid" : "none",
      }}
    >
      <h3>Sell player</h3>
      <TextBox
        name="name"
        placeholder="Enter player name"
        label="Player name"
        value={sellPlayer.name}
        handleChange={handleSellPlayerChange}
      />
      <TextBox
        name="bidPrice"
        placeholder="Enter bid price"
        label="Bin price"
        value={sellPlayer.bidPrice.toString()}
        handleChange={handleSellPlayerChange}
      />
      <TextBox
        name="binPrice"
        placeholder="Enter bin price"
        label="Bid price"
        value={sellPlayer.binPrice.toString()}
        handleChange={handleSellPlayerChange}
      />
      <select
        className="browser-default custom-select"
        onChange={handleDurationChanged}
      >
        <option selected value={0}>
          One hour
        </option>
        <option value={1}>Three hours</option>
        <option value={2}>Six hours</option>
        <option value={3}>Twelve hours</option>
        <option value={4}>One day</option>
        <option value={5}>Three days</option>
      </select>
      <button
        className="fut-btn"
        style={{ marginTop: "15px" }}
        onClick={handleSellPlayer}
      >
        Sell player
      </button>
    </div>
  );
};

export default SellPlayer;
