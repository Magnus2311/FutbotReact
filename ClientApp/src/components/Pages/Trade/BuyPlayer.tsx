import { ObjectId } from "mongodb";
import React, {
  ChangeEvent,
  createRef,
  FormEvent,
  FunctionComponent,
  MutableRefObject,
  RefObject,
  useState,
} from "react";
import { connect } from "react-redux";
import { BidPlayerDTO, Player } from "../../../interfaces/Models";
import { post } from "../../../services/fetch/fetch";
import { ApplicationState } from "../../../store";
import DropdownWithImage from "../../Common/Controls/DropdownWithImage";
import Switch from "../../Common/Controls/Switch";
import TextBox from "../../Common/Controls/TextBox";

interface BuyPlayerProps {
  visibility?: boolean;
  players: Player[];
  username: string;
}

const emptyBid: BidPlayerDTO = {
  player: { id: "", name: "", rating: 0 },
  maxPrice: 0,
  isBin: false,
  maxActiveBids: 0,
  username: "",
};

const BuyPlayer: FunctionComponent<BuyPlayerProps> = ({
  visibility,
  players,
  username,
}) => {
  const [bidPlayer, setBidPlayer] = useState({
    ...emptyBid,
    username: username,
  });

  let maxPriceRef: RefObject<HTMLInputElement>;
  maxPriceRef = createRef();

  const handleBidPlayerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBidPlayer({ ...bidPlayer, [e.target.name]: e.target.value });
  };

  const handleBidPlayer = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    post("/api/bidding", bidPlayer).catch((error) => console.log(error));
  };

  const handleChange = () => {
    setBidPlayer({ ...bidPlayer, isBin: !bidPlayer.isBin });
  };

  const handleItemChosen = (player: Player) => {
    setBidPlayer({ ...bidPlayer, player });
  };

  return (
    <div
      style={{
        display: visibility ? "grid" : "none",
      }}
    >
      <h4>Bid player</h4>
      <DropdownWithImage
        placeholder="Enter player name"
        handleItemChosen={handleItemChosen}
        players={players}
        maxPriceRef={maxPriceRef as MutableRefObject<HTMLInputElement>}
        src="/images/players/fifa21/"
      />
      <TextBox
        name="maxPrice"
        placeholder="Enter max price"
        label="Max price"
        ref={maxPriceRef}
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

const mapStateToProps = (state: ApplicationState) => state.players;

export default connect(mapStateToProps)(BuyPlayer);
