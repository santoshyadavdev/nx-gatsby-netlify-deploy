import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('netlify-deploy e2e', () => {
  it('should create netlify-deploy', async (done) => {
    const plugin = uniq('netlify-deploy');
    ensureNxProject('@my-org/netlify-deploy', 'dist/packages/netlify-deploy');
    await runNxCommandAsync(
      `generate @my-org/netlify-deploy:netlifyDeploy ${plugin}`
    );

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Builder ran');

    done();
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('netlify-deploy');
      ensureNxProject('@my-org/netlify-deploy', 'dist/packages/netlify-deploy');
      await runNxCommandAsync(
        `generate @my-org/netlify-deploy:netlifyDeploy ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
      done();
    });
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('netlify-deploy');
      ensureNxProject('@my-org/netlify-deploy', 'dist/packages/netlify-deploy');
      await runNxCommandAsync(
        `generate @my-org/netlify-deploy:netlifyDeploy ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});
