import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { NetlifyDeploySchematicSchema } from './schema';

describe('netlify-deploy schematic', () => {
  let appTree: Tree;
  const options: NetlifyDeploySchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@netlify/netlify-deploy',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner
        .runSchematicAsync('netlify-deploy', options, appTree)
        .toPromise()
    ).resolves.not.toThrowError();
  });
});
