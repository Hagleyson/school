import Route from '@ioc:Adonis/Core/Route'

Route.post('/forgot-password', 'Password/PasswordsController.forgotPassword').prefix('v1')
Route.post('/reset-password', 'Password/PasswordsController.resetPassword').prefix('v1')
