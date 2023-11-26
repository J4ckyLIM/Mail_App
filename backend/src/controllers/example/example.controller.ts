import { Controller, Get } from '@nestjs/common';

import { ExampleService } from 'src/services/example/example.service';

/**
 * TODO: remove it, it's just an example
 */
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get()
  public async findAll(): Promise<any[]> {
    return this.exampleService.findAll();
  }
}
