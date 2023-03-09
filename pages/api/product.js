import {API_METHODS, API_URL} from "../../utils/api-endpoints";
import {backendAxiosInstance} from "../../api-requests/backend-axios-instance";

const SimpleCrypto = require("simple-crypto-js").default;
const secretKey = new SimpleCrypto(process.env.NEXT_PUBLIC_ENCRYPTION_KEY);

export default async function handler(req, res) {
    if (req.method === API_METHODS.POST) {
        const body = req.body;
        //console.log("ENCRYPTED DATA: ",body)
        if (body.data !== undefined) {
            try {
                const formData = secretKey.decrypt(body.data);
                //console.log("DECRYPTED DATA: ",formData)
                await backendAxiosInstance.post(API_URL.POST_CREATE_PRODUCT, formData).then(response => {
                    res.status(response.status).json(secretKey.encrypt(response.data));
                }).catch(e => res.status(e.response?.status).json(e.response?.data))

            } catch (e) {
                res.status(500).json(e.message);
            }
        } else {
            res.status(400).json({message: 'No body found!'})
        }
    } else {
        res.status(404).json({message: 'path not found!'});
    }
}