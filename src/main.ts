import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  )

  const config = new DocumentBuilder()
    .setTitle('Teddy Open Finance Chellenge')
    .setDescription('API for the Teddy Open Finance Challenge')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  const expressApp = app.getHttpAdapter().getInstance()

  expressApp.get('/', (req, res) => {
    res.redirect('/api')
  })
  expressApp.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
  })

  await app.listen(process.env.PORT ?? 8080)
}

void bootstrap()
