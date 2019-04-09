import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { getLatestNodeVersion, NpmRegistryPackage } from '../util/npmjs';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngAdd(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return chain([addPackageJsonDependencies(), installDependencies(), setupProject(options)])(tree, _context);
  };
}

function addPackageJsonDependencies(): Rule {
  return (tree: Tree, _context: SchematicContext): Observable<Tree> => {
    return of('agora-rtc-sdk').pipe(
      switchMap(name => getLatestNodeVersion(name)),
      map((npmRegistryPackage: NpmRegistryPackage) => {
        const nodeDependency: NodeDependency = {
          type: NodeDependencyType.Default,
          name: npmRegistryPackage.name,
          version: npmRegistryPackage.version,
          overwrite: false
        };
        addPackageJsonDependency(tree, nodeDependency);
        _context.logger.info('✅️ Added dependency');
        return tree;
      })
    );
  };
}

function installDependencies(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return tree;
  };
}

function setupProject(options: any): Rule {
  console.log(options);
  return (tree: Tree, _context: SchematicContext) => {
    return tree;
  };
}
