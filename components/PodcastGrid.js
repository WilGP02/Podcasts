import Link from "next/link";
import React from "react";

export default class Podcasts extends React.Component {
    render() {
        const {audioClips, onClickPodcast} = this.props;
        return (
            <div>
                <h2>Ultimos Podcast</h2>
                <div className="podCastEach">
                    {audioClips.map(audio => (
                        <Link href={`/podcast?id=${audio.id}`}>
                            <a onClick={ (event) => onClickPodcast(event, podcast) }>{ audio.title }</a>
                        </Link>
                    ))}
                </div>
                <style jsx>{`
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
                `}</style>
            </div>
        )
    }
}