import React from "react";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button"; //Add this line Here

export default class TopArrow extends React.Component {
    render() {
        return (
            <div>
                <ScrollUpButton />
            </div>
        );
    }
}
