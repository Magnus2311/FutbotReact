import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from "react";
import { BidPlayerDTO } from "../../../interfaces/Models";
import { post } from "../../../services/fetch/fetch";
import TextBox from "../../Common/Controls/TextBox";

interface BuyPlayerProps {
  username: string;
  visibility: boolean;
}

const emptyBid: BidPlayerDTO = {
  username: "",
  maxPrice: 0,
  name: "",
};

const BuyPlayer: FunctionComponent<BuyPlayerProps> = ({
  username,
  visibility,
}) => {
  const [bidPlayer, setBidPlayer] = useState({
    ...emptyBid,
    username,
  });

  const handleBidPlayerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBidPlayer({ ...bidPlayer, [e.target.name]: e.target.value });
  };

  const handleBidPlayer = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    post("/api/bidding", bidPlayer).catch((error) => console.log(error));
  };

  return (
    <div
      style={{
        display: visibility ? "grid" : "none",
      }}
    >
      <h3>Bid player</h3>
      <TextBox
        name="name"
        placeholder="Enter player name"
        label="Player name"
        value={bidPlayer.name}
        handleChange={handleBidPlayerChange}
      />
      <TextBox
        name="maxPrice"
        placeholder="Enter max price"
        label="Max price"
        value={bidPlayer.maxPrice.toString()}
        handleChange={handleBidPlayerChange}
      />
      <button className="fut-btn" onClick={handleBidPlayer}>
        Bid player
      </button>
    </div>
  );
};

export default BuyPlayer;
