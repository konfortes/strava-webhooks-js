# strava-webhooks-js

## Strava

### Webhook

```bash
# get current subscription
curl -G https://www.strava.com/api/v3/push_subscriptions \
    -d client_id=14xxx \
    -d client_secret=a9xxxxxxxxxxxxxxxx

# delete subscription
curl -X DELETE "https://www.strava.com/api/v3/push_subscriptions/242807?client_id=14xxx&client_secret=a9xxxxxxxxxxxxxxxx"

# create subscription
curl -X POST https://www.strava.com/api/v3/push_subscriptions \
      -F client_id=14xxx \
      -F client_secret=a9xxxxxxxxxxxxxxxx \
      -F callback_url=https://f9db-77-124-180-192.ngrok-free.app/webhook \
      -F verify_token=542xxxxxxxxxxxx
```

## ngrok

```bash
# get token from [ngrok dashboard](https://dashboard.ngrok.com/)
ngrok authtoken YOUR_TOKEN

ngrok http 3001
```
