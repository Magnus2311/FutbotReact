import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from "react";
import { BidPlayerDTO } from "../../../interfaces/Models";
import { post } from "../../../services/fetch/fetch";
import Switch from "../../Common/Controls/Switch";
import TextBox from "../../Common/Controls/TextBox";

interface BuyPlayerProps {
  username: string;
  visibility: boolean;
}

const emptyBid: BidPlayerDTO = {
  username: "",
  maxPrice: 0,
  name: "",
  isBin: false,
  maxActiveBids: 0,
  rating: 0,
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

    const temp = JSON.stringify(bidPlayer);
    debugger;

    post("/api/bidding", bidPlayer).catch((error) => console.log(error));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBidPlayer({ ...bidPlayer, isBin: !bidPlayer.isBin });
  };

  return (
    <div
      style={{
        display: visibility ? "grid" : "none",
      }}
    >
      <h4>Bid player</h4>
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
      <TextBox
        name="maxActiveBids"
        placeholder="Enter max active bids"
        label="Max active bids"
        value={bidPlayer.maxActiveBids.toString()}
        handleChange={handleBidPlayerChange}
      />
      <TextBox
        name="rating"
        placeholder="Rating"
        label="Rating"
        value={bidPlayer.rating.toString()}
        handleChange={handleBidPlayerChange}
      />
      <Switch
        label="Use buy-in now prices"
        isChecked={bidPlayer.isBin}
        handleChange={handleChange}
      />
      <button className="fut-btn" onClick={handleBidPlayer}>
        Bid player
      </button>
    </div>
  );
};

export default BuyPlayer;
