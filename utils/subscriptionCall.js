import axios from "axios";

export async function getSubscriptionDetails() {
    try {
        const response = await axios.get("https://license.pinnaclesystems.co.in/project/getSubscriptionDetails", {
            params: {
                name: 'FK-PROJECT'
            }
        })
        const result = response.data;
        if (result.statusCode === 1) {
            return result;
        }
    } catch (err) {
        console.log(err, "err");

        return { statusCode: 1, message: "Licensing Server is Down...!!!" }
    }
}