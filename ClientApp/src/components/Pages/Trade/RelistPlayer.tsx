import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from "react";
import { SellDuration, SellPlayerDTO } from "../../../interfaces/Models";
import { post } from "../../../services/fetch/fetch";
import TextBox from "../../Common/Controls/TextBox";

const emptyResellPlayer: SellPlayerDTO = {
  username: "",
  name: "",
  bidPrice: 0,
  binPrice: 0,
  duration: 0,
};

interface RelistPlayerProps {
  username: string;
  visibility: boolean;
}

const RelistPlayer: FunctionComponent<RelistPlayerProps> = ({
  username,
  visibility,
}) => {
  const [resellPlayer, setResellPlayer] = useState({
    ...emptyResellPlayer,
    username,
  });
  const handleResellPlayerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResellPlayer({ ...resellPlayer, [e.target.name]: e.target.value });
  };
  const handleResellPlayer = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    post("/api/relist/relistplayer", resellPlayer).catch((error) =>
      console.log(error)
    );
  };
  const handleResellDurationChanged = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setResellPlayer({
      ...resellPlayer,
      duration: (event.target.value as unknown) as SellDuration,
    });
  };

  return (
    <div
      style={{
        display: visibility ? "grid" : "none",
      }}
    >
      <h3>Relist player</h3>
      <TextBox
        name="name"
        placeholder="Enter player name"
        label="Player name"
        value={resellPlayer.name}
        handleChange={handleResellPlayerChange}
      />
      <TextBox
        name="bidPrice"
        placeholder="Enter bid price"
        label="Bin price"
        value={resellPlayer.bidPrice.toString()}
        handleChange={handleResellPlayerChange}
      />
      <TextBox
        name="binPrice"
        placeholder="Enter bin price"
        label="Bid price"
        value={resellPlayer.binPrice.toString()}
        handleChange={handleResellPlayerChange}
      />
      <select
        className="browser-default custom-select"
        onChange={handleResellDurationChanged}
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
        onClick={handleResellPlayer}
      >
        Relist player
      </button>
    </div>
  );
};

export default RelistPlayer;
