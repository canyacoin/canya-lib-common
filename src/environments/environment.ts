// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  contracts: {
    canYaDao: '0x954750072c38086d60630f499811b2db207694a3',
    canYaCoin: '0xd16cfae2c8766202fddd77de93267fbf44fb598d',
    useTestNet: true
  },
  ethNetId: 1524196056249
};
