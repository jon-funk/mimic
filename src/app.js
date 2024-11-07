require('dotenv').config()
const express = require('express');
const app = express();

const GLOBAL_OPTS = "-P ubuntu-latest=-self-hosted -P ubuntu-22.04=-self-hosted"
const MODE_PULL = "pull"
const MODE_PUSH = "push"
const MIMIC_MODE = process.env.MIMIC_MODE || MODE_PULL
const REPO_FILEPATH = process.env.REPO_FILE_PATH || "/tmp/mimic-repo"
const MIMIC_REPO = process.env.MIMIC_REPO || "https://github.com/jon-funk/mimic"


// Middleware setup
app.use(express.json());

const routes = require('./routes');
app.use('/api', routes);

module.exports = app; 