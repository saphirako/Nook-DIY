import { FC } from "react";

const positionStyling = {
    right: " -top-half -right-full mx-4",
    below: " -bottom-full my-4 translate-0 group-hover:translate-y-96",
    above: " -top-full my-4 translate-0 group-hover:-translate-y-96",
};
type Position = "right" | "above" | "below";
interface ITooltip {
    position: Position;
    label: string;
    keyLabel?: string;
}
export const Tooltip: FC<ITooltip> = (props: ITooltip) => {
    const positionStyle = positionStyling[props.position];
    return (
        <p
            className={
                "bg-neutral-700 max-w-xl z-10 rounded-xl py-2 px-4 text-white text-lg hidden transition-transform group-hover:block duration-500 relative " +
                positionStyle
            }
        >
            {props.label}
        </p>
    );
};
