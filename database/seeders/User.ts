import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.updateOrCreateMany('id', [
      {
        id: 1,
        email: 'admin@admin.com',
        name: 'test admin',
        password: 'dev12345',
        phone: '8888888',
      },
    ])
  }
}
