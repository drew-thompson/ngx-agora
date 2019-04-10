import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { getNPMPackage, NpmRegistryPackage } from '../util/npmjs';
import { Schema } from './schema';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return chain([addPackageJsonDependencies(options), installDependencies(), setupProject(options)])(tree, _context);
  };
}

function addPackageJsonDependencies(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext): Observable<Tree> => {
    return of(
      { name: '@angular/cdk', version: undefined },
      { name: 'agora-rtc-sdk', version: options.version },
      { name: 'ngx-agora', version: undefined }
    ).pipe(
      mergeMap(pkg => getNPMPackage(pkg as NpmRegistryPackage)),
      map((npmRegistryPackage: NpmRegistryPackage) => {
        const nodeDependency: NodeDependency = {
          type: NodeDependencyType.Default,
          name: npmRegistryPackage.name,
          version: npmRegistryPackage.version,
          overwrite: false
        };
        addPackageJsonDependency(tree, nodeDependency);
        return tree;
      })
    );
  };
}

function installDependencies(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.addTask(new NodePackageInstallTask());
    return tree;
  };
}

function setupProject(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const installTaskId = _context.addTask(new NodePackageInstallTask());
    _context.addTask(new RunSchematicTask('ng-add-setup-project', options), [installTaskId]);
    return tree;
  };
}
