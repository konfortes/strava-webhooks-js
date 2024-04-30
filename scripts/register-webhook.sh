#!/bin/sh

source .env

read -p "Enter the callback url (enter to use from env): " CALLBACK_URL
CALLBACK_URL=${CALLBACK_URL:-$STRAVA_CALLBACK_BASE_URL}
echo CALLBACK_URL: $CALLBACK_URL

current_subscription=$(curl -G https://www.strava.com/api/v3/push_subscriptions \
    -d client_id=$STRAVA_CLIENT_ID \
    -d client_secret=$STRAVA_CLIENT_SECRET | jq -r '.[].id')

if [ -n "$current_subscription" ]; then
    echo "Deleting current subscription $current_subscription"
    curl -X DELETE "https://www.strava.com/api/v3/push_subscriptions/$current_subscription?client_id=$STRAVA_CLIENT_ID&client_secret=$STRAVA_CLIENT_SECRET"
fi

curl -X POST https://www.strava.com/api/v3/push_subscriptions \
    -F client_id=$STRAVA_CLIENT_ID \
    -F client_secret=$STRAVA_CLIENT_SECRET \
    -F callback_url=${CALLBACK_URL}/webhook \
    -F verify_token=$STRAVA_VERIFY_TOKEN


# echo $new_subscription