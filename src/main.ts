import { NestFactory } from "@nestjs/core"
import { ApplicationModule } from "./app.module"

async function bootstrap() {
  let app = await NestFactory.create(ApplicationModule)
  await app.listen(3210)
}

bootstrap()
