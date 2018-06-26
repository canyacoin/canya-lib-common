# CanyaCommon

Reusable components across all CanApps

## Important

If you plan to add a new library component or edit an existing one, your first step should be **to update the [./projects/common-lib/package.json](https://github.com/canyaio/Common/blob/master/projects/common-lib/package.json#L3) version**. 

This will prevent overwriting the npm package registry and therefore all of the CanApps that use the package.

## Getting started

First, clone or fork this repo and perform a `cd Common; npm install` command to download the required dependencies.

## Creating a new reusable component

Use the `ng generate component <component-name> --project=common-lib` command to add a new component to the common library.

Then, add the component class name to the [./projects/common-lib/src/lib/common-lib.module.ts](https://github.com/canyaio/Common/blob/master/projects/common-lib/src/lib/common-lib.module.ts) file.

### Styling the component

Create a new file `.scss` inside [./src/assets/sass/lib/<component-name>/<component-name>.component.scss](https://github.com/canyaio/Common/blob/master/src/assets/sass/lib)

Open a new terminal tab and run `gulp watch` in the project root. 

Gulp should watch for changes in the file you created and output it in the corresponding library component directory.

Look at the [header.component.scss](https://github.com/canyaio/Common/blob/master/src/assets/sass/lib/header/header.component.scss) reference.

### Configuring the component

After generating a new common-lib component, you can proceed to add the functionality to it.

The [header.component.ts](https://github.com/canyaio/Common/blob/master/projects/common-lib/src/lib/header/header.component.ts) is a good reference of how to add `@Input()` properties to a component.

#### Important

Don't forget to add the `encapsulation: ViewEncapsulation.Native,` line to the `@Component` declaration. This will encapsulate the component styles during the build.

```
@Component({
  selector: 'canyalib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Native,
})
```

### Building the component

Before building your component, make sure that you have added it to the [public_api.ts](https://github.com/canyaio/Common/blob/master/projects/common-lib/src/public_api.ts) file.

Execute a `ng build --prod common-lib` command in the project root and add your component  tag to [app.component.html](https://github.com/canyaio/Common/blob/master/src/app/app.component.html).

Do `ng serve` to run the app and see your component.

### Testing your component

TODO: how to do unit testing

### Publishing the component

When your component features are working as expected, it is time to build, package and upload your component to the [npm @canyaio](https://www.npmjs.com/package/@canyaio/common-lib) registry.

First, run a `npm run package` command. A `*.tgz` file will be created with the package version appended to it. 

Secondly, do a `npm publish dist/common-lib/canyaio-common-lib-<version>.tgz --access public`

### Using the component in an external application

To use your new component, update or install the @canyaio/common-lib library into your angular ^6.0.0 application: `npm i @canyaio/common-lib@<version>`

