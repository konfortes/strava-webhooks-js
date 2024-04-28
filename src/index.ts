import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

const verifyToken = process.env.STRAVA_VERIFY_TOKEN

app.get('/health', (_req: Request, res: Response) => {
    res.send('OK')
})

app.route('/webhook').get((req: Request, res: Response) => {
    const mode = req.query['hub.mode']
    const token = req.query['hub.verify_token']
    const challenge = req.query['hub.challenge']

    if (token !== verifyToken) {
        console.log('Invalid verification token')
        res.sendStatus(401)
        return
    }

    if (mode === 'subscribe') {
        // Responds with the challenge token from the request
        console.log('webhook verified')

        res.status(200).json({ 'hub.challenge': challenge })
    } else {
        console.log('unknown webhook mode')

        res.sendStatus(403)
    }
})
// .post((req: Request, res: Response) => {
//     console.log(req.body)
// })

app.listen(port, () => {
    console.info(`[server]: Server is running at http://localhost:${port}`)
})
