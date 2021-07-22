const { existsSync } = require('fs')
const envPath = __dirname + '/env.json'
const { isObject } = require('lodash')
const { exec } = require('child_process')

if (!existsSync(envPath)) {
  throw new Error('Setup env.json file in ' + __dirname)
}

const env = require(envPath)

function envFieldValue(config, fieldKey = '', fieldValue = '') {
  for (const key in config) {
    if (!isObject(config[key])) {
      fieldValue += `env.${fieldKey}${key}="${config[key]}" `
      continue
    }
    fieldKey += `${key}.`
    fieldValue = envFieldValue({ ...config[key] }, fieldKey, fieldValue)
    fieldKey = ''
  }

  return fieldValue
}

const command = `firebase functions:config:set ${envFieldValue(env)}`
exec(command, (err, stdout, stderr) => {
  if (err) throw new Error('Command execution failed ' + command)
  console.log(stdout)
})
