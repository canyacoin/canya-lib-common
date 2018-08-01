// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  contracts: {
    canYaDao: '0x303dc9039b6e964ff25eff8f215621d1a02af816',
    canYaCoin: '0x1d462414fe14cf489c7a21cac78509f4bf8cd7c0',
    useTestNet: false,
    testAccount: '0xf558DBf7e2F1081D0331Dc0e025c2ECca12129d1'
  },
  ethNetId: 1524196056249
};
