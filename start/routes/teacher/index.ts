import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/teacher', 'Teachers/TeachersController')
})
  .prefix('v1')
  .middleware('auth')
