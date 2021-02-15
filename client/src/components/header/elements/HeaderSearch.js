import React from "react";


const HeaderSearch = ({ activeStatus, getActiveStatus }) => {
    return (
        <div className={`search-overlay ${activeStatus ? "active" : ""}`}>
            {/*=======  close icon  =======*/}
            <button
                className="search-overlay__close-icon"
                onClick={() => {
                    getActiveStatus(false);
                }}
            >
                <i className="fas fa-times"></i>
            </button>
            {/*=======  End of close icon  =======*/}
            {/*=======  search overlay content  =======*/}
            <div className="search-overlay__content">
                <form className="space-mb--20">
                    <input type="search"/>
                </form>
            </div>
            {/*=======  End of search overlay content  =======*/}
        </div>
    );
};

export default HeaderSearch;
