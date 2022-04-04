import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFiler } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFiler());
  app.useGlobalInterceptors(new TimeOutInterceptor());
  await app.listen(3000);
}
bootstrap();
