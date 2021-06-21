# kaholo-trigger-oci-monitoring
Kaholo trigger for integration with Oracle Cloud Infrastructure(OCI) Monitoring Webhooks.

## How to use:
After installing the trigger on Kaholo, make sure to create a new topic in the montiring service, with subscription of type HTTPS, with the URL of your kaholo server and path to the correct webhook. You can also just add a subscription of type HTTPS with webhook URL, to any existing topics of alerts.

## Method: Alert
Triggers whenever there is an alert triggered from OCI Monitoring service.

### Webhook URL:
**{KAHOLO_URL}/webhook/oci/alert**

### Parameters:
1. Alert Name (String) **Optional** - Alert name or it's [minimatch pattern](https://github.com/isaacs/minimatch#readme). If not specified accept any.
2. Minimum Severity (Options) **Optional** - Minimum Severity to accept. If not specified there is no minimum. Possible values in their relative severity are: Info < Warning < Error < Critical.
3. Maximum Severity (Options) **Optional** - Maximum Severity to accept. If not specified there is no maximum. Possible values in their relative severity are: Info < Warning < Error < Critical.