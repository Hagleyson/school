import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/family', 'Family/FamiliesController')
})
  .prefix('v1')
  .middleware('auth')
