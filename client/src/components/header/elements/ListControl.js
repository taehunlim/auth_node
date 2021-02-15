import React, {useState} from 'react';
import AccountModal from "../../accountModal/AccountModal";

const ListControl = () => {

    const [modal, setModal] = useState(false)

    return (
        <div className="list-control">
            <ul className="d-block text-center text-black">
                <li>
                    <button
                        onClick={() => setModal(true)}
                    >
                        <i className="fas fa-edit"></i>
                    </button>

                </li>
                <li>
                    <button>
                        <i className="fas fa-address-book"></i>
                    </button>

                </li>
                <li>
                    <button>
                        <i className="fas fa-cog"></i>
                    </button>

                </li>
            </ul>


            <AccountModal
                show={modal}
                onHide={() => setModal(false)}
            />
        </div>
    );
};

export default ListControl;
