import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

const Pkey = `0x${process.env.REACT_APP_PUBLIC_PRIVATE_KEY}`;
const signer = new ethers.Wallet(Pkey);

export default async function SendPushNotification(toAddress: String) {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `New Form`,
        body: `A New form has been issued`,
      },
      payload: {
        title: `New form created notification`,
        body: `A new form has been issued for you (${toAddress}), please visit www.hideme.lol and open your dashboard`,
        cta: "",
        img: "",
      },
      recipients: `eip155:5:${toAddress}`, // recipient address
      channel: "eip155:5:0x1dFC0D5766eEa6B393aB024Bd3EE4015375Cc203", // your channel address
      env: "staging",
    });

    // apiResponse?.status === 204, if sent successfully!
    console.log("API repsonse: ", apiResponse);
  } catch (err) {
    console.error("Error: ", err);
  }
}
