import BigHeadline from "./BigHeadline";
import SmallHeadline from "./SmallHeadline";

export default function Headline(props) {
    console.log(props)
    return (
        <div className="flex">
            <div className="w-full lg:w-8/12">
                <BigHeadline headline={props.headline} />
            </div>
            <div className="w-full lg:w-4/12">
                <SmallHeadline popular={props.popular} />
            </div>
        </div>
    );
}
