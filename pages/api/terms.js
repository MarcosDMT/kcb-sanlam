import {API_METHODS, API_URL} from "../../utils/api-endpoints";
import {backendAxiosInstance} from "../../api-requests/backend-axios-instance";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb' // Set desired value here
        }
    }
}
export default async function handler(req, res) {
    if (req.method === API_METHODS.POST) {
        const body = req.body;
        try {
            await backendAxiosInstance.post(API_URL.GET_BANK_TERMS+'/'+body?.productId).then(response => {
                res.status(response.status).json(response.data);
            }).catch(e => res.status(e.response?.status).json(e.response?.data))

        } catch (e) {
            res.status(500).json(e.message);
        }
    } else {
        res.status(404).json({message: 'path not found!'});
    }
}