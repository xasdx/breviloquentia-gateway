import Application from "./application"

async function bootstrap() {
  (await Application.create()).start()
}

bootstrap()
