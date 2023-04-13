import ExceptionsLogger from 'App/Models/ExceptionsLogger'

export class ExceptionsLoggerCreator {
  public async execute(error: string, message: string): Promise<void> {
    await ExceptionsLogger.create({ error, message })
  }
}
