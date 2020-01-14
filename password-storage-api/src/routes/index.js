
/**
 * Setup the app routing along with versioning.
 * @param {object} app - App object
 */
export default function setupRouting(app) {
    // For healthcheck
    app.get('/hcm', (_, res) => res.sendStatus(200))
}