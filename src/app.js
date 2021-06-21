const { findTriggers } = require(`./helpers`);
const minimatch = require("minimatch");
const parsers = require("./parsers");
const fetch = require("node-fetch");

async function alertWebhook(req, res) {
  const body = req.body;
  if (body.ConfirmationURL){
    return fetch(body.ConfirmationURL);
  }
  const sevirity = parsers.severity(body.severity);
  findTriggers(
    validateTrigger,
    [body.title, sevirity],
    req, res,
    "alertWebhook",
    body.title
  );
}

function validateTrigger(trigger, [alertName, severity]) {
  const alertNamePat = parsers.string(trigger.params.find((o) => o.name === `alertNamePat`).value);
  const minAlertSeverity = parsers.severity(trigger.params.find((o) => o.name === `minAlertSeverity`).value || "info");
  const maxAlertSeverity = parsers.severity(trigger.params.find((o) => o.name === `maxAlertSeverity`).value || "critical");

  if (alertNamePat && !minimatch(alertName, alertNamePat)) {
    throw `Not matching alert name`;
  }
  if (severity < minAlertSeverity || severity > maxAlertSeverity) {
    throw `Not matching severity`;
  }
}

module.exports = { 
  alertWebhook
};