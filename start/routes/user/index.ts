import Route from '@ioc:Adonis/Core/Route'

Route.post('users', 'User/UsersController.store').prefix('v1').middleware('auth')
Route.get('users', 'User/UsersController.index').prefix('v1').middleware('auth')
Route.put('users/:id', 'User/UsersController.update').prefix('v1').middleware('auth')
Route.delete('users/:id', 'User/UsersController.destroy').prefix('v1').middleware('auth')
