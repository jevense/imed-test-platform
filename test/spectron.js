var Application = require('spectron').Application
var assert = require('assert')

var app = new Application({
    path: '/Applications/imed-test-platform.app/Contents/MacOS/imed-test-platform'
})

app.start().then(function () {
    // Check if the window is visible
    return app.browserWindow.isVisible()
}).then(function (isVisible) {
    // Verify the window is visible
    assert.equal(isVisible, true)
}).then(function () {
    // Get the window's title
    console.log(app.client.getTitle())
    return app.client.getTitle()
}).then(function (title) {
    // Verify the window's title
    assert.equal(title, 'Login - 登录')
}).then(function () {
    // Stop the application
    return app.stop()
}).catch(function (error) {
    // Log any failures
    console.error('Test failed', error.message)
})
