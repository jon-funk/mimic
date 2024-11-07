const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

router.post('/act', async (req, res) => {
    const { exec } = require('child_process');
    const { stdout, stderr } = await runAct(req.body.command);
    res.status(200).json({ stdout, stderr });
});

module.exports = router;