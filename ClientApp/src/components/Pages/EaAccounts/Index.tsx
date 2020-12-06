import React, { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { BidPlayerDTO } from "../../../interfaces/Models";
import TextBox from "../../Common/Controls/TextBox";

interface MatchParams {
    username: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

const Index: FunctionComponent<Props> = (props) => {
    const { username } = props.match.params;
    const [bidPlayer, setBidPlayer] = useState({} as BidPlayerDTO);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBidPlayer({ ...bidPlayer, [e.target.name]: e.target.value });
    }

    const handleBidPlayer = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();


    }

    return <div>
        <h2>{username}</h2>
        <h3>Bid player</h3>
        <TextBox name="name" placeholder="Enter player name" label="Player name" value={bidPlayer.name} handleChange={handleChange} />
        <TextBox name="maxPrice" placeholder="Enter max price" label="Max price" value={bidPlayer.maxPrice.toString()} handleChange={handleChange} />
        <button className="btn btn-primary btn-xl" onClick={handleBidPlayer}>Bid player</button>
    </div>
}

export default Index;