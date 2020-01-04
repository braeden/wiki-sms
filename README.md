# About

Provides an easy way to get Wikipedia summaries when not connected to mobile data! 

Text using syntax `wiki:"search term here"` and you'll get a summary and an article link in response!

# Local Testing 

```
cd cloud-function
npm install
npm install -g twilio-cli
twilio login
twilio phone-numbers:update "PHONE_NUM" --sms-url="http://localhost:8080"
npm start
```

# Deployment

```
gcloud functions deploy sms --trigger-http --runtime nodejs10 --entry-point fromTwilio
twilio phone-numbers:update "PHONE_NUM" --sms-url="CLOUD_FUNCTION_URL"
```