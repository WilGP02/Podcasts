import {Link} from "../routes";
import React from "react";
import slug from '../helpers/slug';

export default class ChannelGrid extends React.Component {
    render() {
        const { channels } = this.props;
        return <div>
                <div className="channels">
                    {
                        channels.map(channel => (
                            <Link route="channel" params={{ 
                                slug: slug(channel.title),
                                id: channel.id
                             }} prefetch>
                                <a className="channel">
                                    <img src={channel.urls.logo_image.original}></img>
                                    <h2>{channel.title}</h2>
                                </a>
                            </Link>
                        ))
                    }
                </div>
                <style jsx>{`
                    .channels {
                        display: grid;
                        grid-gap: 15px;
                        padding: 15px;
                        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))
                    }
                    a.channel {
                        display: block;
                        border-radius: 3px;
                        color: #333;
                        box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
                        margin-bottom: 0.5em;
                        text-decoration: none;
                        height: 70%;
                    }
                    h2 {
                        padding: 5px;
                        font-size: 0.9em;
                        font-weight: 600;
                        margin:0;
                        color: white;
                        text-align: center;
                        background: black;
                    }
                    .channel img {
                        width: 100%;
                    }
                `}</style>
        </div>
    }
}