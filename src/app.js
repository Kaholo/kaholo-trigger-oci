const minimatch = require("minimatch");
const parsers = require("./parsers");
const fetch = require("node-fetch");

async function alertWebhook(req, res, settings, triggerControllers) {
  if (!triggerControllers) {
    return res.status(400).send("triggers cannot be nil");
  }
  try {
    const body = req.body;
    if (body.ConfirmationURL){
      const result = await fetch(body.ConfirmationURL);
      res.send("OK");
      return result;
    }
    const sevirity = parsers.severity(body.severity);
    const name = body.title;
    triggerControllers.forEach((trigger) => {
      let {alertNamePat, minAlertSeverity, maxAlertSeverity} = trigger.params;
      minAlertSeverity = parsers.severity(minAlertSeverity || "info");
      maxAlertSeverity = parsers.severity(maxAlertSeverity || "critical");

      if (alertNamePat && !minimatch(name, alertNamePat)) return;
      if (sevirity < minAlertSeverity || sevirity > maxAlertSeverity) return;
      trigger.execute(name, body);
    });
    res.status(200).send("OK");
  }
  catch (err){
    res.status(422).send(err.message);
  }
}

module.exports = { 
  alertWebhook
};