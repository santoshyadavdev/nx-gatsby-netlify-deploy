import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BuildBuilderSchema } from './schema';

export function runBuilder(
  options: BuildBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  return new Observable<BuilderOutput>((subscriber) => {
    context.scheduleTarget({
      target: 'build',
      project: context.target.project,
      configuration: '',
    }).then(() => {
      context.logger.info(`✔ Build Completed`);
      subscriber.next({
        success: true,
      });
      subscriber.complete();
    }).catch(err => {
      context.logger.error(`❌ Application build failed`);
      subscriber.next({
        error: `${err}`,
        success: false,
      });
    });
  });
}

export default createBuilder(runBuilder);
