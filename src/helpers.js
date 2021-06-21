const config = require("./config");
const mapExecutionService = require("../../../api/services/map-execution.service");
const Trigger = require("../../../api/models/map-trigger.model");

async function findTriggers(validatationFn, arg, req, res, method, description) {
  try {
    const triggers = await Trigger.find({ plugin: config.name, method: method});
    console.log(`Found ${triggers.length} triggers`);
    triggers.forEach((trigger) => {
      try {
        validatationFn(trigger, arg);
        exec(trigger, req.body, req.io, description)
      }
      catch(err){
        console.error(err);
      }
    });
    res.send("OK");
  }
  catch(error){
    res.send(`ERROR: ${error.toString()}`);
  }
}

function exec(trigger, body, io, description) {
  console.log(trigger.map);
  const message = `${trigger.name} - ${description}`
  console.log(`******** OCI Trigger: executing map ${trigger.map} ********`);
  mapExecutionService.execute(
    trigger.map,
    null,
    io,
    { config: trigger.configuration },
    message,
    body
  );
}


module.exports = { 
  findTriggers
};
