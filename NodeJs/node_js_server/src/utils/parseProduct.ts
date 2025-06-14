
import { IncomingMessage } from 'http';

export const parseProduct = (req: IncomingMessage): Promise<any> => {
    return new Promise((resolve, rejects) => {
        let data = "";
        req.on("data", (chunk) => (data += chunk))
        req.on("end", () => {
            try {
                resolve(JSON.parse(data))
            } catch (err) {
                rejects(err)
            }
        })

    })
}