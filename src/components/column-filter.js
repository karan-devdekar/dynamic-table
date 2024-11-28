import React from "react";

const columnFilter = ({columnDefs}) => {
    const {filterVal, setFilter} = columnDefs

    return(
        <span>
            Search:{' '}
            <input
                value={filterVal || ''}
                onChange={(e) => setFilter(e.target.value)}
            />
        </span>
    )
}

export default columnFilter;