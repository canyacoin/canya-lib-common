// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  contracts: {
    canYaDao: '0x303dc9039b6e964ff25eff8f215621d1a02af816',
    canYaCoin: '0x3986826916e72cf07c278300b9525dc32a29f259',
    useTestNet: true
  },
  ethNetId: 1524196056249
};
