import { chain, Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { getProjectFromWorkspace } from '@angular/cdk/schematics';
import { getSourceNodes } from '@schematics/angular/utility/ast-utils';
import { getWorkspace } from '@schematics/angular/utility/config';
import { SourceFile } from 'typescript';
import { getProjectEnvironmentFile } from '../util/project-environment-file';
import { ts } from '../util/version-agnostic-typescript';
import { Schema } from './schema';

export default function(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return chain([addEnvironmentConfig(options), importEnvironemntIntoRootModule(options), addNgxAgoraModule(options)])(
      tree,
      _context
    );
  };
}

function addEnvironmentConfig(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace, options.project);
    const envPath = getProjectEnvironmentFile(project);

    // verify environment.ts file exists
    if (!envPath) {
      return context.logger.warn(`❌ Could not find environment file: "${envPath}". Skipping firebase configuration.`);
    }

    // firebase config to add to environment.ts file
    const insertion = ',\n' + `\tagora: {\n` + `\t\tappId: '${options.appId}',\n` + `\t}`;
    const sourceFile = readIntoSourceFile(tree, envPath);

    // verify firebase config does not already exist
    const sourceFileText = sourceFile.getText();
    if (sourceFileText.includes(insertion)) {
      return;
    }

    // get the array of top-level Node objects in the AST from the SourceFile
    const nodes = getSourceNodes(sourceFile as any);
    const start = nodes.find(node => node.kind === ts.SyntaxKind.OpenBraceToken)!;
    const end = nodes.find(node => node.kind === ts.SyntaxKind.CloseBraceToken, start.end)!;

    const recorder = tree.beginUpdate(envPath);
    recorder.insertLeft(end.pos, insertion);
    tree.commitUpdate(recorder);

    context.logger.info('✅️ Environment configuration');
    return tree;
  };
}

function addNgxAgoraModule(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return tree;
  };
}

function importEnvironemntIntoRootModule(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return tree;
  };
}

function readIntoSourceFile(host: Tree, fileName: string): SourceFile {
  const buffer = host.read(fileName);
  if (buffer === null) {
    throw new SchematicsException(`File ${fileName} does not exist.`);
  }

  return ts.createSourceFile(fileName, buffer.toString('utf-8'), ts.ScriptTarget.Latest, true);
}
