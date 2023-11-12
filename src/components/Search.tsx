import React, { useState } from "react";

const Search = () => {
    const [text, setText] = useState<string>("");

    return (
        <div>
            <input
                type="text"
                pattern="Course Code"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button>Search</button>
        </div>
    );
};
export default Search;
