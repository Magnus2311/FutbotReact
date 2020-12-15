import React, { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { BidPlayerDTO, SellDuration, SellPlayerDTO } from "../../../interfaces/Models";
import TextBox from "../../Common/Controls/TextBox";
import { get, post } from "../../../services/fetch/fetch";

interface MatchParams {
    username: string;
}

const emptyBid: BidPlayerDTO = {
    maxPrice: 0,
    name: ""
}

const emptySell: SellPlayerDTO = {
    name: "",
    bidPrice: 0,
    binPrice: 0,
    duration: 0
}

const emptyResellPlayer: SellPlayerDTO = {
    name: "",
    bidPrice: 0,
    binPrice: 0,
    duration: 0
}

interface Props extends RouteComponentProps<MatchParams> {
}

const Index: FunctionComponent<Props> = (props) => {
    const { username } = props.match.params;
    const [bidPlayer, setBidPlayer] = useState(emptyBid);
    const [sellPlayer, setSellPlayer] = useState(emptySell);
    const [resellPlayer, setResellPlayer] = useState(emptyResellPlayer);

    const handleBidPlayerChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBidPlayer({ ...bidPlayer, [e.target.name]: e.target.value });
    }

    const handleSellPlayerChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSellPlayer({ ...sellPlayer, [e.target.name]: e.target.value });
    }

    const handleResellPlayerChange = (e: ChangeEvent<HTMLInputElement>) => {
        setResellPlayer({ ...resellPlayer, [e.target.name]: e.target.value });
    }

    const handleBidPlayer = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        post("/api/bidding", bidPlayer).catch((error) => console.log(error));
    }    
    
    const handleSellPlayer = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        post("/api/selling", sellPlayer).catch((error) => console.log(error));
    }
    
    const handleResellPlayer = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        var text = JSON.stringify(resellPlayer);

        debugger;
        post("/api/relist/relistplayer", resellPlayer).catch((error) => console.log(error));
    }
    
    const handleRelistAll = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        get("/api/relist").catch((error) => console.log(error));
    }

    const handleDurationChanged = (event: ChangeEvent<HTMLSelectElement>) => {
        debugger;
        setSellPlayer({...sellPlayer, duration: event.target.value as unknown as SellDuration});
    };

    const handleResellDurationChanged = (event: ChangeEvent<HTMLSelectElement>) => {
        setResellPlayer({...resellPlayer, duration: event.target.value as unknown as SellDuration});
        var text = JSON.stringify(resellPlayer);
        debugger;
    };

    return <div>
        <h2>{username}</h2>
        <hr />
        <h3>Bid player</h3>
        <TextBox name="name" placeholder="Enter player name" label="Player name" value={bidPlayer.name} handleChange={handleBidPlayerChange} />
        <TextBox name="maxPrice" placeholder="Enter max price" label="Max price" value={bidPlayer.maxPrice.toString()} handleChange={handleBidPlayerChange} />
        <button className="btn btn-primary btn-xl" onClick={handleBidPlayer}>Bid player</button>
        <hr/>
        <h3>Sell player</h3>
        <TextBox name="name" placeholder="Enter player name" label="Player name" value={sellPlayer.name} handleChange={handleSellPlayerChange} />
        <TextBox name="bidPrice" placeholder="Enter bid price" label="Bin price" value={sellPlayer.bidPrice.toString()} handleChange={handleSellPlayerChange} />
        <TextBox name="binPrice" placeholder="Enter bin price" label="Bid price" value={sellPlayer.binPrice.toString()} handleChange={handleSellPlayerChange} />
        <select className="browser-default custom-select" onChange={handleDurationChanged}>
            <option selected value={0}>One hour</option>
            <option value={1}>Three hours</option>
            <option value={2}>Six hours</option>
            <option value={3}>Twelve hours</option>
            <option value={4}>One day</option>
            <option value={5}>Three days</option>
        </select>
        <button className="btn btn-primary btn-xl" style={{marginTop: "15px"}} onClick={handleSellPlayer}>Sell player</button>
        <hr />
        <h3>Quick buy player</h3>
        <hr />
        <button className="btn btn-primary btn-xl" style={{marginTop: "15px"}} onClick={handleRelistAll}>Relist all</button>
        <hr />
        <TextBox name="name" placeholder="Enter player name" label="Player name" value={resellPlayer.name} handleChange={handleResellPlayerChange} />
        <TextBox name="bidPrice" placeholder="Enter bid price" label="Bin price" value={resellPlayer.bidPrice.toString()} handleChange={handleResellPlayerChange} />
        <TextBox name="binPrice" placeholder="Enter bin price" label="Bid price" value={resellPlayer.binPrice.toString()} handleChange={handleResellPlayerChange} />
        <select className="browser-default custom-select" onChange={handleResellDurationChanged}>
            <option selected value={0}>One hour</option>
            <option value={1}>Three hours</option>
            <option value={2}>Six hours</option>
            <option value={3}>Twelve hours</option>
            <option value={4}>One day</option>
            <option value={5}>Three days</option>
        </select>
        <button className="btn btn-primary btn-xl" style={{marginTop: "15px"}} onClick={handleResellPlayer}>Relist player</button>
        <hr/>
    </div>
}

export default Index;