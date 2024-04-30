import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

const verifyToken = process.env.STRAVA_VERIFY_TOKEN

app.get('/health', (_req: Request, res: Response) => {
    res.send('OK')
})

app.use(express.json())

app.get('/auth/start', (req: Request, res: Response) => {
    const queryParams = {
        client_id: process.env.STRAVA_CLIENT_ID || '',
        redirect_uri: `${
            process.env.STRAVA_CALLBACK_BASE_URL || ''
        }/auth/callback`,
        response_type: 'code',
        approval_prompt: 'force',
        scope: 'read_all,activity:read_all',
    }

    const query = new URLSearchParams(queryParams).toString()

    res.redirect(`https://www.strava.com/oauth/authorize?${query}`)
})

app.get('/auth/callback', (req: Request, res: Response) => {
    console.log(req.query)

    res.status(200).send('OK')

    // {
    //     state: '',
    //     code: 'eeabcb83db97cddaa6ae560e02cd73eb421be4de',
    //     scope: 'read,activity:read_all,read_all'
    //   }

    // const code = req.query.code

    // if (!code) {
    //     res.status(400).send('Missing code')
    //     return
    // }
})

app.route('/webhook')
    .get((req: Request, res: Response) => {
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
    .post((req: Request, res: Response) => {
        console.log('webhook received')

        console.log(req.body)

        res.sendStatus(200)
    })

app.listen(port, () => {
    console.info(`[server]: Server is running at http://localhost:${port}`)
})
