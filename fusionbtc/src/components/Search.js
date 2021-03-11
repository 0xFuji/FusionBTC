import React, { useState, useRef } from 'react';
import Async from 'react-async';
import Loader from '../images/loader.svg';

// Gets a human readable balance from the format that is returned by the blockchain API.
function getHumanBalance(bal) {
    while (bal.length < 9) {
        bal = "0" + bal
    }
    return (bal.slice(0, -8) + "." + bal.slice(-8))
}

export default function Search() {

    // States and Refs
    const [wallet, setWallet] = useState('37R9AX1BLtuH1RBVpjNBYobajG3vbWA4AV');
    const walletRef = useRef()

    // Proxy should be used in production to avoid CORS limitations.
    const walletData = async () => await fetch(`https://blockchain.info/rawaddr/${wallet}`,{
        headers: {
          'Origin': window.location.protocol + '//' + window.location.host
        }})
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())
    
    // Used to handle form submition and change states.
    function handleSubmit(e) {
        e.preventDefault();

        setWallet(walletRef.current.value)
    }

    // Needs to be cleaned up a bit more + better modularity.
    return (
        <div className="card" style={{ height: "450px" }}>
            <form onSubmit={handleSubmit} className="form-row align-items-center p-3">
                <div className="col-md-10 mb-2">
                    <input ref={walletRef} className="form-control" type="text" name="wallet" placeholder="Enter Wallet Address" />
                </div>
                <div className="col-md-2 mb-2">
                    <input className="btn btn-soft-success w-100" type="submit" value="Scan" />
                </div>
            </form>
            <Async promiseFn={walletData}>
                <Async.Loading>
                    <div className=" h-100 d-flex justify-content-center align-items-center">
                        <img style={{height: "60px"}} src={Loader} />
                    </div>
                </Async.Loading>
                <Async.Fulfilled>
                {data => {
                    return (
                    <div className="row pl-3 pr-3">
                        <div key="2" className="col-3">
                            <img src={`https://www.bitcoinqrcodemaker.com/api/?style=bitcoin&address=${data.address}`} style={{backgroundColor: "#22262e"}} className='w-100' />
                        </div>
                        <div key="1" className="col-8">
                            <div>
                                <h5 className="wallet-title">{data.address}</h5>
                                <span className="badge badge-soft-primary mr-1">{getHumanBalance((data.final_balance).toString())} BTC</span>
                                <span className="badge badge-soft-success mr-1">{data.n_tx} Transactions</span>
                                <h6>Total Sent <small>{getHumanBalance((data.total_sent).toString())}</small></h6>
                                <h6>Total Received <small>{getHumanBalance((data.total_received).toString())}</small></h6>
                            </div>
                        </div>
                    </div>
                    )
                }}
                </Async.Fulfilled>
                <Async.Rejected>
                <div className="alert alert-danger fade show m-3" role="alert">
                    An error occurred, invalid wallet. We only accept Base58 or Hash160.
                </div>
                </Async.Rejected>
            </Async>
        </div>
    )
}