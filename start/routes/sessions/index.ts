import Route from '@ioc:Adonis/Core/Route'

Route.post('login', 'Session/SessionsController.store').prefix('v1')

Route.post('logout', 'Session/SessionsController.destroy').prefix('v1')
