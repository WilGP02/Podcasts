import Error from "../_error";
import Link from "next/link";
import React from "react";
import PodcastListWithClick from "../../components/PodcastListWithClick";
import ChannelGrid from "../../components/ChannelGrid";
import PodcastPlayer from "../../components/PodcastPlayer";

export default class extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            openPodcast: null
        }
    }

    static async getInitialProps({ query, res }) {
        let idChannel = query.id;
        try {
            let [reqChannel, reqAudio, reqChild] = await Promise.all([
                await fetch(`https://api.audioboom.com/channels/${idChannel}`),
                await fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
                await fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
            ])
            if(reqChannel.status >= 400) {
                res.statusCode = reqChannel.status;
                return { channel: null, audioClips: null, childChannels: null,
                    statusCode: reqChannel.status }
            }

            let dataChannel = await reqChannel.json()
            let channel = dataChannel.body.channel
    
            let dataAudio = await reqAudio.json()
            let audioClips = dataAudio.body.audio_clips
    
            let dataChild = await reqChild.json()
            let childChannels = dataChild.body.channels
    
            return { channel, audioClips, childChannels, statusCode: 200 }
        } catch (e) {
            return { channel: null, audioClips: null, childChannels: null,
            statusCode: 503 }
        }
        
    }

    openPodcast = (event, podcast) => {
        event.preventDefault();
        this.setState({
            openPodcast: podcast
        })
    }

    closePodcast = (event) => {
        event.preventDefault();
        this.setState({
            openPodcast: null
        })
    }

    render(){
        const { channel, audioClips, childChannels, statusCode } = this.props;
        const { openPodcast } = this.state;

        if(statusCode !== 200 ){
            return <Error statusCode={statusCode}/>
        }
        return (
            <div>
                <header>Podcasts</header>
                <div className="banner" 
                    style={{backgroundImage: `url(${channel.urls.banner_image.original})`}}>
                </div>
                { openPodcast && 
                    <div className="modal">
                        <PodcastPlayer clip={openPodcast} onClose={this.closePodcast}></PodcastPlayer>
                    </div>}

                <div className="container">
                    <ChannelGrid channels = {childChannels}/>
                    <PodcastListWithClick podcasts = {audioClips} onClickPodcast= {this.openPodcast} />
                </div>
                
                <style jsx>{`
                    header {
                        color: #fff;
                        background: #8756ca;
                        padding: 15px;
                        text-align: center;
                    }
                    .banner {
                        width: 100%;
                        padding-bottom: 25%;
                        background-position: 50% 50%;
                        background-size: cover;
                        background-color: #aaa;
                    }
                    .banner h1 {
                        color: white;
                        text-align: center;
                    }
                    .container {
                        display: grid;
                        grid-template-columns: 70% 30%;
                        grid-gap: 5px;
                        padding: 10px;
                    }
                    .podCastEach {
                        display: grid;
                        grid-gap: 15px;
                        padding: 15px;
                        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))
                    }
                    a {
                        display: block;
                        border-radius: 3px;
                        padding: 8px;
                        color: #333;
                        box-shadow: 6px 6px 10px rgba(0,0,0,0.34);
                        margin-bottom: 0.5em;
                        text-decoration: none;
                    }
                    .modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        z-index: 99999;
                        background: black;
                    }
                `}</style>

                <style jsx global>{`
                    body {
                        margin: 0;
                        font-family: system-ui;
                        background: white;
                    }
                `}</style>
            </div>
            
        )
    }
    
}