/* eslint-disable react-hooks/exhaustive-deps */
import PrimaryButton from "@/components/Button";
import { useWeb3 } from "@/contexts/useWeb3";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
    const {
        address,
        getUserAddress,
        sendCUSD,

        signTransaction,
    } = useWeb3();
    const [cUSDLoading, setCUSDLoading] = useState(false);
    const [signingLoading, setSigningLoading] = useState(false);
    const [tx, setTx] = useState<any>(undefined);
    const [receiverAddress, setReceiverAddress] = useState<string>("");
    const [amount, setAmount] = useState<string>("");


    useEffect(() => {
        getUserAddress();
    }, []);



    async function sendingCUSD() {
        if (address) {
            setSigningLoading(true);
            try {
                const tx = await sendCUSD(receiverAddress, amount);
                setTx(tx);
            } catch (error) {
                console.log(error);
            } finally {
                setSigningLoading(false);
            }
        }
    }



    return (
        <div className="flex flex-col justify-center items-center">
            {!address && (
                <div className="h1">Please install Metamask and connect.</div>
            )}
            {address && (
                <div className="h1">
                    Send cUSD to a CELO address!
                </div>
            )}

            {address && (
                <>
                    <div className="h2 text-center">
                        Your address:{" "}
                        <span className="font-bold text-sm">{address}</span>
                    </div>
                    {tx && (
                        <p className="font-bold mt-4">
                            Tx Completed:{" "}
                            {(tx.transactionHash as string).substring(0, 6)}
                            ...
                            {(tx.transactionHash as string).substring(
                                tx.transactionHash.length - 6,
                                tx.transactionHash.length
                            )}
                        </p>
                    )}



                    <input
                    type="text"
                    value={receiverAddress}
                    onChange={(e) => setReceiverAddress(e.target.value)}
                    placeholder="Receiver's Address"
                    style={{ 
                        marginBottom: "10px", 
                        borderRadius: "10px",
                        padding: "5px",
                        width: "200px",
                        border: "1px solid grey",
                    }}
                />


                <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount in cUSD"
                style={{ 
                    marginBottom: "10px", 
                    borderRadius: "10px",
                    padding: "5px",
                    width: "200px",
                    border: "1px solid grey",
                }}
            />


                    <div className="w-full px-3 mt-7">
                        <PrimaryButton
                            loading={signingLoading}
                            onClick={sendingCUSD}
                            title="Send"
                            widthFull
                        />
                    </div>

                   



            
                </>
            )}
        </div>
    );
}
